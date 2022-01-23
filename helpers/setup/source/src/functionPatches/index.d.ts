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
 * @template S the State type.
 */
export interface Patch<S> {
  /**
   * A function patch.
   *
   * @param {S} state the current state.
   *
   * @returns {S} the updated state.
   *
   * Examples:
   *
   * ```typescript
   * update(state => ({ ...state, count: 42 }));
   *
   * // Using Ramda
   * update(R.assoc('count', 42)));
   * ```
   */
  (state: S): S;
}

/**
 * Config for setting up Meiosis with function patches.
 */
export type MeiosisConfig<S, A> = MeiosisConfigBase<S, Patch<S>, A>;

/**
 * Helper to setup the Meiosis pattern with function patches.
 *
 * @template S the State type.
 * @template A the Actions type.
 *
 * @param {MeiosisConfig<S, A>} config the Meiosis config for use with function
 * patches.
 *
 * @returns {import("../common").Meiosis<S, Patch<S>, A>} `{ states, update, actions }`,
 * where `states` and `update` are streams, and `actions` are the created actions.
 */
export function setup<S, A>({ stream, app }: MeiosisConfig<S, A>): Meiosis<S, Patch<S>, A>;

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
 * Function Patches Meiosis Cell configuration.
 *
 * @template S the State type.
 */
export interface CellConfig<S, A = unknown> extends CellConfigBase {
  /**
   * The application object, with optional properties.
   */
  app: CellApp<S, A>;
}

/**
 * Helper to setup Meiosis Cell with Function Patches.
 *
 * @template S the State type.
 *
 * @param {CellConfig<S>} config the Meiosis Cell config for use with Function
 * Patches
 *
 * @returns {MeiosoisCell<S>} Function Patches Meiosis Cell.
 */
export function setupCell<S, A = unknown>(config: CellConfig<S, A>): MeiosisCell<S, A>;
