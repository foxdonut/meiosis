import simpleStream from "../src/simple-stream";
import {
  ActionConstructor,
  App,
  Effect,
  MeiosisCell,
  Patch,
  Service,
  combinePatches,
  setup
} from "../src/immer";
import produce from "immer";

describe("Meiosis with TypeScript - Immer", () => {
  describe("Meiosis", () => {
    test("with no actions", () => {
      interface State {
        ducks: number;
        sound: string;
      }

      const app = { initial: { ducks: 1, sound: "silent" } };
      const { states, getCell } = setup<State>({ stream: simpleStream, produce, app });
      const cell = getCell();

      expect(cell.actions).toBeUndefined();
      expect(cell.state).toEqual({ ducks: 1, sound: "silent" });

      cell.update(state => {
        state.sound = "quack";
      });
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

      const initial = { duck: { color: "" }, sound: "" };
      const app = { initial };
      const { states, getCell } = setup<State>({ stream: simpleStream, produce, app });
      const cell = getCell();

      expect(cell.actions).toBeUndefined();
      expect(cell.state).toEqual(initial);

      cell.update(state => {
        state.sound = "quack";
      });
      expect(states()).toEqual({ duck: { color: "" }, sound: "quack" });

      const duckCell = cell.nest("duck");
      expect(duckCell.state).not.toBeUndefined();

      duckCell.update(state => {
        state.color = "yellow";
      });
      expect(states()).toEqual({ sound: "quack", duck: { color: "yellow" } });
    });

    test("with actions", () => {
      interface State {
        ducks: number;
        sound: string;
      }

      interface Actions {
        addDucks: (amount: number) => void;
      }

      const app: App<State, Actions> = {
        initial: { ducks: 1, sound: "quack" },
        Actions: context => ({
          addDucks: (amount: number) => {
            context.update(state => {
              state.ducks += amount;
            });
          }
        })
      };

      const { states, getCell } = setup<State, Actions>({ stream: simpleStream, produce, app });
      const cell = getCell();

      expect(cell.actions).toBeDefined();
      expect(cell.state).toEqual({ ducks: 1, sound: "quack" });

      cell.actions.addDucks(4);
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
          cell.update(state => {
            state.color = color;
          });
        }
      };

      const app = {
        initial: { duck: { color: "white" }, sound: "quack" }
      };

      const { states, getCell } = setup<State>({ stream: simpleStream, produce, app });
      const cell = getCell();

      expect(cell.actions).toBeUndefined();

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
        draft => {
          draft.count++;
        },
        draft => {
          delete draft.increment;
        },
        combinePatches<State>(produce, [
          draft => {
            delete draft.invalid;
          },
          draft => {
            draft.combined = true;
          }
        ]),
        draft => {
          draft.sequenced = true;
        },
        draft => {
          draft.received = true;
        }
      ];

      const updatePatches: Patch<State>[] = [
        state => {
          state.increment = 1;
        },
        state => {
          state.increment = 10;
        },
        state => {
          state.invalid = true;
        },
        state => {
          state.sequence = true;
        }
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

      const { states, getCell } = setup<State>({
        stream: simpleStream,
        produce,
        app: { initial: { count: 0 }, services }
      });
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
        increment: (value: number) => void;
      }

      const Actions: ActionConstructor<Counter, CounterActions> = context => ({
        increment: value => {
          context.update(state => {
            state.count += value;
          });
        }
      });

      const effects: Effect<Counter, CounterActions>[] = [
        cell => {
          // effect on state is seen by the next effect
          if (cell.state.count === 1) {
            cell.actions.increment(1);
          }
        },
        cell => {
          if (cell.state.count === 2 && !cell.state.service) {
            cell.update(state => {
              state.service = true;
            });
          }
        }
      ];

      const app: App<Counter, CounterActions> = {
        initial: { count: 0, service: false },
        effects,
        Actions
      };

      const { states, getCell } = setup<Counter, CounterActions>({
        stream: simpleStream,
        produce,
        app
      });
      const cell = getCell();
      expect(typeof cell.actions.increment).toEqual("function");

      cell.update(state => {
        state.count = 1;
      });
      expect(states()).toEqual({ count: 2, service: true });

      // FIXME: add rest of test
    });
  });
});
