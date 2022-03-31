import simpleStream from '../simple-stream';
import {
  CommonApp,
  CommonMeiosisConfig,
  CommonService,
  NestSetup,
  Stream,
  commonGetServices,
  nestSetup
} from '../common';

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

export interface Update<S> {
  (patch: Patch<S>): any;
}

export interface MeiosisCell<S> {
  state: S;
  update: Update<S>;
  nest: <K extends Extract<keyof S, string>>(prop: K) => MeiosisCell<S[K]>;
}

export interface Service<S> extends CommonService<S> {
  run: (cell: MeiosisCell<S>) => any;
}

export interface View<S> {
  (cell: MeiosisCell<S>): any;
}

export interface App<S> extends CommonApp<S> {
  /**
   * An array of service functions.
   */
  services?: Service<S>[];

  view?: View<S>;

  nested?: NestedApps<S>;
}

export type NestedApps<S> = {
  [K in keyof S]?: App<S[K]>;
};

/**
 * Meiosis Config.
 *
 * @template S the State type.
 */
export interface MeiosisConfig<S> extends CommonMeiosisConfig<S> {
  app: App<S>;
}

const nestPatch =
  <S, K extends Extract<keyof S, string>>(patch: Patch<S[K]>, prop: K): Patch<S> =>
  (state: S) =>
    Object.assign({}, state, { [prop]: patch(state[prop]) });

const nestUpdate =
  <S, K extends Extract<keyof S, string>>(parentUpdate: Update<S>, prop: K): Update<S[K]> =>
  (patch) =>
    parentUpdate(nestPatch(patch, prop));

const nestCell =
  <S, K extends Extract<keyof S, string>>(getState: () => S, parentUpdate: Update<S>) =>
  (prop: K): MeiosisCell<S[K]> => {
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
export const combinePatches =
  <S>(patches: Patch<S>[]): Patch<S> =>
  (initialState: S) =>
    patches.reduce((state, patch) => patch(state), initialState);

const getServices = <S>(app: App<S>): Service<S>[] => commonGetServices(app);

/**
 * Helper to setup the Meiosis pattern with function patches.
 *
 * @template S the State type.
 *
 * @param {MeiosisConfig<S>} config the Meiosis config for use with function patches.
 *
 * @returns {Meiosis<S, Patch<S>>} `{ states, getCell }`.
 */
export const setup = <S>({
  stream = simpleStream,
  app = {}
}: MeiosisConfig<S>): Stream<MeiosisCell<S>> =>
  nestSetup<S, Patch<S>, NestSetup<S, Patch<S>>, Service<S>, MeiosisCell<S>>({
    accumulator: (state, patch) => patch(state),
    getServices,
    nestCell,
    stream,
    app
  });

export default setup;
