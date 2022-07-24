import {
  MeiosisCell,
  MeiosisComponent,
  MeiosisConfig,
  NestedComponents,
  NestedViews,
  Patch,
  Service,
  Update
} from './types';
import { Stream, simpleStream, createDropRepeats } from './simple-stream';
import { assoc, concatIfPresent, get } from './util';
import merge from 'mergerino';

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
export const meiosisSetup = <S>(config?: MeiosisConfig<S>): Stream<MeiosisCell<S>> => {
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
