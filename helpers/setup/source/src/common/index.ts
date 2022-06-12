import simpleStream, {
  Accumulator,
  ExternalStreamLib,
  Stream,
  createDropRepeats
} from '../simple-stream';
import { assoc, concatIfPresent } from '../util';

interface CommonMeiosisSetup<S, P> {
  states: Stream<S>;
  update: Stream<P>;
  view: any;
}

/**
 * Internal use only.
 */
export interface CommonService<S> {
  onchange?: (state: S) => any;
  run: (cell: any) => any;
}

/**
 * Internal use only.
 */
export interface CommonMeiosisComponent<S> {
  initial?: Partial<S>;
  services?: CommonService<S>[];
  nested?: CommonNestedComponents<S>;
  view?: (cell: any, ...args: any[]) => any;
}

/**
 * Internal use only.
 */
export type CommonNestedComponents<S> = {
  [K in keyof S]?: CommonMeiosisComponent<S[K]>;
};

/**
 * Internal use only.
 */
interface CommonMeiosisConfig<S> {
  stream?: ExternalStreamLib;
  app?: CommonMeiosisComponent<S>;
}

interface MeiosisConfig<S, P> extends CommonMeiosisConfig<S> {
  /**
   * The accumulator function.
   */
  accumulator: Accumulator<S, P>;
}

/**
 * Represents a DOM event.
 */
export interface DomEvent {
  target: {
    value: string;
  };
}

// helpers to update values from input

type Updatable = {
  update: (value: any) => any;
};

type PathUpdateFn = (path: string[], value: string | number) => any;

type ParseFn = (value: string) => number;

const updateParseValue =
  (intoPath: PathUpdateFn, parseFn: ParseFn, cell: Updatable, path: string[]) =>
  (evt: DomEvent) => {
    const value = parseFn(evt.target.value);
    if (!isNaN(value)) {
      cell.update(intoPath(path, value));
    }
  };

export const updateStringValueIntoPath =
  (intoPath: PathUpdateFn, cell: Updatable, path: string[], fn: (value: string) => any) =>
  (evt: DomEvent) =>
    cell.update(intoPath(path, fn(evt.target.value)));

export const updateIntValueIntoPath =
  (intoPath: PathUpdateFn, cell: Updatable, path: string[]) => (evt: DomEvent) =>
    updateParseValue(intoPath, parseInt, cell, path)(evt);

export const updateFloatValueIntoPath =
  (intoPath: PathUpdateFn, cell: Updatable, path: string[]) => (evt: DomEvent) =>
    updateParseValue(intoPath, parseFloat, cell, path)(evt);

const assembleInitialState = <S>(nestedComponents: CommonNestedComponents<S> | undefined): any =>
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

const getInitialState = <S>(app: CommonMeiosisComponent<S>): S =>
  Object.assign({}, app.initial, assembleInitialState(app.nested));

const assembleView = <S>(nestedComponents: CommonNestedComponents<S> | undefined): any =>
  nestedComponents
    ? Object.keys(nestedComponents).reduce((result, key) => {
        const nestedApp: CommonMeiosisComponent<any> = nestedComponents[key];

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

const getView = <S>(app: CommonMeiosisComponent<S>): CommonMeiosisComponent<S> =>
  assembleView(app.nested);

const assembleServices = <S>(
  nestedComponents: CommonNestedComponents<S> | undefined,
  getCell = (cell) => cell,
  getState = (state) => state
): CommonService<S>[] =>
  nestedComponents
    ? Object.keys(nestedComponents).reduce((result, key) => {
        const nextGetCell = (cell) => getCell(cell).nest(key);
        const nextGetState = (state) => getState(state)[key];

        const nestedApp: CommonMeiosisComponent<any> = nestedComponents[key];

        return concatIfPresent(
          result,
          nestedApp.services?.map<CommonService<any>>((service) => ({
            onchange: (state) => (service.onchange ? service.onchange(nextGetState(state)) : state),
            run: (cell) => service.run(nextGetCell(cell))
          }))
        ).concat(assembleServices(nestedApp.nested, nextGetCell, nextGetState));
      }, [] as CommonService<S>[])
    : [];

/**
 * Internal use only.
 */
export const commonGetServices = <S>(app: CommonMeiosisComponent<S>): CommonService<S>[] =>
  concatIfPresent([] as CommonService<S>[], app.services).concat(assembleServices(app.nested));

const setup = <S, P>({
  stream,
  accumulator,
  app
}: MeiosisConfig<S, P>): CommonMeiosisSetup<S, P> => {
  if (!stream) {
    stream = simpleStream;
  }
  if (!accumulator) {
    throw new Error('No accumulator function was specified.');
  }

  const safeApp = app || {};
  const initial = getInitialState(safeApp);
  const view = getView(safeApp);

  // falsy patches are ignored
  const accumulatorFn = (state: S, patch: P) => (patch ? accumulator(state, patch) : state);

  const createStream = typeof stream === 'function' ? stream : stream.stream;
  const scan = stream.scan;

  const update: Stream<P> = createStream();

  const states: Stream<S> = scan(
    (state: S, patch: P) => accumulatorFn(state, patch),
    initial,
    update
  );

  return {
    states,
    update,
    view
  };
};

/**
 * Internal use only.
 */
export interface NestSetup<S, P> {
  accumulator: Accumulator<S, P>;
  getServices: any;
  nestCell: any;
  stream?: ExternalStreamLib;
  app: any;
}

/**
 * Internal use only.
 */
export const nestSetup = <S, P, F extends NestSetup<S, P>, T extends CommonService<S>, C>({
  accumulator,
  getServices,
  nestCell,
  stream = simpleStream,
  app = {}
}: F): Stream<C> => {
  const { states, update, view } = setup<S, P>({
    stream,
    accumulator,
    app
  });

  const nest = nestCell(states, update, view);
  const getCell = (state: S) => ({ state, update, nest, nested: view });
  const dropRepeats = createDropRepeats(stream);

  if (app) {
    getServices(app).forEach((service: T) => {
      dropRepeats(states, service.onchange).map((state) => service.run(getCell(state)));
    });
  }

  const cells: Stream<any> = dropRepeats(states).map(getCell);

  return cells;
};
