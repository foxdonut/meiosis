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
 * @template S the State type.
 */
export interface Patch<S> {
  /**
   * A function patch.
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
  (state: S): S;
}

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
export type MeiosisConfig<S, A = unknown> = CommonMeiosisConfig<S, Patch<S>, A>;

export interface MeiosisSetup<S, A = unknown> extends CommonMeiosisSetup<S, Patch<S>, A> {
  getCell: () => MeiosisCell<S, A>;
}

const nestPatch = <S, K extends Extract<keyof S, string>>(
  patch: Patch<S[K]>,
  prop: K
): Patch<S> => {
  return (state: S) => Object.assign({}, state, { [prop]: patch(state[prop]) });
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
export const combinePatches = <S>(patches: Patch<S>[]): Patch<S> => (initialState: S) =>
  patches.reduce((state, patch) => patch(state), initialState);

/**
 * Helper to setup the Meiosis pattern with function patches.
 *
 * @template S the State type.
 * @template A the Actions type.
 *
 * @param {MeiosisConfig<S, A>} config the Meiosis config for use with function patches.
 *
 * @returns {Meiosis<S, Patch<S>, A>} `{ states, update, actions }`, where `states` and `update` are
 * streams, and `actions` are the created actions.
 */
export const setup = <S, A = unknown>({ stream, app }: MeiosisConfig<S, A>): MeiosisSetup<S, A> => {
  const { states, getCell } = commonSetup({
    stream,
    accumulator: (state, patch) => patch(state),
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
