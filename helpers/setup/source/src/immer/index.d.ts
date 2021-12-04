import {
  Meiosis,
  MeiosisConfigBase,
  MeiosisCellApp,
  MeiosisCellConfigBase,
  MeiosisCell,
  MeiosisRootCell,
  Nest,
  NestPatch
} from "../common";

export type ImmerPatch<S> = (state: S) => S | void;

export type Produce<S> = (state: S, patch: ImmerPatch<S>) => S;

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
export function immerSetup<S, A>({
  stream,
  produce,
  app
}: ImmerMeiosisConfig<S, A>): Meiosis<S, ImmerPatch<S>, A>;

export default immerSetup;

// -------- Meiosis Cell

export type ImmerApp<S, A> = MeiosisCellApp<S, ImmerPatch<S>, A>;

export type ImmerCell<S> = MeiosisCell<S, ImmerPatch<S>>;
export type ImmerRootCell<S, A> = MeiosisRootCell<S, ImmerPatch<S>, A>;

export type ProduceNestPatch = (produce: Produce<any>) => NestPatch;
export type ImmerNest<S, K extends keyof S> = Nest<S, ImmerPatch<S>, K, ImmerPatch<S[K]>>;
export type ProduceNest<S, K extends keyof S> = (produce: Produce<any>) => ImmerNest<S, K>;

export function nestFn<S, K extends keyof S>(cell: ImmerCell<S>, prop: K): ImmerCell<S[K]>;

export function nest<S>(produce: Produce<S>): typeof nestFn;

/**
 * Immer Meiosis Cell configuration.
 *
 * @template S the State type.
 */
export interface ImmerConfig<S, A> extends MeiosisCellConfigBase {
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
export function meiosisCell<S, A>(config: ImmerConfig<S, A>): ImmerRootCell<S, A>;
