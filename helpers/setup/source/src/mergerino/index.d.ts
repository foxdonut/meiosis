import {
  App,
  CreateNestPatchFunction,
  Meiosis,
  MeiosisOne,
  LocalPath,
  Local,
  StreamLib
} from "../common";

export type MergerinoFunctionPatch<S> = (state: S) => S;

export type MergerinoObjectPatch<S> = {
  [K in keyof S]?: MergerinoPatch<S[K]> | ((a: S[K]) => S[K] | null | undefined) | null | undefined;
};

/**
 * A Mergerino patch.
 *
 * @template S the State type.
 *
 * Examples:
 *
 * ```typescript
 * update({ count: 42 });
 * update({ count: x => x + 1 });
 * ```
 */
export type MergerinoPatch<S> = MergerinoFunctionPatch<S> | MergerinoObjectPatch<S>;

export type MergerinoApp<S, A> = App<S, MergerinoPatch<S>, A>;

export type MergerinoMeiosisConfig<S, A> = {
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
 * @template S the State type.
 * @template A the Actions type.
 *
 * @param {MergerinoMeiosisConfig<S, A>} config the Meiosis config for use with Mergerino
 *
 * @returns {Meiosis<S, MergerinoPatch<S>, A>} `{ states, update, actions }`,
 * where `states` and `update` are streams, and `actions` are the created actions.
 */
export function mergerinoSetup<S, A>(
  config: MergerinoMeiosisConfig<S, A>
): Meiosis<S, MergerinoPatch<S>, A>;

export default mergerinoSetup;

export function nest<S1, P1, S2, P2>(
  path: string | Array<string>,
  local?: LocalPath
): Local<S1, P1, S2, P2>;

/**
 * Mergerino Meiosis One configuration.
 *
 * @template S the State type.
 * @template A the Actions type.
 */
export interface MergerinoMeiosisOneConfig<S, A>
  extends MergerinoMeiosisConfig<S, A>,
    CreateNestPatchFunction {}

/**
 * Helper to setup the Meiosis pattern with [Mergerino](https://github.com/fuzetsu/mergerino).
 *
 * @template S the State type.
 * @template A the Actions type.
 *
 * @param {MergerinoMeiosisConfig<S, A>} config the Meiosis One config for use with Mergerino
 *
 * @returns {MeiosisOne<S, MergerinoPatch<S>, A>} Mergerino Meiosis One.
 */
export function meiosisOne<S, A>({
  stream,
  merge,
  app
}: MergerinoMeiosisConfig<S, A>): MeiosisOne<S, MergerinoPatch<S>, A>;
