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

export interface App<S> extends CommonApp<S, Patch<S>> {
  /**
   * An array of service functions.
   */
  services?: Service<S>[];

  /**
   * An array of effect functions.
   */
  effects?: Effect<S>[];
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
  app: App<S>;
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

/**
 * Helper to setup the Meiosis pattern with [Mergerino](https://github.com/fuzetsu/mergerino).
 *
 * @template S the State type.
 *
 * @param {MeiosisConfig<S>} config the Meiosis config for use with Mergerino
 *
 * @returns {Meiosis<S, Patch<S>>} `{ states, getCell }`.
 */
export const setup = <S>({ stream, app }: MeiosisConfig<S>): MeiosisSetup<S> => {
  const { states, getCell } = commonSetup({
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

  if (app?.effects != null && app.effects.length > 0) {
    states.map(() => app.effects?.forEach(effect => effect(getCellWithNest())));
  }

  return {
    states,
    getCell: getCellWithNest
  };
};

export default setup;
