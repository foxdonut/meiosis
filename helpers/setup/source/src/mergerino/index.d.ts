import {
  CellActionConstructor as CommonCellActionConstructor,
  CellApp as CommonCellApp,
  CellConfigBase,
  CellEffect as CommonCellEffect,
  Meiosis,
  MeiosisConfigBase,
  MeiosisCell as CommonMeiosisCell,
  Nest as CommonNest
} from "../common";

/**
 * A Mergerino function patch. This is a function that receives the current state and returns the
 * updated state.
 *
 * Example:
 *
 * ```typescript
 * update(state => ({ ...state, { count: 42 }}));
 * ```
 *
 * @template S the State type.
 */
export type FunctionPatch<S> = (state: S) => S;

/**
 * A Mergerino object patch. This is an object that contains updates to state properties.
 *
 * Example:
 *
 * ```typescript
 * update({ count: 42 });
 * ```
 *
 * @template S the State type.
 */
export type ObjectPatch<S> = {
  [K in keyof S]?: Patch<S[K]> | ((a: S[K]) => S[K] | null | undefined) | null | undefined;
};

/**
 * A Mergerino patch.
 *
 * Examples:
 *
 * ```typescript
 * update({ count: 42 });
 * update({ count: x => x + 1 });
 * ```
 *
 * @template S the State type.
 */
export type Patch<S> = FunctionPatch<S> | ObjectPatch<S>;

export interface MeiosisConfig<S, A> extends MeiosisConfigBase<S, Patch<S>, A> {
  /**
   * The Mergerino `merge` function.
   */
  merge: (state: S, patch: Patch<S>) => S;
}

/**
 * Helper to setup the Meiosis pattern with [Mergerino](https://github.com/fuzetsu/mergerino).
 *
 * @template S the State type.
 * @template A the Actions type.
 *
 * @param {MeiosisConfig<S, A>} config the Meiosis config for use with Mergerino
 *
 * @returns {Meiosis<S, Patch<S>, A>} `{ states, update, actions }`,
 * where `states` and `update` are streams, and `actions` are the created actions.
 */
export function setup<S, A>(config: MeiosisConfig<S, A>): Meiosis<S, Patch<S>, A>;

export default setup;

// -------- Meiosis Cell

export type CellApp<S, A = unknown> = CommonCellApp<S, Patch<S>, A>;

export type MeiosisCell<S, A = unknown> = CommonMeiosisCell<S, Patch<S>, A>;

export type CellActionConstructor<S, A> = CommonCellActionConstructor<S, Patch<S>, A>;

export type CellEffect<S, A = unknown> = CommonCellEffect<S, Patch<S>, A>;

export type Nest<S, K extends keyof S, A = unknown> = CommonNest<S, Patch<S>, K, Patch<S[K]>, A>;

export function nest<S, K extends keyof S, A = unknown>(
  cell: MeiosisCell<S, A>,
  prop: K
): MeiosisCell<S[K], A>;

/**
 * Mergerino Meiosis Cell configuration.
 *
 * @template S the State type.
 */
export interface CellConfig<S, A = unknown> extends CellConfigBase {
  /**
   * The Mergerino `merge` function.
   */
  merge: (state: S, patch: Patch<S>) => S;

  /**
   * The application object, with optional properties.
   */
  app: CellApp<S, A>;
}

/**
 * Helper to setup Meiosis Cell with [Mergerino](https://github.com/fuzetsu/mergerino).
 *
 * @template S the State type.
 * @template A the Actions type.
 *
 * @param {CellConfig<S>} config the Meiosis Cell config for use with Mergerino
 *
 * @returns {MeiosisCell<S>} Mergerino Meiosis Cell.
 */
export function setupCell<S, A = unknown>(config: CellConfig<S, A>): MeiosisCell<S, A>;
