import {
  CellApp,
  CellConfigBase,
  Meiosis,
  MeiosisConfigBase,
  MeiosisCell,
  MeiosisRootCell,
  Nest
} from "../common";

/**
 * @template S the State type.
 */
export interface FunctionPatch<S> {
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
export type FunctionPatchesMeiosisConfig<S, A> = MeiosisConfigBase<S, FunctionPatch<S>, A>;

/**
 * Helper to setup the Meiosis pattern with function patches.
 *
 * @template S the State type.
 * @template A the Actions type.
 *
 * @param {FunctionPatchesMeiosisConfig<S, A>} config the Meiosis config for use with function
 * patches.
 *
 * @returns {import("../common").Meiosis<S, FunctionPatch<S>, A>} `{ states, update, actions }`,
 * where `states` and `update` are streams, and `actions` are the created actions.
 */
export function setup<S, A>({
  stream,
  app
}: FunctionPatchesMeiosisConfig<S, A>): Meiosis<S, FunctionPatch<S>, A>;

export default setup;

// -------- Meiosis Cell

export type FunctionPatchesApp<S, A> = CellApp<S, FunctionPatch<S>, A>;

export type FunctionPatchesCell<S> = MeiosisCell<S, FunctionPatch<S>>;
export type FunctionPatchesRootCell<S, A> = MeiosisRootCell<S, FunctionPatch<S>, A>;

export type FunctionPatchesNest<S, K extends keyof S> = Nest<
  S,
  FunctionPatch<S>,
  K,
  FunctionPatch<S[K]>
>;

export function nest<S, K extends keyof S>(
  cell: FunctionPatchesCell<S>,
  prop: K
): FunctionPatchesCell<S[K]>;

/**
 * Function Patches Meiosis Cell configuration.
 *
 * @template S the State type.
 */
export interface FunctionPatchesConfig<S, A> extends CellConfigBase {
  /**
   * The application object, with optional properties.
   */
  app: FunctionPatchesApp<S, A>;
}

/**
 * Helper to setup Meiosis Cell with Function Patches.
 *
 * @template S the State type.
 *
 * @param {FunctionPatchesConfig<S>} config the Meiosis Cell config for use with Function
 * Patches
 *
 * @returns {FunctionPatchesCell<S>} Function Patches Meiosis Cell.
 */
export function cell<S, A>(config: FunctionPatchesConfig<S, A>): FunctionPatchesRootCell<S, A>;
