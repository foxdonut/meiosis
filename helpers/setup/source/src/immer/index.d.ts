import {
  ActionConstructor as CommonActionConstructor,
  App as CommonApp,
  Effect as CommonEffect,
  MeiosisCell as CommonMeiosisCell,
  MeiosisContext as CommonMeiosisContext,
  MeiosisConfigBase,
  Service as CommonService,
  Stream,
  Update as CommonUpdate
} from "../common";

export interface Patch<S> {
  (state: S): S | void;
}

export type Update<S> = CommonUpdate<Patch<S>>;

export type ActionConstructor<S, A> = CommonActionConstructor<S, Patch<S>, A>;

export type Service<S> = CommonService<S, Patch<S>>;

export type Effect<S, A = unknown> = CommonEffect<S, Patch<S>, A>;

export type App<S, A = unknown> = CommonApp<S, Patch<S>, A>;

export type MeiosisContext<S, A = unknown> = CommonMeiosisContext<S, Patch<S>, A>;

export type MeiosisCell<S, A = unknown> = CommonMeiosisCell<S, Patch<S>, A>;

export interface Produce<S> {
  (state: S, patch: Patch<S>): S;
}

export interface MeiosisConfig<S, A = unknown> extends MeiosisConfigBase<S, Patch<S>, A> {
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
export function setup<S, A = unknown>(config: MeiosisConfig<S, A>): Stream<MeiosisCell<S, A>>;

export default setup;
