import {
  Meiosis,
  MeiosisConfigBase,
  MeiosisOneActionConstructor,
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

export type MergerinoMeiosisOneApp<S, A> = MeiosisOneApp<S, MergerinoPatch<S>, A>;

export type MergerinoMeiosisOneActionConstructor<S, A> = MeiosisOneActionConstructor<
  S,
  MergerinoPatch<S>,
  A
>;

export type MergerinoMeiosisOneContext<S, A> = MeiosisOneContext<S, MergerinoPatch<S>, A>;

export type nest<S, K extends keyof S, A> = Nest<S, MergerinoPatch<S>, K, MergerinoPatch<S[K]>, A>;

/**
 * Mergerino Meiosis One configuration.
 *
 * @template S the State type.
 */
export interface MergerinoMeiosisOneConfig<S, A> extends MeiosisOneConfigBase {
  /**
   * The Mergerino `merge` function.
   */
  merge: (state: S, patch: MergerinoPatch<S>) => S;

  /**
   * The application object, with optional properties.
   */
  app: MergerinoMeiosisOneApp<S, A>;
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
export function meiosisOne<S, A>(
  config: MergerinoMeiosisOneConfig<S, A>
): MergerinoMeiosisOneContext<S, A>;
