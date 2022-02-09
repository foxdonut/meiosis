import simpleStream from "../src/simple-stream";
import {
  ActionConstructor,
  App,
  CellActionConstructor,
  CellApp,
  CellEffect,
  Effect,
  MeiosisCell,
  Patch,
  Service,
  nest,
  setup,
  setupCell
} from "../src/functionPatches";
import { add, assoc, dissoc, lensProp, over } from "ramda";

describe("Meiosis with TypeScript - Function Patches", () => {
  describe("Meiosis", () => {
    test("effects", () => {
      interface Counter {
        count: number;
        service: boolean;
      }

      interface CounterActions {
        increment: (value: number) => void;
      }

      const Actions: ActionConstructor<Counter, CounterActions> = update => ({
        increment: value => {
          update(over(lensProp("count"), add(value)));
        }
      });

      const effects: Effect<Counter, CounterActions>[] = [
        (state, _update, actions) => {
          // effect on state affects state seen by the next effect
          if (state.count === 1) {
            actions.increment(1);
          }
        },
        (state, update) => {
          if (state.count === 2 && !state.service) {
            update(assoc("service", true));
          }
        }
      ];

      const app: App<Counter, CounterActions> = {
        initial: { count: 0, service: false },
        effects,
        Actions
      };

      const { states, update, actions } = setup<Counter, CounterActions>({
        stream: simpleStream,
        app
      });
      expect(typeof actions.increment).toEqual("function");

      update(assoc("count", 1));
      expect(states()).toEqual({ count: 2, service: true });

      update([assoc("count", 3), assoc("service", false)]);
      expect(states()).toEqual({ count: 3, service: false });
    });
  });

  describe("Meiosis Cell", () => {
    test("with no actions", () => {
      interface State {
        ducks: number;
        sound: string;
      }

      const app = { initial: { ducks: 1, sound: "silent" } };
      const rootCell = setupCell<State, never>({ stream: simpleStream, app });

      expect(rootCell.actions).toBeUndefined();
      expect(rootCell.getState()).toEqual({ ducks: 1, sound: "silent" });

      rootCell.update(assoc("sound", "quack"));
      expect(rootCell.getState()).toEqual({ ducks: 1, sound: "quack" });
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
      const rootCell = setupCell<State, never>({ stream: simpleStream, app });

      expect(rootCell.actions).toBeUndefined();
      expect(rootCell.getState()).toEqual({});

      rootCell.update(assoc("sound", "quack"));
      expect(rootCell.getState()).toEqual({ sound: "quack" });

      const duckCell = nest(rootCell, "duck");
      expect(duckCell.getState()).toBeUndefined();

      duckCell.update(assoc("color", "yellow"));
      expect(duckCell.getState()).toEqual({ color: "yellow" });
      expect(rootCell.getState()).toEqual({ sound: "quack", duck: { color: "yellow" } });
    });

    test("with actions", () => {
      interface State {
        ducks: number;
        sound: string;
      }

      interface Actions {
        addDucks: (amount: number) => void;
      }

      const app: CellApp<State, Actions> = {
        initial: { ducks: 1, sound: "quack" },
        Actions: rootCell => ({
          addDucks: (amount: number) => {
            rootCell.update(over(lensProp("ducks"), add(amount)));
          }
        })
      };

      const rootCell = setupCell<State, Actions>({ stream: simpleStream, app });

      expect(rootCell.actions).toBeDefined();
      expect(rootCell.getState()).toEqual({ ducks: 1, sound: "quack" });

      rootCell.actions.addDucks(4);
      expect(rootCell.getState()).toEqual({ ducks: 5, sound: "quack" });
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
          cell.update(assoc("color", color));
        }
      };

      const app = {
        initial: { duck: { color: "white" }, sound: "quack" }
      };

      const rootCell = setupCell<State, never>({ stream: simpleStream, app });

      expect(rootCell.actions).toBeUndefined();

      const duckCell = nest(rootCell, "duck");
      duckActions.changeDuckColor(duckCell, "yellow");
      expect(rootCell.getState()).toEqual({ duck: { color: "yellow" }, sound: "quack" });
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
        over(lensProp("count"), add(1)),
        dissoc("increment"),
        [dissoc("invalid"), assoc("combined", true)],
        assoc("sequenced", true),
        assoc("received", true)
      ];

      const updatePatches: Patch<State>[] = [
        assoc("increment", 1),
        assoc("increment", 10),
        assoc("invalid", true),
        assoc("sequence", true)
      ];

      const services: Service<State>[] = [
        state => (state.increment > 0 && state.increment < 10 ? servicePatches[0] : null),
        state => (state.increment <= 0 || state.increment >= 10 ? servicePatches[1] : null),
        state => (state.invalid ? servicePatches[2] : null),
        state => (state.sequence ? servicePatches[3] : null),
        state => (state.sequenced ? servicePatches[4] : null)
      ];

      const cell = setupCell<State>({
        stream: simpleStream,
        app: { initial: { count: 0 }, services }
      });

      cell.update(updatePatches[0]);
      cell.update(updatePatches[1]);
      cell.update(updatePatches[2]);
      cell.update(updatePatches[3]);

      expect(cell.getState()).toEqual({
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

      const Actions: CellActionConstructor<Counter, CounterActions> = cell => ({
        increment: value => {
          cell.update(over(lensProp("count"), add(value)));
        }
      });

      const effects: CellEffect<Counter, CounterActions>[] = [
        cell => {
          // effect on state affects state seen by the next effect
          if (cell.getState().count === 1) {
            cell.actions.increment(1);
          }
        },
        cell => {
          if (cell.getState().count === 2 && !cell.getState().service) {
            cell.update(assoc("service", true));
          }
        }
      ];

      const app: CellApp<Counter, CounterActions> = {
        initial: { count: 0, service: false },
        effects,
        Actions
      };

      const cell = setupCell<Counter, CounterActions>({ stream: simpleStream, app });
      expect(typeof cell.actions.increment).toEqual("function");

      cell.update(assoc("count", 1));
      expect(cell.getState()).toEqual({ count: 2, service: true });
    });
  });
});
