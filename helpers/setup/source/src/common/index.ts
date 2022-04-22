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

export interface CommonService<S> {
  onchange?: (state: S) => any;
  run: (cell: any) => any;
}

export interface CommonMeiosisComponent<S> {
  initial?: Partial<S>;
  services?: CommonService<S>[];
  view?: (cell: any, ...args: any[]) => any;
  nested?: CommonNestedComponents<S>;
}

export type CommonNestedComponents<S> = {
  [K in keyof S]?: CommonMeiosisComponent<S[K]>;
};

/**
 * @template S the State type.
 */
export interface CommonMeiosisConfig<S> {
  /**
   * The stream library. This works with `meiosis.simpleStream`, `flyd`, `m.stream`, or anything for
   * which you provide either a function or an object with a `stream` function to create a stream.
   * The function or object must also have a `scan` property. The returned stream must have a `map`
   * method.
   */
  stream?: ExternalStreamLib;

  /**
   * The application object, with optional properties.
   */
  app?: CommonMeiosisComponent<S>;
}

/**
 * Meiosis configuration.
 *
 * @template S the State type.
 * @template P the Patch type.
 */
interface MeiosisConfig<S, P> extends CommonMeiosisConfig<S> {
  /**
   * The accumulator function.
   */
  accumulator: Accumulator<S, P>;
}

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

export const commonGetServices = <S>(app: CommonMeiosisComponent<S>): CommonService<S>[] =>
  concatIfPresent([] as CommonService<S>[], app.services).concat(assembleServices(app.nested));

/**
 * Base helper to setup the Meiosis pattern. If you are using Mergerino, Function Patches, or Immer,
 * use their respective `setup` function instead.
 *
 * Patch is merged in to the state by default.
 *
 * @template S the State type.
 * @template P the Patch type.
 *
 * @param {MeiosisConfig<S, P>} config the Meiosis config.
 *
 * @returns {Meiosis<S, P>} the Meiosis setup.
 */
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

export interface NestSetup<S, P> {
  accumulator: Accumulator<S, P>;
  getServices: any;
  nestCell: any;
  stream: ExternalStreamLib;
  app: any;
}

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

/*
https://stackoverflow.com/questions/66181496/typescript-generic-generic
https://www.typescriptlang.org/play?#code/HYQwtgpgzgDiDGEAEApeIA2AvJBvAUIUkgJbAAuEATgGYLICiAbhBXvsceQJ4wQBcSKOSpkA5gG4OSAL5EkPPkmatyAFV4QAPGqQQAHpWAATKMpYUAfEgC8SNQG0A5IohOAulK6bzqgBIgJhjUOnqGrKa+VrZIABQQFuSCagCUttZMAPYkxlLSAPT5QplIdFTFSGKZmcbSrlHqmgCCJgFB1GoArjDBoQZGkSrRdg5DjXw6lgA0DW3GwVSTnvKFCgAWJGabSADua9TIAJK7m2tIx-CZnRjGSMYlAEYQ5JRUAHTnSOClmVSIt+QSp0oBBboFuHUfGMNHwWsY5gsuj1oDFoc1WoF5h1ur1wZYHO55GRXnREPYapkmsZjKCxmEBmY6QROApNIIAERqClUmnGdleTiA+4AOXAAiEInEAuIxhAlB5oMEABE5RABXJvEoufcFfDMQtUYkESFtZTqbTEpY8sRidRSchTQAlCBgTIsYx0-oRRmJdgs1wcp0ut2g-nSLgU0WQQTCUTASThu6q52u93K1XqyFaikpkN69rlOxjY2LIOpi2qK2EaQ0+AYEBUZCXYDCBTc80exKCNETU26sZVmUQOsNpuZFvkJBrfUQPsdsbdo0z0vt3kDgW1+uNpDN1tCzK590Lhow7RlvPrmvDrdjidTmfno9d2bLnQ54NPyvWpCgSCwehIAAqsAJDjuwib1MBoHAAA8jQPYQHCJZIsEZhFokZheiYWzADQ1D2EgAD8ibELoWGDL6hEnui+ZYlQKFntYgjAAk+HMaxVDSkgqyQSB45wQhSHLgxaFIImqyCRiBYMW+OrzpaSAAD7UbCUl0TJj4VlY8iaowGExHOa6+spmmdqo37EKsmQANYgBCLK7pOrEUKeXLITi0CCFB-HwYkp5CdJHlQASMQOCRSAOPu-aJDM07tIZWnkO4UzhZF77lmZFCxQ+6UXokhIsss4lFNQVC-ImjlIA8ICZeMs6ZO5yJQF5fGwb5qj+WpiJBSFIypfuh6Jdl8WrolyXcSVVBlVQACEiZFcQcjSL+0BwGSADirDUCQ8DgQ546tiAUAIW5wlBTEfThNhDQEpYsTheQQWCA4byvbgEXHGQSDWRA3CZDQ9juIuHU0Y1vQMIYVAIOQOgOIc40DtYMgFZwaQ2NYj1NXkxVIDZdkVQdTl+Zop2BU1MRHSdDVnU1sRhSyxBpXJRmqMNWIJbVyX9bln5ZfeI33INnPzSkFkTXoU3lftd7VbVrnU2TqEU8dxN8KT6lBXT3OCx+Q38+zo2czMqylb8c2FaL8hyHIQA

interface Event {
  type: string;
}

type EventType<T extends Event> = T['type'];
type EventHandler<T extends Event> = (event: T) => void;

// so far so good
type EventTypeAndHandlerTuple<T extends Event> = [EventType<T>, EventHandler<T>];

// this is where I wish I could do better. I am forced to used any
type EventTypeAndHandlerTuples = EventTypeAndHandlerTuple<any>[];

interface TodoAddedEvent extends Event {
  type: 'TodoAdded';
  todoName: string;
  dateAdded: Date;
}
type TodoAddedHandler = EventHandler<TodoAddedEvent>;

interface TodoRemovedEvent extends Event {
  type: 'TodoRemoved';
  todoName: string;
  dateRemoved: Date;
}
type TodoRemovedHandler = EventHandler<TodoRemovedEvent>;

declare const todoAddedEvent: EventType<TodoAddedEvent>;
declare const handleTodoAddedEvent: TodoAddedHandler;
declare const todoRemovedEvent: EventType<TodoRemovedEvent>;
declare const handleTodoRemovedEvent: TodoRemovedHandler;

const eventTypeToHandlerTuples: EventTypeAndHandlerTuples = [
  [todoAddedEvent, handleTodoRemovedEvent],
  [todoRemovedEvent, handleTodoAddedEvent]
];

console.log(eventTypeToHandlerTuples);

type Events = TodoAddedEvent | TodoRemovedEvent;

type UnionOfEventTypeAndHandlerTuples = Events extends infer T
  ? T extends Event
    ? EventTypeAndHandlerTuple<T>
    : never
  : never;

const goodEventTypeToHandlerTuples: UnionOfEventTypeAndHandlerTuples[] = [
  [todoAddedEvent, handleTodoAddedEvent],
  [todoRemovedEvent, handleTodoRemovedEvent]
];

console.log(goodEventTypeToHandlerTuples);

const badEventTypeToHandlerTuples: UnionOfEventTypeAndHandlerTuples[] = [
  [todoRemovedEvent, handleTodoAddedEvent] // error!
];

console.log(badEventTypeToHandlerTuples);

const asEventTypeToHandlerTuples = <T extends Event[]>(
  tuples: [...{ [I in keyof T]: EventTypeAndHandlerTuple<Extract<T[I], Event>> }]
) => tuples;

const goodGenericEventTypeToHandlerTuples = asEventTypeToHandlerTuples([
  [todoAddedEvent, handleTodoAddedEvent],
  [todoRemovedEvent, handleTodoRemovedEvent]
]);

console.log(goodGenericEventTypeToHandlerTuples);

const badGenericEventTypeToHandlerTuples = asEventTypeToHandlerTuples([
  [todoRemovedEvent, handleTodoAddedEvent] // error!
]);

console.log(badGenericEventTypeToHandlerTuples);
*/
