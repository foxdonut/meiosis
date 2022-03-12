import {
  App,
  Effect,
  MeiosisCell,
  Patch,
  Service,
  StateComponent,
  combinePatches,
  getComponentServices,
  getInitialState,
  setup
} from "../src/mergerino";

describe("Meiosis with TypeScript - Mergerino", () => {
  test("with no actions", () => {
    interface State {
      ducks: number;
      sound: string;
    }

    const app = { initial: { ducks: 1, sound: "silent" } };
    const { states, getCell } = setup<State>({ app });
    const cell = getCell();

    expect(cell.state).toEqual({ ducks: 1, sound: "silent" });

    cell.update({ sound: "quack" });
    expect(states()).toEqual({ ducks: 1, sound: "quack" });
  });

  test("with nesting and no actions", () => {
    interface Duck {
      color: string;
    }

    interface State {
      duck: Duck;
      sound: string;
    }

    const app = {};
    const { states, getCell } = setup<State>({ app });
    const cell = getCell();

    expect(cell.state).toEqual({});

    cell.update({ sound: "quack" });
    expect(states()).toEqual({ sound: "quack" });

    const duckCell = cell.nest("duck");
    expect(duckCell.state).toBeUndefined();

    duckCell.update({ color: "yellow" });
    expect(states()).toEqual({ sound: "quack", duck: { color: "yellow" } });
  });

  test("with actions", () => {
    interface State {
      ducks: number;
      sound: string;
    }

    interface Actions {
      addDucks: (cell: MeiosisCell<State>, amount: number) => void;
    }

    const actions: Actions = {
      addDucks: (cell, amount) => {
        cell.update({ ducks: value => value + amount });
      }
    };

    const app: App<State> = {
      initial: { ducks: 1, sound: "quack" }
    };

    const { states, getCell } = setup<State>({ app });
    const cell = getCell();

    expect(cell.state).toEqual({ ducks: 1, sound: "quack" });

    actions.addDucks(cell, 4);
    expect(states()).toEqual({ ducks: 5, sound: "quack" });
  });

  test("with actions and nesting", () => {
    interface Duck {
      color: string;
    }

    interface State {
      duck: Duck;
      sound: string;
    }

    interface DuckActions {
      changeDuckColor: (cell: MeiosisCell<Duck>, color: string) => void;
    }

    const duckActions: DuckActions = {
      changeDuckColor: (cell, color) => {
        cell.update({ color });
      }
    };

    const app = {
      initial: { duck: { color: "white" }, sound: "quack" }
    };

    const { states, getCell } = setup<State>({ app });
    const cell = getCell();

    const duckCell = cell.nest("duck");
    duckActions.changeDuckColor(duckCell, "yellow");
    expect(states()).toEqual({ duck: { color: "yellow" }, sound: "quack" });
  });

  test("services", () => {
    interface State {
      count: number;
      combined?: boolean;
      increment?: number;
      invalid?: boolean;
      sequence?: boolean;
      sequenced?: boolean;
      received?: boolean;
    }

    const servicePatches: Patch<State>[] = [
      { count: x => x + 1 },
      { increment: undefined },
      combinePatches([{ invalid: undefined }, { combined: true }]),
      { sequenced: true },
      { received: true }
    ];

    const updatePatches: Patch<State>[] = [
      { increment: 1 },
      { increment: 10 },
      { invalid: true },
      { sequence: true }
    ];

    const services: Service<State>[] = [
      state =>
        state.increment && state.increment > 0 && state.increment < 10 ? servicePatches[0] : null,
      state =>
        state.increment && (state.increment <= 0 || state.increment >= 10)
          ? servicePatches[1]
          : null,
      state => (state.invalid ? servicePatches[2] : null),
      state => (state.sequence ? servicePatches[3] : null),
      state => (state.sequenced ? servicePatches[4] : null)
    ];

    const { states, getCell } = setup<State>({ app: { initial: { count: 0 }, services } });
    const cell = getCell();

    cell.update(updatePatches[0]);
    cell.update(updatePatches[1]);
    cell.update(updatePatches[2]);
    cell.update(updatePatches[3]);

    expect(states()).toEqual({
      count: 1,
      combined: true,
      sequence: true,
      sequenced: true,
      received: true
    });
  });

  test("effects", () => {
    interface Counter {
      count: number;
      service: boolean;
    }

    interface CounterActions {
      increment: (cell: MeiosisCell<Counter>, value: number) => void;
    }

    const counterActions: CounterActions = {
      increment: (cell, value) => {
        cell.update({ count: count => count + value });
      }
    };

    const effects: Effect<Counter>[] = [
      cell => {
        // effect on state is seen by the next effect
        if (cell.state.count === 1) {
          counterActions.increment(cell, 1);
        }
      },
      cell => {
        if (cell.state.count === 2 && !cell.state.service) {
          cell.update({ service: true });
        }
      }
    ];

    const app: App<Counter> = {
      initial: { count: 0, service: false },
      effects
    };

    const { states, getCell } = setup<Counter>({ app });
    const cell = getCell();

    cell.update({ count: 1 });
    expect(states()).toEqual({ count: 2, service: true });

    // FIXME: add rest of test
  });

  describe("State Components", () => {
    test("initial state", () => {
      interface Nest {
        size: number;
      }

      interface Environment {
        material: string;
      }

      interface Duck {
        color: string;
        texture: string;
        house: Nest;
        env: Environment;
      }

      interface AppState {
        pet: Duck;
        sound: string;
      }

      const nestComponent: StateComponent<Nest> = {
        initial: {
          size: 37
        }
      };

      const duckComponent: StateComponent<Duck> = {
        initial: {
          color: "yellow",
          texture: "soft",
          env: {
            material: "straw"
          }
        },
        subComponents: {
          house: nestComponent
        }
      };

      const appComponent: StateComponent<AppState> = {
        initial: {
          sound: "quack"
        },
        subComponents: {
          pet: duckComponent
        }
      };

      const initialState = getInitialState(appComponent);

      expect(initialState).toEqual({
        sound: "quack",
        pet: {
          color: "yellow",
          texture: "soft",
          env: {
            material: "straw"
          },
          house: {
            size: 37
          }
        }
      });
    });

    test("state component services", () => {
      interface Nest {
        size: number;
      }

      const nestComponent: StateComponent<Nest> = {
        initial: {
          size: 37
        }
      };

      interface Environment {
        material: string;
      }

      interface Duck {
        color: string;
        texture: string;
        firstName: string;
        lastName: string;
        fullName: string;
        house: Nest;
        env: Environment;
      }

      const getFullName = (duck: Duck): string => `${duck.firstName} ${duck.lastName}`;
      const updateFullName = (cell: MeiosisCell<Duck>) =>
        cell.update({ fullName: getFullName(cell.state) });

      const duckComponent: StateComponent<Duck> = {
        initial: {
          color: "yellow",
          texture: "soft",
          firstName: "Fluffy",
          lastName: "McDuck",
          env: {
            material: "straw"
          }
        },
        services: [
          {
            onchange: state => state.firstName,
            run: updateFullName
          },
          {
            onchange: state => state.lastName,
            run: updateFullName
          }
        ],
        subComponents: {
          house: nestComponent
        }
      };

      interface AppState {
        pet: Duck;
        sound: string;
        volume: string;
      }

      const appComponent: StateComponent<AppState> = {
        initial: {
          sound: "quack"
        },
        services: [
          {
            onchange: state => state.sound,
            run: cell => {
              if (cell.state.sound === "quack") {
                cell.update({ volume: "loud" });
              } else {
                cell.update({ volume: "quiet" });
              }
            }
          }
        ],
        subComponents: {
          pet: duckComponent
        }
      };

      const initial = getInitialState(appComponent);
      const componentServices = getComponentServices(appComponent);
      const { getCell } = setup<AppState>({ app: { initial, componentServices } });

      expect(getCell().state.volume).toEqual("loud");
      getCell().update({ sound: "beck" });
      expect(getCell().state.volume).toEqual("quiet");

      expect(getCell().state.pet.fullName).toEqual("Fluffy McDuck");
      getCell().nest("pet").update({ lastName: "Quackington" });
      expect(getCell().state.pet.fullName).toEqual("Fluffy Quackington");
      getCell().nest("pet").update({ firstName: "Softy" });
      expect(getCell().state.pet.fullName).toEqual("Softy Quackington");
    });
  });
});
