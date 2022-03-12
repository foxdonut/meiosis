import simpleStream from "../simple-stream";
import merge from "mergerino";
import commonSetup, {
  CommonApp,
  CommonMeiosisCell,
  CommonMeiosisConfig,
  CommonMeiosisSetup,
  CommonService,
  CommonUpdate
} from "../common";

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
    | Patch<S[K]>
    | ((a: S[K]) => S[K] | null | undefined)
    | null
    | undefined;
};

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
export type Patch<S> = FunctionPatch<S> | ObjectPatch<S> | Patch<S>[];

export type Update<S> = CommonUpdate<Patch<S>>;

export type Service<S> = CommonService<S, Patch<S>>;

export interface Effect<S> {
  (cell: MeiosisCell<S>): void;
}

export interface ComponentService<S> {
  onchange: (state: S) => any;
  run: (cell: MeiosisCell<S>) => any;
}

export interface App<S> extends CommonApp<S, Patch<S>> {
  /**
   * An array of service functions.
   */
  services?: Service<S>[];

  /**
   * An array of effect functions.
   */
  effects?: Effect<S>[];

  componentServices?: ComponentService<S>[];
}

export interface MeiosisCell<S> extends CommonMeiosisCell<S, Patch<S>> {
  nest: <K extends Extract<keyof S, string>>(prop: K) => MeiosisCell<S[K]>;
}

/**
 * Meiosis Config.
 *
 * @template S the State type.
 */
export interface MeiosisConfig<S> extends CommonMeiosisConfig<S, Patch<S>> {
  app?: App<S>;
}

export interface MeiosisSetup<S> extends CommonMeiosisSetup<S, Patch<S>> {
  getCell: () => MeiosisCell<S>;
}

const nestPatch = <S, K extends Extract<keyof S, string>>(
  patch: Patch<S[K]>,
  prop: K
): Patch<S> => {
  const nestedPatch = { [prop]: patch } as unknown;
  return nestedPatch as Patch<S>;
};

const nestUpdate = <S, K extends Extract<keyof S, string>>(
  parentUpdate: Update<S>,
  prop: K
): Update<S[K]> => {
  return patch => parentUpdate(nestPatch(patch, prop));
};

const nestCell = <S, K extends Extract<keyof S, string>>(
  getState: () => S,
  parentUpdate: Update<S>
) => (prop: K): MeiosisCell<S[K]> => {
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
export const combinePatches = <S>(patches: Patch<S>[]): Patch<S> => patches;

const assoc = (key: string, value: any, result: any): any => {
  result[key] = value;
  return result;
};

type SubComponents<S> = {
  [K in keyof S]?: StateComponent<S[K]>;
};

export interface StateComponent<S> {
  initial?: Partial<S>;
  services?: ComponentService<S>[];
  subComponents?: SubComponents<S>;
}

const assembleInitialState = (subComponents: SubComponents<any> | undefined): any =>
  subComponents
    ? Object.keys(subComponents).reduce(
        (result, key) =>
          assoc(
            key,
            Object.assign(
              {},
              subComponents[key]?.initial,
              assembleInitialState(subComponents[key]?.subComponents)
            ),
            result
          ),
        {}
      )
    : {};

export const getInitialState = <S>(component: StateComponent<S>): S =>
  Object.assign({}, component.initial, assembleInitialState(component.subComponents));

const concatIfPresent = (target: any[], source?: any[]): any[] =>
  source ? target.concat(source) : target;

/*
const assembleServices = <S>(
  subComponents: SubComponents<S> | undefined,
  getState = state => state,
  nest = nestPatch
): Service<S>[] =>
  subComponents
    ? Object.keys(subComponents).reduce((result, key) => {
        const nextGetState = state => getState(state[key]);
        const nextNestPatch = (patch, key) => nest<any, any>(patch, key);

        return concatIfPresent(
          result,
          subComponents[key]?.services?.map(service => state => {
            const patch = service(nextGetState(state));
            return patch ? nextNestPatch(patch, key) : null;
          })
        ).concat(assembleServices(subComponents[key]?.subComponents, nextGetState, nextNestPatch));
      }, [] as Service<S>[])
    : [];

export const getServices = <S>(component: StateComponent<S>): Service<S>[] =>
  concatIfPresent([] as Service<S>[], component.services).concat(
    assembleServices(component.subComponents)
  );

const assembleEffects = <S>(
  subComponents: SubComponents<S> | undefined,
  getCell = cell => cell
): Effect<S>[] =>
  subComponents
    ? Object.keys(subComponents).reduce((result, key) => {
        const nextGetCell = cell => getCell(cell).nest(key);

        return concatIfPresent(
          result,
          subComponents[key]?.effects?.map(effect => cell => effect(nextGetCell(cell)))
        ).concat(assembleEffects(subComponents[key]?.subComponents, nextGetCell));
      }, [] as Effect<S>[])
    : [];

export const getEffects = <S>(component: StateComponent<S>): Effect<S>[] =>
  concatIfPresent([] as Effect<S>[], component.effects).concat(
    assembleEffects(component.subComponents)
  );
*/

const assembleServices = <S>(
  subComponents: SubComponents<S> | undefined,
  getCell = cell => cell
): ComponentService<S>[] =>
  subComponents
    ? Object.keys(subComponents).reduce((result, key) => {
        const nextGetCell = (cell: MeiosisCell<S>): MeiosisCell<typeof key> =>
          getCell(cell).nest(key);

        return concatIfPresent(
          result,
          subComponents[key]?.services?.map(service => ({
            onchange: state => service.onchange(state[key]),
            run: cell => service.run(nextGetCell(cell))
          }))
        ).concat(assembleServices(subComponents[key]?.subComponents, nextGetCell));
      }, [] as ComponentService<S>[])
    : [];

export const getComponentServices = <S>(component: StateComponent<S>): ComponentService<S>[] =>
  concatIfPresent([] as ComponentService<S>[], component.services).concat(
    assembleServices(component.subComponents)
  );

/**
 * Helper to setup the Meiosis pattern with [Mergerino](https://github.com/fuzetsu/mergerino).
 *
 * @template S the State type.
 *
 * @param {MeiosisConfig<S>} config the Meiosis config for use with Mergerino
 *
 * @returns {Meiosis<S, Patch<S>>} `{ states, getCell }`.
 */
export const setup = <S>({
  stream = simpleStream,
  app = {}
}: MeiosisConfig<S>): MeiosisSetup<S> => {
  const { states, getCell, dropRepeats } = commonSetup({
    stream,
    accumulator: merge,
    app
  });

  const getCellWithNest = () => {
    const cell = getCell();

    const cellWithNest: MeiosisCell<S> = {
      ...cell,
      nest: nestCell(states, cell.update)
    };

    return cellWithNest;
  };

  if (app?.componentServices != null && app.componentServices.length > 0) {
    // states.map(() => app.effects?.forEach(effect => effect(getCellWithNest())));

    app.componentServices.forEach(service => {
      dropRepeats(states, service.onchange).map(() => service.run(getCellWithNest()));
    });
  }

  if (app?.effects != null && app.effects.length > 0) {
    states.map(() => app.effects?.forEach(effect => effect(getCellWithNest())));
  }

  return {
    states,
    getCell: getCellWithNest
  };
};

export default setup;
