import { ExternalStreamLib, Stream } from '../simple-stream';
import { NestSetup, commonGetServices, nestSetup } from '../common';
import { get } from '../util';

/**
 * @template S the State type.
 */
export type Patch<S> = {
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
   * // Using lodash/fp
   * update(_.set('count', 42));
   * ```
   */
  (state: S): S;
};

/**
 * Function to update the state witha patch.
 *
 * @template S the State type.
 */
export type Update<S> = {
  (patch: Patch<S>): any;
};

/**
 * View function.
 *
 * @template S the State type.
 */
export type View<S> = {
  (cell: MeiosisCell<S>, ...args: any[]): any;
};

/**
 * View component.
 *
 * @template S the State type.
 */
export type ViewComponent<S> = {
  view: View<S>;
};

/**
 * Nested views.
 *
 * @template S the State type.
 */
export type NestedViews<S> = {
  [K in keyof S]: ViewComponent<S>;
};

/**
 * A service gets called when the state changes and when the value returned by the `onchange`
 * function has changed.
 *
 * @template S the State type.
 */
export type Service<S> = {
  /**
   * Function that gets called when the state changes. This function should return a value from the
   * state. Only when that value changes will the service's `run` function be called.
   */
  onchange?: (state: S) => any;

  /**
   * Function that gets called when the value returned by the `onchange` function has changed.
   * The function should call `cell.update(...)` to update the state.
   */
  run: (cell: MeiosisCell<S>) => any;
};

/**
 * A Meiosis component has (all of which are optional) initial state, services, and nested
 * components.
 *
 * @template S the State type.
 */
export type MeiosisComponent<S> = {
  /** Initial state. */
  initial?: Partial<S>;

  /** An array of service functions. */
  services?: Service<S>[];

  /** Nested components. */
  nested?: NestedComponents<S>;
};

/**
 * A Meiosis component with a view, and (optional) initial state, services, and nested components.
 *
 * @template S the State type.
 */
export type MeiosisViewComponent<S> = MeiosisComponent<S> & ViewComponent<S>;

/**
 * Nested components match properties of the state.
 *
 * @template S the State type.
 */
export type NestedComponents<S> = {
  [K in keyof S]?: MeiosisComponent<S[K]>;
};

/**
 * Meiosis cell contains everything needed to access and update state.
 *
 * @template S the State type.
 */
export type MeiosisCell<S> = {
  /** The current state. */
  state: S;
  /** Function to update the state. */
  update: Update<S>;
  /** Produces a nested cell. */
  nest: <K extends Extract<keyof S, string>>(prop: K) => MeiosisCell<S[K]>;
  /** Contains nested view components. */
  nested: NestedViews<S>;
};

/**
 * Meiosis Config.
 *
 * @template S the State type.
 */
export type MeiosisConfig<S> = {
  stream?: ExternalStreamLib;
  app?: MeiosisComponent<S>;
};

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
export const setup = <S>(config?: MeiosisConfig<S>): Stream<MeiosisCell<S>> =>
  nestSetup<S, Patch<S>, NestSetup<S, Patch<S>>, Service<S>, MeiosisCell<S>>({
    accumulator: (state, patch) => patch(state),
    getServices,
    nestCell,
    stream: config?.stream,
    app: config?.app
  });

export default setup;