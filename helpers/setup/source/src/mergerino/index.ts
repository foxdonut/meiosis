import { ExternalStreamLib, Stream } from '../simple-stream';
import merge from 'mergerino';
import {
  NestSetup,
  commonGetServices,
  nestSetup,
  updateStringValueIntoPath,
  updateIntValueIntoPath,
  updateFloatValueIntoPath
} from '../common';
import { get } from '../util';

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
  | S[K]
  | Patch<S[K]>
  | ((a: S[K]) => S[K] | null | undefined)
  | null
  | undefined;
};

// Credit: https://stackoverflow.com/questions/48230773
//   /how-to-create-a-partial-like-that-requires-a-single-property-to-be-set/48244432#48244432
type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

// For reference:
// https://docs.microsoft.com/en-us/javascript/api/@azure/keyvault-certificates
//   /requireatleastone?view=azure-node-latest
/*
type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T]
*/

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
export type Patch<S> = FunctionPatch<S> | AtLeastOne<ObjectPatch<S>> | Patch<S>[];

/**
 * Function to update the state with a patch.
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

  /** Returns the current state. Useful in code where state may have changed elsewhere. */
  getState: () => S;

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

const nestPatch = <S, K extends Extract<keyof S, string>>(patch: Patch<S[K]>, prop: K): Patch<S> =>
  ({ [prop]: patch } as Patch<S>);

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
        getState: getNestedState,
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
export const combinePatches = <S>(patches: Patch<S>[]): Patch<S> => patches;

// helpers to update values from input

const intoPath = (path: string[], value: string | number): any => ({
  [path[0]]: path.length === 1 ? value : intoPath(path.slice(1), value)
});

/**
 * Convenience function to update a form value. Pass the Meiosis cell and the state property (such
 * as `'firstName'`) or path (such as `['person', 'firstName']`) into which to update the value.
 * Returns a function that you can pass to a DOM handler, such as `oninput` (Mithril) or `onInput`
 * (Preact, React). For example:
 *
 * ```js
 * // Using Mithil
 * m('input[type=text]', { oninput: updateFormValue(cell, 'firstName') })
 *
 * // Using Preact/React
 * <input type="text" onInput={updateFormValue(cell, ['person', 'firstName'])}/>
 * ```
 *
 * @param cell the Meiosis cell.
 * @param path the property or path into which to update the value.
 * @param fn (optional) a function to modify the value before updating it.
 *
 * @returns a function that accepts a DOM event and updates the value on the Meiosis state.
 */
export const updateFormValue = (
  cell: MeiosisCell<any>,
  path: string[] | string,
  fn: (value: string) => any = (value) => value
) => updateStringValueIntoPath(intoPath, cell, path, fn);

/**
 * Convenience function to update a form value with an Integer value. If the user input does not
 * return a number with `parseInt`, no state change occurs. Pass the Meiosis cell and the state
 * property (such as `'counter'`) or path (such as `['book', 'counter']`) into which to update the
 * value. Returns a function that you can pass to a DOM handler, such as `oninput` (Mithril) or
 * `onInput` (Preact, React). For example:
 *
 * ```js
 * // Using Mithil
 * m('input[type=text]', { oninput: updateFormIntValue(cell, 'counter') })
 *
 * // Using Preact/React
 * <input type="text" onInput={updateFormIntValue(cell, ['book', 'counter'])}/>
 * ```
 *
 * @param cell the Meiosis cell.
 * @param path the property or path into which to update the value.
 *
 * @returns a function that accepts a DOM event and updates the value on the Meiosis state.
 */
export const updateFormIntValue = (cell: MeiosisCell<any>, path: string[] | string) =>
  updateIntValueIntoPath(intoPath, cell, path);

/**
 * Convenience function to update a form value with a Float value. If the user input does not return
 * a number with `parseFloat`, no state change occurs. Pass the Meiosis cell and the state property
 * (such as `'pH'`) or path (such as `['water', 'pH']`) into which to update the value. Returns a
 * function that you can pass to a DOM handler, such as `oninput` (Mithril) or `onInput` (Preact,
 * React). For example:
 *
 * ```js
 * // Using Mithil
 * m('input[type=text]', { oninput: updateFormFloatValue(cell, 'pH') })
 *
 * // Using Preact/React
 * <input type="text" onInput={updateFormFloatValue(cell, ['water', 'pH'])}/>
 * ```
 *
 * @param cell the Meiosis cell.
 * @param path the property or path into which to update the value.
 *
 * @returns a function that accepts a DOM event and updates the value on the Meiosis state.
 */
export const updateFormFloatValue = (cell: MeiosisCell<any>, path: string[] | string) =>
  updateFloatValueIntoPath(intoPath, cell, path);

// Services

const getServices = <S>(component: MeiosisComponent<S>): Service<S>[] =>
  commonGetServices(component);

/**
 * Helper to setup the Meiosis pattern with [Mergerino](https://github.com/fuzetsu/mergerino).
 *
 * @template S the State type.
 *
 * @param config the Meiosis config for use with Mergerino
 *
 * @returns a stream of Meiosis cells.
 */
export const setup = <S>(config?: MeiosisConfig<S>): Stream<MeiosisCell<S>> =>
  nestSetup<S, Patch<S>, NestSetup<S, Patch<S>>, Service<S>, MeiosisCell<S>>({
    accumulator: merge,
    getServices,
    nestCell,
    stream: config?.stream,
    app: config?.app
  });

export default setup;
