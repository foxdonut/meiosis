import commonSetup, {
  CommonActionConstructor,
  CommonApp,
  CommonEffect,
  CommonMeiosisCell,
  CommonMeiosisConfig,
  CommonMeiosisContext,
  CommonMeiosisSetup,
  CommonService,
  CommonUpdate
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
  [K in Extract<keyof S, string>]?:
    | Patch<S[K]>
    | ((a: S[K]) => S[K] | null | undefined)
    | null
    | undefined;
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
export type Patch<S> = FunctionPatch<S> | ObjectPatch<S> | Patch<S>[];

export type Update<S> = CommonUpdate<Patch<S>>;

export type ActionConstructor<S, A> = CommonActionConstructor<S, Patch<S>, A>;

export type Service<S> = CommonService<S, Patch<S>>;

export type Effect<S, A = unknown> = CommonEffect<S, Patch<S>, A>;

export type App<S, A = unknown> = CommonApp<S, Patch<S>, A>;

export type MeiosisContext<S, A = unknown> = CommonMeiosisContext<S, Patch<S>, A>;

export interface MeiosisCell<S, A = unknown> extends CommonMeiosisCell<S, Patch<S>, A> {
  nest: <K extends Extract<keyof S, string>>(prop: K) => MeiosisCell<S[K]>;
}

/**
 * Meiosis Config.
 *
 * @template S the State type.
 * @template A the Actions type.
 */
export interface MeiosisConfig<S, A = unknown> extends CommonMeiosisConfig<S, Patch<S>, A> {
  /**
   * The Mergerino `merge` function.
   */
  merge: (state: any, patch: any) => any;
}

export interface MeiosisSetup<S, A = unknown> extends CommonMeiosisSetup<S, Patch<S>, A> {
  getCell: () => MeiosisCell<S, A>;
}

const nestPatch = <S, K extends Extract<keyof S, string>>(
  patch: Patch<S[K]>,
  prop: K
): Patch<S> => {
  const nestedPatch = { [prop]: patch } as unknown;
  return nestedPatch as Patch<S>;
};

const nestUpdate = <S, K extends Extract<keyof S, string>>(
  parentUpdate: Update<S>,
  prop: K
): Update<S[K]> => {
  return patch => parentUpdate(nestPatch(patch, prop));
};

const nestCell = <S, K extends Extract<keyof S, string>>(
  getState: () => S,
  parentUpdate: Update<S>
) => (prop: K): MeiosisCell<S[K]> => {
  const getNestedState = () => getState()[prop];

  const nestedUpdate: Update<S[K]> = nestUpdate(parentUpdate, prop);

  const nested: MeiosisCell<S[K]> = {
    state: getNestedState(),
    update: nestedUpdate,
    actions: undefined,
    nest: nestCell(getNestedState, nestedUpdate)
  };

  return nested;
};

/**
 * Combines an array of patches into a single patch.
 *
 * @template S the State type.
 */
export const combinePatches = <S>(patches: Patch<S>[]): Patch<S> => patches;

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
export const setup = <S, A = unknown>({
  stream,
  merge,
  app
}: MeiosisConfig<S, A>): MeiosisSetup<S, A> => {
  const { states, getCell } = commonSetup({
    stream,
    accumulator: merge,
    app
  });

  const getCellWithNest = () => {
    const cell = getCell();

    const cellWithNest: MeiosisCell<S, A> = {
      ...cell,
      nest: nestCell(states, cell.update)
    };

    return cellWithNest;
  };

  return {
    states,
    getCell: getCellWithNest
  };
};

export default setup;
