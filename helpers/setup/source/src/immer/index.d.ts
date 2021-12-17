import {
  CellActionConstructor as CommonCellActionConstructor,
  CellApp as CommonCellApp,
  CellConfigBase,
  Meiosis,
  MeiosisConfigBase,
  MeiosisCell as CommonMeiosisCell,
  Nest as CommonNest,
  NestPatch
} from "../common";

export interface Patch<S> {
  (state: S): S | void;
}

export interface Produce<S> {
  (state: S, patch: Patch<S>): S;
}

export interface MeiosisConfig<S, A> extends MeiosisConfigBase<S, Patch<S>, A> {
  /**
   * the Immer `produce` function.
   */
  produce: Produce<S>;
}

/**
 * Helper to setup the Meiosis pattern with [Immer](https://immerjs.github.io/immer/).
 *
 * @template S the State type.
 * @template A the Actions type.
 *
 * @param {MeiosisConfig<S, A>} config the Meiosis config for use with Immer
 *
 * @returns {import("../common").Meiosis<S, Patch<S>, A>} `{ states, update, actions }`,
 * where `states` and `update` are streams, and `actions` are the created actions.
 */
export function setup<S, A>({ stream, produce, app }: MeiosisConfig<S, A>): Meiosis<S, Patch<S>, A>;

export default setup;

// -------- Meiosis Cell

export type CellApp<S, A> = CommonCellApp<S, Patch<S>, A>;

export type MeiosisCell<S, A = unknown> = CommonMeiosisCell<S, Patch<S>, A>;

export type CellActionConstructor<S, A> = CommonCellActionConstructor<S, Patch<S>, A>;

export interface ProduceNestPatch {
  (produce: Produce<any>): NestPatch;
}

export type Nest<S, K extends keyof S, A = unknown> = CommonNest<S, Patch<S>, K, Patch<S[K]>, A>;

export interface ProduceNest<S, K extends keyof S, A> {
  (produce: Produce<any>): Nest<S, K, A>;
}

export function nest<S, K extends keyof S, A>(
  cell: MeiosisCell<S>,
  prop: K,
  Actions?: CellActionConstructor<S[K], A>
): MeiosisCell<S[K], A>;

export function produceNest<S>(produce: Produce<S>): typeof nest;

/**
 * Immer Meiosis Cell configuration.
 *
 * @template S the State type.
 */
export interface CellConfig<S, A> extends CellConfigBase {
  /**
   * the Immer `produce` function.
   */
  produce: Produce<S>;

  /**
   * The application object, with optional properties.
   */
  app: CellApp<S, A>;
}

/**
 * Helper to setup Meiosis Cell with [Immer](https://immerjs.github.io/immer/).
 *
 * @template S the State type.
 *
 * @param {CellConfig<S>} config the Meiosis Cell config for use with Immer
 *
 * @returns {MeiosisCell<S>} Immer Meiosis Cell.
 */
export function setupCell<S, A>(config: CellConfig<S, A>): MeiosisCell<S, A>;
