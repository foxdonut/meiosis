import { App, Meiosis, NestFunction, StreamLib } from "../common";

export type FunctionPatch<S> = (state: S) => S;

export type MeiosisFunctionPatchesConfig<S, A> = {
  /**
   * The stream library. This works with `meiosis.simpleStream`, `flyd`, `m.stream`, or anything for
   * which you provide either a function or an object with a `stream` function to create a stream.
   * The function or object must also have a `scan` property. The returned stream must have a `map`
   * method.
   */
  stream: StreamLib;
  /**
   * the app, with optional properties.
   */
  app: App<S, FunctionPatch<S>, A>;
};

declare function _default<S, A>({
  stream,
  app
}: MeiosisFunctionPatchesConfig<S, A>): Meiosis<S, FunctionPatch<S>, A>;

export default _default;

export const nest: NestFunction;
