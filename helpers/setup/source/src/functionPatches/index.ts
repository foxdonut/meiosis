import simpleStream, { Stream } from '../simple-stream';
import {
  CommonMeiosisComponent,
  CommonMeiosisConfig,
  CommonService,
  NestSetup,
  commonGetServices,
  nestSetup
} from '../common';
import { get } from '../util';

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

export interface View<S> {
  (cell: MeiosisCell<S>, ...args: any[]): any;
}

export interface ViewComponent<S> {
  view: View<S>;
}

export type NestedViews<S> = {
  [K in keyof S]: ViewComponent<S>;
};

export interface Service<S, R = any> extends CommonService<S, R> {
  run: (cell: MeiosisCell<S>, root: MeiosisCell<R>) => any;
}

export interface MeiosisComponent<S, R = any> extends CommonMeiosisComponent<S, R> {
  /**
   * An array of service functions.
   */
  services?: Service<S, R>[];
  view?: (cell: MeiosisCell<S>, ...args: any[]) => any;
  nested?: NestedComponents<S, R>;
}

export interface MeiosisViewComponent<S, R = any> extends MeiosisComponent<S, R> {
  view: View<S>;
}

export type NestedComponents<S, R = any> = {
  [K in keyof S]?: MeiosisComponent<S[K], R>;
};

export interface MeiosisCell<S> {
  state: S;
  update: Update<S>;
  nest: <K extends Extract<keyof S, string>>(prop: K) => MeiosisCell<S[K]>;
  nested: NestedViews<S>;
}

/**
 * Meiosis Config.
 *
 * @template S the State type.
 */
export interface MeiosisConfig<S> extends CommonMeiosisConfig<S> {
  app?: MeiosisComponent<S>;
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
  <S, K extends Extract<keyof S, string>>(
    getState: () => S,
    parentUpdate: Update<S>,
    components: MeiosisComponent<S> | undefined
  ) =>
  (prop: K): MeiosisCell<S[K]> => {
    const getNestedState = () => getState()[prop];
    const nestedUpdate: Update<S[K]> = nestUpdate(parentUpdate, prop);
    const nestedComponents = get(components, [prop, 'nested']);

    return {
      state: getNestedState(),
      update: nestedUpdate,
      nest: nestCell(getNestedState, nestedUpdate, nestedComponents),
      nested: nestedComponents
    };
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

const getServices = <S>(component: MeiosisComponent<S>): Service<S>[] =>
  commonGetServices(component);

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
