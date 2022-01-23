import simpleStream from "../src/simple-stream";
import {
  CellActionConstructor,
  CellApp,
  CellEffect,
  MeiosisCell,
  nest,
  setupCell
} from "../src/mergerino";
import merge from "mergerino";

describe("Meiosis with TypeScript", () => {
  describe("Meiosis Cell", () => {
    describe("Mergerino", () => {
      test("with no actions", () => {
        interface State {
          ducks: number;
          sound: string;
        }

        const app = { initial: { ducks: 1, sound: "silent" } };
        const rootCell = setupCell<State, never>({ stream: simpleStream, merge, app });

        expect(rootCell.actions).toBeUndefined();
        expect(rootCell.getState()).toEqual({ ducks: 1, sound: "silent" });

        rootCell.update({ sound: "quack" });
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
        const rootCell = setupCell<State, never>({ stream: simpleStream, merge, app });

        expect(rootCell.actions).toBeUndefined();
        expect(rootCell.getState()).toEqual({});

        rootCell.update({ sound: "quack" });
        expect(rootCell.getState()).toEqual({ sound: "quack" });

        const duckCell = nest(rootCell, "duck");
        expect(duckCell.getState()).toBeUndefined();

        duckCell.update({ color: "yellow" });
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
              rootCell.update({ ducks: value => value + amount });
            }
          })
        };

        const rootCell = setupCell<State, Actions>({ stream: simpleStream, merge, app });

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
            cell.update({ color });
          }
        };

        const app = {
          initial: { duck: { color: "white" }, sound: "quack" }
        };

        const rootCell = setupCell<State, never>({ stream: simpleStream, merge, app });

        expect(rootCell.actions).toBeUndefined();

        const duckCell = nest(rootCell, "duck");
        duckActions.changeDuckColor(duckCell, "yellow");
        expect(rootCell.getState()).toEqual({ duck: { color: "yellow" }, sound: "quack" });
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
            cell.update({ count: count => count + value });
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
              cell.update({ service: true });
            }
          }
        ];

        const app: CellApp<Counter, CounterActions> = {
          initial: { count: 0, service: false },
          effects,
          Actions
        };

        const cell = setupCell<Counter, CounterActions>({ stream: simpleStream, merge, app });
        expect(typeof cell.actions.increment).toEqual("function");

        cell.update({ count: 1 });
        expect(cell.getState()).toEqual({ count: 2, service: true });
      });
    });
  });
});
