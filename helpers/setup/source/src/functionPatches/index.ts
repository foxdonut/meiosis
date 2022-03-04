import commonSetup, {
  CommonApp,
  CommonMeiosisCell,
  CommonMeiosisConfig,
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

export type Service<S> = CommonService<S, Patch<S>>;

export interface Effect<S> {
  (cell: MeiosisCell<S>): void;
}

export interface App<S> extends CommonApp<S, Patch<S>> {
  /**
   * An array of service functions.
   */
  services?: Service<S>[];

  /**
   * An array of effect functions.
   */
  effects?: Effect<S>[];
}

export interface MeiosisCell<S> extends CommonMeiosisCell<S, Patch<S>> {
  nest: <K extends Extract<keyof S, string>>(prop: K) => MeiosisCell<S[K]>;
}

/**
 * Meiosis Config.
 *
 * @template S the State type.
 */
export interface MeiosisConfig<S> extends CommonMeiosisConfig<S, Patch<S>> {
  app: App<S>;
}

export interface MeiosisSetup<S> extends CommonMeiosisSetup<S, Patch<S>> {
  getCell: () => MeiosisCell<S>;
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
 *
 * @param {MeiosisConfig<S>} config the Meiosis config for use with function patches.
 *
 * @returns {Meiosis<S, Patch<S>>} `{ states, getCell }`.
 */
export const setup = <S>({ stream, app }: MeiosisConfig<S>): MeiosisSetup<S> => {
  const { states, getCell } = commonSetup({
    stream,
    accumulator: (state, patch) => patch(state),
    app
  });

  const getCellWithNest = () => {
    const cell = getCell();

    const cellWithNest: MeiosisCell<S> = {
      ...cell,
      nest: nestCell(states, cell.update)
    };

    return cellWithNest;
  };

  if (app?.effects != null && app.effects.length > 0) {
    states.map(() => app.effects?.forEach(effect => effect(getCellWithNest())));
  }

  return {
    states,
    getCell: getCellWithNest
  };
};

export default setup;
