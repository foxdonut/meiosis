import simpleStream from "../src/simple-stream";
import { MergerinoApp, MergerinoCellActionConstructor, cell, nest } from "../src/mergerino";
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
        const rootCell = cell<State, never>({ stream: simpleStream, merge, app });

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
        const rootCell = cell<State, never>({ stream: simpleStream, merge, app });

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

        const app: MergerinoApp<State, Actions> = {
          initial: { ducks: 1, sound: "quack" },
          Actions: rootCell => ({
            addDucks: (amount: number) => {
              rootCell.update({ ducks: value => value + amount });
            }
          })
        };

        const rootCell = cell<State, Actions>({ stream: simpleStream, merge, app });

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
          changeDuckColor: (color: string) => void;
        }

        const DuckActionsConstructor: MergerinoCellActionConstructor<Duck, DuckActions> = cell => ({
          changeDuckColor: color => {
            cell.update({ color });
          }
        });

        const app = {
          initial: { duck: { color: "white" }, sound: "quack" }
        };

        const rootCell = cell<State, never>({ stream: simpleStream, merge, app });

        expect(rootCell.actions).toBeUndefined();

        const duckCell = nest(rootCell, "duck", DuckActionsConstructor);
        duckCell.actions.changeDuckColor("yellow");
        expect(rootCell.getState()).toEqual({ duck: { color: "yellow" }, sound: "quack" });
      });
    });
  });
});