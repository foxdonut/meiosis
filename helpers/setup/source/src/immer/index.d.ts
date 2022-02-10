import {
  ActionConstructor as CommonActionConstructor,
  App as CommonApp,
  Effect as CommonEffect,
  Meiosis as CommonMeiosis,
  MeiosisConfigBase,
  Nest as CommonNest,
  NestPatch,
  Service as CommonService
} from "../common";

export interface Patch<S> {
  (state: S): S | void;
}

export type ActionConstructor<S, A> = CommonActionConstructor<S, Patch<S>, A>;

export type Service<S> = CommonService<S, Patch<S>>;

export type Effect<S, A> = CommonEffect<S, Patch<S>, A>;

export type App<S, A> = CommonApp<S, Patch<S>, A>;

export type Meiosis<S, A = unknown> = CommonMeiosis<S, Patch<S>, A>;

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
export function setup<S, A = unknown>({ stream, produce, app }: MeiosisConfig<S, A>): Meiosis<S, A>;

export default setup;

export interface ProduceNestPatch {
  (produce: Produce<any>): NestPatch;
}

export type Nest<S, K extends keyof S, A = unknown> = CommonNest<S, Patch<S>, K, Patch<S[K]>, A>;

export interface ProduceNest<S, K extends keyof S, A> {
  (produce: Produce<any>): Nest<S, K, A>;
}

declare function nest<S, K extends keyof S, A = unknown>(
  cell: Meiosis<S, A>,
  prop: K
): Meiosis<S[K], A>;

export function produceNest<S>(produce: Produce<S>): typeof nest;
