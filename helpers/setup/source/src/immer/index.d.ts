import {
  CellActionConstructor,
  CellApp,
  CellConfigBase,
  Meiosis,
  MeiosisConfigBase,
  MeiosisCell,
  Nest,
  NestPatch
} from "../common";

export interface ImmerPatch<S> {
  (state: S): S | void;
}

export interface Produce<S> {
  (state: S, patch: ImmerPatch<S>): S;
}

export interface ImmerMeiosisConfig<S, A> extends MeiosisConfigBase<S, ImmerPatch<S>, A> {
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
 * @param {ImmerMeiosisConfig<S, A>} config the Meiosis config for use with Immer
 *
 * @returns {import("../common").Meiosis<S, ImmerPatch<S>, A>} `{ states, update, actions }`,
 * where `states` and `update` are streams, and `actions` are the created actions.
 */
export function setup<S, A>({
  stream,
  produce,
  app
}: ImmerMeiosisConfig<S, A>): Meiosis<S, ImmerPatch<S>, A>;

export default setup;

// -------- Meiosis Cell

export type ImmerApp<S, A> = CellApp<S, ImmerPatch<S>, A>;

export type ImmerCell<S, A = unknown> = MeiosisCell<S, ImmerPatch<S>, A>;

export type ImmerCellActionConstructor<S, A> = CellActionConstructor<S, ImmerPatch<S>, A>;

export interface ProduceNestPatch {
  (produce: Produce<any>): NestPatch;
}
export type ImmerNest<S, K extends keyof S, A = unknown> = Nest<
  S,
  ImmerPatch<S>,
  K,
  ImmerPatch<S[K]>,
  A
>;

export interface ProduceNest<S, K extends keyof S, A> {
  (produce: Produce<any>): ImmerNest<S, K, A>;
}

export function nest<S, K extends keyof S, A>(
  cell: ImmerCell<S>,
  prop: K,
  Actions?: ImmerCellActionConstructor<S[K], A>
): ImmerCell<S[K], A>;

export function produceNest<S>(produce: Produce<S>): typeof nest;

/**
 * Immer Meiosis Cell configuration.
 *
 * @template S the State type.
 */
export interface ImmerConfig<S, A> extends CellConfigBase {
  /**
   * the Immer `produce` function.
   */
  produce: Produce<S>;

  /**
   * The application object, with optional properties.
   */
  app: ImmerApp<S, A>;
}

/**
 * Helper to setup Meiosis Cell with [Immer](https://immerjs.github.io/immer/).
 *
 * @template S the State type.
 *
 * @param {ImmerMeiosisConfig<S>} config the Meiosis Cell config for use with Immer
 *
 * @returns {ImmerCell<S>} Immer Meiosis Cell.
 */
export function cell<S, A>(config: ImmerConfig<S, A>): ImmerCell<S, A>;
