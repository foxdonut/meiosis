import simpleStream from "../src/simple-stream";
import {
  ActionConstructor,
  App,
  Effect,
  MeiosisCell,
  Patch,
  Service,
  setup
} from "../src/mergerino";
import merge from "mergerino";

describe("Meiosis with TypeScript - Mergerino", () => {
  describe("Meiosis", () => {
    test("with no actions", () => {
      interface State {
        ducks: number;
        sound: string;
      }

      const app = { initial: { ducks: 1, sound: "silent" } };
      const { states, getCell } = setup<State>({ stream: simpleStream, merge, app });
      const cell = getCell();

      expect(cell.actions).toBeUndefined();
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
      const { states, getCell } = setup<State>({ stream: simpleStream, merge, app });
      const cell = getCell();

      expect(cell.actions).toBeUndefined();
      expect(cell.state).toEqual({});

      cell.update({ sound: "quack" });
      expect(states()).toEqual({ sound: "quack" });

      const duckCell = cell.nest("duck");
      expect(duckCell.state).toBeUndefined();
      // FIXME: this should show an error
      duckCell.update({ QUACK: "DUCK" });

      duckCell.update({ color: "yellow" });
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
        Actions: rootCell => ({
          addDucks: (amount: number) => {
            rootCell.update({ ducks: value => value + amount });
          }
        })
      };

      const { states, getCell } = setup<State, Actions>({ stream: simpleStream, merge, app });
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
          cell.update({ color });
        }
      };

      const app = {
        initial: { duck: { color: "white" }, sound: "quack" }
      };

      const { states, getCell } = setup<State>({ stream: simpleStream, merge, app });
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

      const servicePatches = [
        { count: x => x + 1 },
        { increment: undefined },
        [{ invalid: undefined }, { combined: true }],
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

      const { states, getCell } = setup<State>({
        stream: simpleStream,
        merge,
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

      const Actions: ActionConstructor<Counter, CounterActions> = cell => ({
        increment: value => {
          cell.update({ count: count => count + value });
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
            cell.update({ service: true });
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
        merge,
        app
      });
      const cell = getCell();
      expect(typeof cell.actions.increment).toEqual("function");

      cell.update({ count: 1 });
      expect(states()).toEqual({ count: 2, service: true });
    });
  });
});
