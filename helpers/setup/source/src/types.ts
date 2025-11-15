import { ExternalStreamLib, Stream } from './simple-stream';

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

/**
 * Requires at least one property to be defined.
 *
 * Credit: https://stackoverflow.com/questions/48230773
 *   /how-to-create-a-partial-like-that-requires-a-single-property-to-be-set/48244432#48244432
 */
export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

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
   * Function that gets called at application initialization.
   * The function can call `cell.update(...)` to update the state.
   */
  init?: (cell: MeiosisCell<S>) => any;

  /**
   * Function that gets called when the state changes. This function should return a value from the
   * state. Only when that value changes will the service's `run` function be called.
   */
  onchange?: (state: S) => any;

  /**
   * Function that gets called when the value returned by the `onchange` function has changed.
   * The function should call `cell.update(...)` to update the state.
   */
  run?: (cell: MeiosisCell<S>) => any;
};

/**
 * Meiosis view function param.
 *
 * @template S the State type.
 */
export interface MeiosisViewParam<S> {
  cell: MeiosisCell<S>;
}

/**
 * Meiosis view function params.
 *
 * @template S the State type.
 */
export interface MeiosisViewParams<S> extends MeiosisViewParam<S> {
  [others: string]: any;
}

/**
 * A Meiosis view function, which receives a `cell` property and optional additional properties.
 *
 * @template S the State type.
 */
export type MeiosisView<S> = (params: MeiosisViewParams<S>) => any;

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

  /** Component view. */
  view?: (cell: MeiosisCell<S>, ...args: any[]) => any;
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

  /** The stream of states. */
  states: Stream<S>;
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
