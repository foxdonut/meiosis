import {
  App,
  DefaultActions,
  Meiosis,
  MeiosisOneActionConstructor,
  MeiosisOneApp,
  MeiosisOneConfigBase,
  MeiosisOneContext,
  StreamLib
} from "../common";

/**
 * A function patch.
 *
 * @template S the State type.
 *
 * @param {S} state the current state.
 *
 * @returns {S} the updated state.
 *
 * Examples:
 *
 * ```typescript
 * update(state => ({ ...state, count: 42 }));
 *
 * // Using Ramda
 * update(R.assoc('count', 42)));
 * ```
 */
export type FunctionPatch<S> = (state: S) => S;

/**
 * Config for setting up Meiosis with function patches.
 *
 * @template S the State type.
 * @template A the Actions type.
 */
export type FunctionPatchesMeiosisConfig<S, A> = {
  /**
   * The stream library. This works with `meiosis.simpleStream`, `flyd`, `m.stream`, or anything for
   * which you provide either a function or an object with a `stream` function to create a stream.
   * The function or object must also have a `scan` property. The returned stream must have a `map`
   * method.
   */
  stream: StreamLib;

  /**
   * The application object, with optional properties.
   */
  app: App<S, FunctionPatch<S>, A>;
};

/**
 * Helper to setup the Meiosis pattern with function patches.
 *
 * @template S the State type.
 * @template A the Actions type.
 *
 * @param {FunctionPatchesMeiosisConfig<S, A>} config the Meiosis config for use with function
 * patches.
 *
 * @returns {import("../common").Meiosis<S, FunctionPatch<S>, A>} `{ states, update, actions }`,
 * where `states` and `update` are streams, and `actions` are the created actions.
 */
export function functionPatchesSetup<S, A>({
  stream,
  app
}: FunctionPatchesMeiosisConfig<S, A>): Meiosis<S, FunctionPatch<S>, A>;

export default functionPatchesSetup;

// -------- Meiosis One

export type FunctionPatchesMeiosisOneApp<S, A = DefaultActions> = MeiosisOneApp<
  S,
  FunctionPatch<S>,
  A
>;

export type FunctionPatchesMeiosisOneActionConstructor<S, A> = MeiosisOneActionConstructor<
  S,
  FunctionPatch<S>,
  A
>;

export type FunctionPatchesMeiosisOneContext<S, A = DefaultActions> = MeiosisOneContext<
  S,
  FunctionPatch<S>,
  A
>;

export function nest<S, K extends keyof S, A = DefaultActions>(
  context: MeiosisOneContext<S, FunctionPatch<S>>,
  prop: K,
  Actions?: MeiosisOneActionConstructor<S[K], FunctionPatch<S[K]>, A>
): FunctionPatchesMeiosisOneContext<S[K], A>;

/**
 * Function Patches Meiosis One configuration.
 *
 * @template S the State type.
 */
export interface FunctionPatchesMeiosisOneConfig<S, A> extends MeiosisOneConfigBase {
  /**
   * The application object, with optional properties.
   */
  app: FunctionPatchesMeiosisOneApp<S, A>;
}

/**
 * Helper to setup Meiosis One with Function Patches.
 *
 * @template S the State type.
 *
 * @param {FunctionPatchesMeiosisConfig<S>} config the Meiosis One config for use with Function
 * Patches
 *
 * @returns {FunctionPatchesMeiosisOne<S>} Function Patches Meiosis One.
 */
export function meiosisOne<S, A = DefaultActions>(
  config: FunctionPatchesMeiosisOneConfig<S, A>
): FunctionPatchesMeiosisOneContext<S, A>;
