import { App, Meiosis, LocalPath, Local, StreamLib } from "../common";
// import { App, Meiosis, MeiosisOne, LocalPath, Local, Stream, StreamLib } from "../common";

type MergerinoFunctionPatch<S> = (state: S) => S;

type MergerinoObjectPatch<S> = {
  [K in keyof S]?: MergerinoPatch<S[K]> | ((a: S[K]) => S[K] | null | undefined) | null | undefined;
};

export type MergerinoPatch<S> = MergerinoFunctionPatch<S> | MergerinoObjectPatch<S>;

export type MergerinoApp<S, A> = App<S, MergerinoPatch<S>, A>;

/*
export interface MergerinoMeiosisOne<S, A> extends Stream<S> {
  update: Stream<MergerinoPatch<S>>;
  actions: A;
  select: <K extends keyof S & keyof A>(prop: K) => MeiosisOne<S[K], MergerinoPatch<S[K]>, A[K]>;
}
*/

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
  merge: (state: S, patch: MergerinoPatch<S>) => S;
  /**
   * The app, with optional properties.
   */
  app: MergerinoApp<S, A>;
};

/**
 * Helper to setup the Meiosis pattern with [Mergerino](https://github.com/fuzetsu/mergerino).
 *
 * @param {MeiosisMergerinoConfig<S, A>} config the Meiosis config for use with Mergerino
 *
 * @returns {import("../common").Meiosis<S, MergerinoPatch<S>, A>} `{ states, update, actions }`,
 * where `states` and `update` are streams, and `actions` are the created actions.
 */
export function mergerinoSetup<S, A>({
  stream,
  merge,
  app
}: MeiosisMergerinoConfig<S, A>): Meiosis<S, MergerinoPatch<S>, A>;

export default mergerinoSetup;

/*
export function setupOne<S, A>({
  stream,
  merge,
  app
}: MeiosisMergerinoConfig<S, A>): MergerinoMeiosisOne<S, A>;
*/

export function nest<S1, P1, S2, P2>(
  path: string | Array<string>,
  local?: LocalPath
): Local<S1, P1, S2, P2>;
