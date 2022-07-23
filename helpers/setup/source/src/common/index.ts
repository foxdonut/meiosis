import simpleStream, { ExternalStreamLib, Stream, createDropRepeats } from '../simple-stream';
import { assoc, concatIfPresent, get } from '../util';
import merge from 'mergerino';

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

const assembleInitialState = <S>(nestedComponents: NestedComponents<S> | undefined): any =>
  nestedComponents
    ? Object.keys(nestedComponents).reduce(
      (result, key) =>
        assoc(
          key,
          Object.assign(
            {},
            nestedComponents[key].initial,
            assembleInitialState(nestedComponents[key].nested)
          ),
          result
        ),
      {}
    )
    : {};

const getInitialState = <S>(app: MeiosisComponent<S>): S =>
  Object.assign({}, app.initial, assembleInitialState(app.nested));

const assembleView = <S>(nestedComponents: NestedComponents<S> | undefined): any =>
  nestedComponents
    ? Object.keys(nestedComponents).reduce((result, key) => {
      const nestedApp: MeiosisComponent<any> = nestedComponents[key];

      if (nestedApp.view !== undefined) {
        const view = nestedApp.view;

        return assoc(
          key,
          {
            view: (cell: any, ...args: any[]) => view(cell.nest(key), ...args),
            nested: assembleView(nestedApp.nested)
          },
          result
        );
      }
      return result;
    }, {})
    : {};

const getView = <S>(app: MeiosisComponent<S>): NestedViews<S> =>
  assembleView(app.nested);

const assembleServices = <S>(
  nestedComponents: NestedComponents<S> | undefined,
  getCell = (cell) => cell,
  getState = (state) => state
): Service<S>[] =>
  nestedComponents
    ? Object.keys(nestedComponents).reduce((result, key) => {
      const nextGetCell = (cell) => getCell(cell).nest(key);
      const nextGetState = (state) => getState(state)[key];

      const nestedApp: MeiosisComponent<any> = nestedComponents[key];

      return concatIfPresent(
        result,
        nestedApp.services?.map<Service<any>>((service) => ({
          onchange: (state) => (service.onchange ? service.onchange(nextGetState(state)) : state),
          run: (cell) => service.run(nextGetCell(cell))
        }))
      ).concat(assembleServices(nestedApp.nested, nextGetCell, nextGetState));
    }, [] as Service<S>[])
    : [];

const getServices = <S>(app: MeiosisComponent<S>): Service<S>[] =>
  concatIfPresent([] as Service<S>[], app.services).concat(assembleServices(app.nested));

const baseSetup = <S>({ stream, app }: MeiosisConfig<S>) => {
  if (!stream) {
    stream = simpleStream;
  }

  const safeApp = app || {};
  const initial = getInitialState(safeApp);
  const view = getView(safeApp);

  const createStream = typeof stream === 'function' ? stream : stream.stream;
  const scan = stream.scan;

  const update: Stream<Patch<S>> = createStream();

  const states: Stream<S> = scan(
    (state: S, patch: Patch<S>) => merge(state, patch),
    initial,
    update
  );

  return {
    states,
    update,
    view
  };
};

const nestPatch = <S, K extends Extract<keyof S, string>>(patch: Patch<S[K]>, prop: K): Patch<S> =>
  ({ [prop]: patch } as Patch<S>);

const nestUpdate =
  <S, K extends Extract<keyof S, string>>(parentUpdate: Update<S>, prop: K): Update<S[K]> =>
    (patch) =>
      parentUpdate(nestPatch(patch, prop));

const nestCell =
  <S>(
    getState: () => S,
    parentUpdate: Update<S>,
    components: MeiosisComponent<S> | undefined
  ) =>
    <K extends Extract<keyof S, string>>(prop: K): MeiosisCell<S[K]> => {
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
 * Helper to setup the Meiosis pattern with [Mergerino](https://github.com/fuzetsu/mergerino).
 *
 * @template S the State type.
 *
 * @param config the Meiosis config for use with Mergerino
 *
 * @returns a stream of Meiosis cells.
 */
export const setup = <S>(config?: MeiosisConfig<S>): Stream<MeiosisCell<S>> => {
  const stream = config?.stream;
  const app = config?.app;

  const { states, update, view } = baseSetup<S>({
    stream,
    app
  });

  const nest = nestCell(states, update, view);
  const getState = () => states();
  const getCell = (state: S): MeiosisCell<S> => ({ state, getState, update, nest, nested: view });
  const dropRepeats = createDropRepeats(stream);

  if (app) {
    getServices(app).forEach((service) => {
      dropRepeats(states, service.onchange).map((state) => service.run(getCell(state)));
    });
  }

  const cells: Stream<MeiosisCell<S>> = dropRepeats(states).map(getCell);

  return cells;
};

export default setup;
