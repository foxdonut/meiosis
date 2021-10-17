import {
  Meiosis,
  MeiosisConfigBase,
  MeiosisOneApp,
  MeiosisOneConfigBase,
  MeiosisOneContext,
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

// -------- Meiosis One

export type ImmerMeiosisOneApp<S> = MeiosisOneApp<S, ImmerPatch<S>>;

export type ImmerMeiosisOneContext<S> = MeiosisOneContext<S, ImmerPatch<S>>;

export type ProduceNestPatch = (produce: Produce<any>) => NestPatch;
export type ImmerNest<S, K extends keyof S> = Nest<S, ImmerPatch<S>, K, ImmerPatch<S[K]>>;
export type ProduceNest<S, K extends keyof S> = (produce: Produce<any>) => ImmerNest<S, K>;

export function nest<S, K extends keyof S>(
  context: MeiosisOneContext<S, ImmerPatch<S>>,
  prop: K
): MeiosisOneContext<S[K], ImmerPatch<S[K]>>;

/**
 * Immer Meiosis One configuration.
 *
 * @template S the State type.
 */
export interface ImmerMeiosisOneConfig<S> extends MeiosisOneConfigBase {
  /**
   * the Immer `produce` function.
   */
  produce: Produce<S>;

  /**
   * The application object, with optional properties.
   */
  app: ImmerMeiosisOneApp<S>;
}

/**
 * Helper to setup Meiosis One with [Immer](https://immerjs.github.io/immer/).
 *
 * @template S the State type.
 *
 * @param {ImmerMeiosisConfig<S>} config the Meiosis One config for use with Immer
 *
 * @returns {ImmerMeiosisOne<S>} Immer Meiosis One.
 */
export function meiosisOne<S>(
  config: ImmerMeiosisOneConfig<S>
): MeiosisOneContext<S, ImmerPatch<S>>;
