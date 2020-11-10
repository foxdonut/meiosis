import { App, Meiosis, LocalPath, Local, StreamLib } from "../common";

type MergerinoFunctionPatch<S> = (state: S) => S;

type MergerinoObjectPatch<S> = {
  [K in keyof S]?: S[K] | ((a: S[K]) => S[K] | null | undefined) | null | undefined;
};

export type MergerinoPatch<S> = MergerinoFunctionPatch<S> | MergerinoObjectPatch<S>;

export type MeiosisMergerinoConfig<S, A> = {
  /**
   * The stream library. This works with `meiosis.simpleStream`, `flyd`, `m.stream`, or anything for
   * which you provide either a function or an object with a `stream` function to create a stream.
   * The function or object must also have a `scan` property. The returned stream must have a `map`
   * method.
   */
  stream: StreamLib;
  /**
   * The Mergerino `merge` function.
   */
  merge: (state: S, patch: any) => S;
  /**
   * The app, with optional properties.
   */
  app: App<S, any, A>;
};

declare function _default<S, A>({
  stream,
  merge,
  app
}: MeiosisMergerinoConfig<S, A>): Meiosis<S, any, A>;
export default _default;

export function nest<S1, P1, S2, P2>(
  path: string | Array<string>,
  local?: LocalPath
): Local<S1, P1, S2, P2>;
