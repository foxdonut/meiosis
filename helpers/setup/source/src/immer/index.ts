import commonSetup, {
  CommonApp,
  CommonMeiosisCell,
  CommonMeiosisConfig,
  CommonMeiosisSetup,
  CommonService,
  CommonUpdate
} from "../common";

export interface Patch<S> {
  (state: S): S | void;
}

export type Update<S> = CommonUpdate<Patch<S>>;

export type Service<S> = CommonService<S, Patch<S>>;

export interface Effect<S> {
  (cell: MeiosisCell<S>): void;
}

export interface App<S> extends CommonApp<S, Patch<S>> {
  /**
   * An array of effect functions.
   */
  effects?: Effect<S>[];
}

export interface MeiosisCell<S> extends CommonMeiosisCell<S, Patch<S>> {
  nest: <K extends Extract<keyof S, string>>(prop: K) => MeiosisCell<S[K]>;
}

export interface Produce<S> {
  (state: S, patch: Patch<S>): S;
}

/**
 * Meiosis Config.
 *
 * @template S the State type.
 */
export interface MeiosisConfig<S> extends CommonMeiosisConfig<S, Patch<S>> {
  app: App<S>;

  /**
   * the Immer `produce` function.
   */
  produce: Produce<S>;
}

export interface MeiosisSetup<S> extends CommonMeiosisSetup<S, Patch<S>> {
  getCell: () => MeiosisCell<S>;
}

const nestPatch = <S, K extends Extract<keyof S, string>>(
  produce: Produce<S[K]>,
  patch: Patch<S[K]>,
  prop: K
): Patch<S> => {
  return state => {
    state[prop] = produce(state[prop], patch);
  };
};

const nestUpdate = <S, K extends Extract<keyof S, string>>(
  produce: Produce<S[K]>,
  parentUpdate: Update<S>,
  prop: K
): Update<S[K]> => {
  return patch => parentUpdate(nestPatch(produce, patch, prop));
};

const nestCell = <S, K extends Extract<keyof S, string>>(
  produce: Produce<any>,
  getState: () => S,
  parentUpdate: Update<S>
) => (prop: K): MeiosisCell<S[K]> => {
  const getNestedState = () => getState()[prop];

  const nestedUpdate: Update<S[K]> = nestUpdate(produce, parentUpdate, prop);

  const nested: MeiosisCell<S[K]> = {
    state: getNestedState(),
    update: nestedUpdate,
    nest: nestCell(produce, getNestedState, nestedUpdate)
  };

  return nested;
};

/**
 * Combines an array of patches into a single patch.
 *
 * @template S the State type.
 */
export const combinePatches = <S>(produce: Produce<S>, patches: Patch<S>[]): Patch<S> => state =>
  // can't use patches.reduce(produce, state) because that would send a third argument to produce
  patches.reduce((result, patch) => produce(result, patch), state);

/**
 * Helper to setup the Meiosis pattern with [Mergerino](https://github.com/fuzetsu/mergerino).
 *
 * @template S the State type.
 *
 * @param {MeiosisConfig<S>} config the Meiosis config for use with Mergerino
 *
 * @returns {Meiosis<S, Patch<S>>} `{ states, getCell }`.
 */
export const setup = <S>({ stream, produce, app }: MeiosisConfig<S>): MeiosisSetup<S> => {
  const { states, getCell } = commonSetup({
    stream,
    accumulator: produce,
    app
  });

  const getCellWithNest = () => {
    const cell = getCell();

    const cellWithNest: MeiosisCell<S> = {
      ...cell,
      nest: nestCell(produce, states, cell.update)
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
