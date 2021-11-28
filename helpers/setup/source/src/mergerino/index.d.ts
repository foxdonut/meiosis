import {
  Meiosis,
  MeiosisConfigBase,
  MeiosisCellApp,
  MeiosisCellConfigBase,
  MeiosisCell,
  MeiosisRootCell,
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

// -------- Meiosis Cell

export type MergerinoApp<S, A> = MeiosisCellApp<S, MergerinoPatch<S>, A>;

export type MergerinoCell<S> = MeiosisCell<S, MergerinoPatch<S>>;
export type MergerinoRootCell<S, A> = MeiosisRootCell<S, MergerinoPatch<S>, A>;

export type MergerinoNest<S, K extends keyof S> = Nest<
  S,
  MergerinoPatch<S>,
  K,
  MergerinoPatch<S[K]>
>;

export function nest<S, K extends keyof S>(cell: MergerinoCell<S>, prop: K): MergerinoCell<S[K]>;

/**
 * Mergerino Meiosis Cell configuration.
 *
 * @template S the State type.
 */
export interface MergerinoConfig<S, A> extends MeiosisCellConfigBase {
  /**
   * The Mergerino `merge` function.
   */
  merge: (state: S, patch: MergerinoPatch<S>) => S;

  /**
   * The application object, with optional properties.
   */
  app: MergerinoApp<S, A>;
}

/**
 * Helper to setup Meiosis Cell with [Mergerino](https://github.com/fuzetsu/mergerino).
 *
 * @template S the State type.
 * @template A the Actions type.
 *
 * @param {MergerinoConfig<S>} config the Meiosis Cell config for use with Mergerino
 *
 * @returns {MergerinoCell<S>} Mergerino Meiosis Cell.
 */
export function meiosisCell<S, A>(config: MergerinoConfig<S, A>): MergerinoRootCell<S, A>;
