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

export interface Patch<S> {
  (state: S): S | void;
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

export interface Produce<S> {
  (state: S, patch: Patch<S>): S;
}

/**
 * Meiosis Config.
 *
 * @template S the State type.
 * @template A the Actions type.
 */
export interface MeiosisConfig<S, A = unknown> extends CommonMeiosisConfig<S, Patch<S>, A> {
  /**
   * the Immer `produce` function.
   */
  produce: Produce<S>;
}

export interface MeiosisSetup<S, A = unknown> extends CommonMeiosisSetup<S, Patch<S>, A> {
  getCell: () => MeiosisCell<S, A>;
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
    actions: undefined,
    nest: nestCell(produce, getNestedState, nestedUpdate)
  };

  return nested;
};

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
  produce,
  app
}: MeiosisConfig<S, A>): MeiosisSetup<S, A> => {
  const { states, getCell } = commonSetup({
    stream,
    accumulator: produce,
    // can't use patches.reduce(produce, state) because that would send a third argument to produce
    combine: patches => state => patches.reduce((result, patch) => produce(result, patch), state),
    app
  });

  const getCellWithNest = () => {
    const cell = getCell();

    const cellWithNest: MeiosisCell<S, A> = {
      ...cell,
      nest: nestCell(produce, states, cell.update)
    };

    return cellWithNest;
  };

  return {
    states,
    getCell: getCellWithNest
  };
};

export default setup;
