import {
  Meiosis,
  MeiosisConfigBase,
  MeiosisOneApp,
  MeiosisOneConfigBase,
  MeiosisOneContext,
  Nest
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

export interface MergerinoMeiosisConfig<S, A> extends MeiosisConfigBase<S, MergerinoPatch<S>, A> {
  /**
   * The Mergerino `merge` function.
   */
  merge: (state: S, patch: MergerinoPatch<S>) => S;
}

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

// -------- Meiosis One

export type MergerinoMeiosisOneApp<S> = MeiosisOneApp<S, MergerinoPatch<S>>;

export type MergerinoMeiosisOneContext<S> = MeiosisOneContext<S, MergerinoPatch<S>>;

export type MergerinoNest<S, K extends keyof S> = Nest<
  S,
  MergerinoPatch<S>,
  K,
  MergerinoPatch<S[K]>
>;

export function nest<S, K extends keyof S>(
  context: MeiosisOneContext<S, MergerinoPatch<S>>,
  prop: K
): MeiosisOneContext<S[K], MergerinoPatch<S[K]>>;

/**
 * Mergerino Meiosis One configuration.
 *
 * @template S the State type.
 */
export interface MergerinoMeiosisOneConfig<S> extends MeiosisOneConfigBase {
  /**
   * The Mergerino `merge` function.
   */
  merge: (state: S, patch: MergerinoPatch<S>) => S;

  /**
   * The application object, with optional properties.
   */
  app: MergerinoMeiosisOneApp<S>;
}

/**
 * Helper to setup Meiosis One with [Mergerino](https://github.com/fuzetsu/mergerino).
 *
 * @template S the State type.
 * @template A the Actions type.
 *
 * @param {MergerinoMeiosisConfig<S>} config the Meiosis One config for use with Mergerino
 *
 * @returns {MergerinoMeiosisOne<S>} Mergerino Meiosis One.
 */
export function meiosisOne<S>(config: MergerinoMeiosisOneConfig<S>): MergerinoMeiosisOneContext<S>;
