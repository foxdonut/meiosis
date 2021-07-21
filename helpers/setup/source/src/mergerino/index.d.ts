import {
  BaseMeiosisConfig,
  Meiosis,
  MeiosisOneAppBase,
  MeiosisOneBase,
  MeiosisOneConfig,
  LocalPath,
  Local
} from "../common";

export type MergerinoFunctionPatch<S> = (state: S) => S;

export type MergerinoObjectPatch<S> = {
  [K in keyof S]?: MergerinoPatch<S[K]> | ((a: S[K]) => S[K] | null | undefined) | null | undefined;
};

/**
 * A Mergerino patch.
 *
 * @template S the State type.
 *
 * Examples:
 *
 * ```typescript
 * update({ count: 42 });
 * update({ count: x => x + 1 });
 * ```
 */
export type MergerinoPatch<S> = MergerinoFunctionPatch<S> | MergerinoObjectPatch<S>;

export interface MergerinoMeiosisConfig<S, A> extends BaseMeiosisConfig<S, MergerinoPatch<S>, A> {
  /**
   * The Mergerino `merge` function.
   */
  merge: (state: S, patch: MergerinoPatch<S>) => S;
}

/**
 * Helper to setup the Meiosis pattern with [Mergerino](https://github.com/fuzetsu/mergerino).
 *
 * @template S the State type.
 * @template A the Actions type.
 *
 * @param {MergerinoMeiosisConfig<S, A>} config the Meiosis config for use with Mergerino
 *
 * @returns {Meiosis<S, MergerinoPatch<S>, A>} `{ states, update, actions }`,
 * where `states` and `update` are streams, and `actions` are the created actions.
 */
export function mergerinoSetup<S, A>(
  config: MergerinoMeiosisConfig<S, A>
): Meiosis<S, MergerinoPatch<S>, A>;

export default mergerinoSetup;

export function nest<S1, S2>(path: string | Array<string>, local?: LocalPath): Local<S1, S2>;

// -------- Meiosis One

/**
 * Returned by Mergerino Meiosis One setup.
 *
 * @template S the State type.
 * @template A the Actions type.
 */
export interface MergerinoMeiosisOne<S, A> extends MeiosisOneBase<S, MergerinoPatch<S>, A> {
  root: MergerinoMeiosisOne<S, A>;
  nest: <K extends keyof S>(prop: K) => MergerinoMeiosisOne<S[K], A>;
}

/**
 * Constructor of application actions.
 *
 * @template S the State type.
 * @template A the Actions type.
 *
 * @param {MeiosisOne<S, P, A>} context the Meiosis One context.
 *
 * @returns {A} the application's actions.
 */
export type MergerinoMeiosisOneActionConstructor<S, A> = (context: MergerinoMeiosisOne<S, A>) => A;

/**
 * Application object that provides the application's initial state, the service functions, the
 * application's actions, and the effects, all of which are optional.
 *
 * @template S the State type.
 * @template A the Actions type.
 */
export interface MergerinoMeiosisOneApp<S, P, A> extends MeiosisOneAppBase<S, P, A> {
  /**
   * A function that creates the application's actions.
   */
  Actions?: MergerinoMeiosisOneActionConstructor<S, A>;
}

/**
 * Mergerino Meiosis One configuration.
 *
 * @template S the State type.
 * @template A the Actions type.
 */
export type MergerinoMeiosisOneConfig<S, A> = MeiosisOneConfig<S, MergerinoPatch<S>, A>;

/**
 * Helper to setup Meiosis One with [Mergerino](https://github.com/fuzetsu/mergerino).
 *
 * @template S the State type.
 * @template A the Actions type.
 *
 * @param {MergerinoMeiosisConfig<S, A>} config the Meiosis One config for use with Mergerino
 *
 * @returns {MeiosisOne<S, MergerinoPatch<S>, A>} Mergerino Meiosis One.
 */
export function meiosisOne<S, A>(config: MergerinoMeiosisConfig<S, A>): MergerinoMeiosisOne<S, A>;
