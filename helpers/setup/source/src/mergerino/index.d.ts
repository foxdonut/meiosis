import {
  ActionConstructor as CommonActionConstructor,
  App as CommonApp,
  Effect as CommonEffect,
  MeiosisCell as CommonMeiosisCell,
  MeiosisContext as CommonMeiosisContext,
  MeiosisConfigBase,
  Service as CommonService,
  Stream
} from "../common";

/**
 * A Mergerino function patch. This is a function that receives the current state and returns the
 * updated state.
 *
 * Example:
 *
 * ```typescript
 * update(state => ({ ...state, { count: 42 }}));
 * ```
 *
 * @template S the State type.
 */
export type FunctionPatch<S> = (state: S) => S;

/**
 * A Mergerino object patch. This is an object that contains updates to state properties.
 *
 * Example:
 *
 * ```typescript
 * update({ count: 42 });
 * ```
 *
 * @template S the State type.
 */
export type ObjectPatch<S> = {
  [K in keyof S]?: Patch<S[K]> | ((a: S[K]) => S[K] | null | undefined) | null | undefined;
};

/**
 * A Mergerino patch.
 *
 * Examples:
 *
 * ```typescript
 * update({ count: 42 });
 * update({ count: x => x + 1 });
 * ```
 *
 * @template S the State type.
 */
export type Patch<S> = FunctionPatch<S> | ObjectPatch<S>;

export type ActionConstructor<S, A> = CommonActionConstructor<S, Patch<S>, A>;

export type Service<S> = CommonService<S, Patch<S>>;

export type Effect<S, A = unknown> = CommonEffect<S, Patch<S>, A>;

export type App<S, A = unknown> = CommonApp<S, Patch<S>, A>;

export type MeiosisContext<S, A = unknown> = CommonMeiosisContext<S, Patch<S>, A>;

/*
export interface MeiosisContext<S, A = unknown> extends CommonMeiosis<S, Patch<S>, A> {
  nest: <K extends keyof S>(prop: K) => MeiosisContext<S[K]>;
}
*/

export type MeiosisCell<S, A = unknown> = CommonMeiosisCell<S, Patch<S>, A>;

/**
 * Meiosis Config.
 *
 * @template S the State type.
 * @template A the Actions type.
 */
export interface MeiosisConfig<S, A = unknown> extends MeiosisConfigBase<S, Patch<S>, A> {
  /**
   * The Mergerino `merge` function.
   */
  merge: (state: S, patch: Patch<S>) => S;
}

/**
 * Helper to setup the Meiosis pattern with [Mergerino](https://github.com/fuzetsu/mergerino).
 *
 * @template S the State type.
 * @template A the Actions type.
 *
 * @param {MeiosisConfig<S, A>} config the Meiosis config for use with Mergerino
 *
 * @returns {Meiosis<S, Patch<S>, A>} `{ states, update, actions }`,
 * where `states` and `update` are streams, and `actions` are the created actions.
 */
export function setup<S, A = unknown>(config: MeiosisConfig<S, A>): Stream<MeiosisCell<S, A>>;

export default setup;
