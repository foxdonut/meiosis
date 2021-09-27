import {
  App,
  Meiosis,
  MeiosisOneActionConstructor,
  MeiosisOneApp,
  MeiosisOneConfigBase,
  MeiosisOneContext,
  StreamLib
} from "../common";

export type ImmerPatch<S> = (state: S) => S | void;

export type Produce<S> = (state: S, patch: ImmerPatch<S>) => S;

export type ImmerMeiosisConfig<S, A> = {
  /**
   * The stream library. This works with `meiosis.simpleStream`, `flyd`, `m.stream`, or anything for
   * which you provide either a function or an object with a `stream` function to create a stream.
   * The function or object must also have a `scan` property. The returned stream must have a `map`
   * method.
   */
  stream: StreamLib;

  /**
   * the Immer `produce` function.
   */
  produce: Produce<S>;

  /**
   * the app, with optional properties.
   */
  app: App<S, ImmerPatch<S>, A>;
};

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

export function nest<S, K extends keyof S, A = never>(
  context: MeiosisOneContext<S, ImmerPatch<S>>,
  prop: K,
  Actions?: MeiosisOneActionConstructor<S[K], ImmerPatch<S[K]>, A>
): MeiosisOneContext<S[K], ImmerPatch<S[K]>, A>;

/**
 * Immer Meiosis One configuration.
 *
 * @template S the State type.
 */
export interface ImmerMeiosisOneConfig<S, A = never> extends MeiosisOneConfigBase {
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
export function meiosisOne<S, A = never>(
  config: ImmerMeiosisOneConfig<S, A>
): MeiosisOneContext<S, ImmerPatch<S>, A>;
