import simpleStream from "../src/simple-stream";
import { CellApp, MeiosisCell, produceNest, setupCell } from "../src/immer";
import produce from "immer";

describe("Meiosis with TypeScript", () => {
  describe("Meiosis Cell", () => {
    describe("Immer", () => {
      test("with no actions", () => {
        interface State {
          ducks: number;
          sound: string;
        }

        const app = { initial: { ducks: 1, sound: "silent" } };
        const rootCell = setupCell<State, never>({ stream: simpleStream, produce, app });

        expect(rootCell.actions).toBeUndefined();
        expect(rootCell.getState()).toEqual({ ducks: 1, sound: "silent" });

        rootCell.update(state => {
          state.sound = "quack";
        });
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

        const initial = { duck: { color: "" }, sound: "" };
        const app = { initial };
        const rootCell = setupCell<State, never>({ stream: simpleStream, produce, app });

        expect(rootCell.actions).toBeUndefined();
        expect(rootCell.getState()).toEqual(initial);

        rootCell.update(state => {
          state.sound = "quack";
        });
        expect(rootCell.getState()).toEqual({ duck: { color: "" }, sound: "quack" });

        const nest = produceNest(produce);
        const duckCell = nest(rootCell, "duck");
        expect(duckCell.getState()).not.toBeUndefined();

        duckCell.update(state => {
          state.color = "yellow";
        });
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
              rootCell.update(state => {
                state.ducks += amount;
              });
            }
          })
        };

        const rootCell = setupCell<State, Actions>({ stream: simpleStream, produce, app });

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
            cell.update(state => {
              state.color = color;
            });
          }
        };

        const app = {
          initial: { duck: { color: "white" }, sound: "quack" }
        };

        const rootCell = setupCell<State, never>({ stream: simpleStream, produce, app });

        expect(rootCell.actions).toBeUndefined();

        const nest = produceNest(produce);
        const duckCell = nest(rootCell, "duck");
        duckActions.changeDuckColor(duckCell, "yellow");
        expect(rootCell.getState()).toEqual({ duck: { color: "yellow" }, sound: "quack" });
      });
    });
  });
});
