import {
  Meiosis,
  MeiosisConfigBase,
  MeiosisOneActionConstructor,
  MeiosisOneApp,
  MeiosisOneBase,
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

export type ImmerMeiosisOneApp<S, A> = MeiosisOneApp<S, ImmerPatch<S>, A>;

export type ImmerMeiosisOneActionConstructor<S, A> = MeiosisOneActionConstructor<
  S,
  ImmerPatch<S>,
  A
>;

export type ImmerMeiosisOneContext<S, A> = MeiosisOneContext<S, ImmerPatch<S>, A>;

export type ProduceNestPatch = (produce: Produce<any>) => NestPatch;
export type ImmerNest<S, K extends keyof S, A> = Nest<S, ImmerPatch<S>, K, ImmerPatch<S[K]>, A>;
export type ProduceNest<S, K extends keyof S, A> = (produce: Produce<any>) => ImmerNest<S, K, A>;

export function nest<S, K extends keyof S, A>(
  context: MeiosisOneBase<S, ImmerPatch<S>>,
  prop: K,
  Actions?: MeiosisOneActionConstructor<S[K], ImmerPatch<S[K]>, A>
): MeiosisOneContext<S[K], ImmerPatch<S[K]>, A>;

/**
 * Immer Meiosis One configuration.
 *
 * @template S the State type.
 */
export interface ImmerMeiosisOneConfig<S, A> extends MeiosisOneConfigBase {
  /**
   * the Immer `produce` function.
   */
  produce: Produce<S>;

  /**
   * The application object, with optional properties.
   */
  app: ImmerMeiosisOneApp<S, A>;
}

/**
 * Helper to setup Meiosis One with [Immer](https://immerjs.github.io/immer/).
 *
 * @template S the State type.
 * @template A the Actions type.
 *
 * @param {ImmerMeiosisConfig<S>} config the Meiosis One config for use with Immer
 *
 * @returns {ImmerMeiosisOne<S>} Immer Meiosis One.
 */
export function meiosisOne<S, A>(
  config: ImmerMeiosisOneConfig<S, A>
): MeiosisOneContext<S, ImmerPatch<S>, A>;
