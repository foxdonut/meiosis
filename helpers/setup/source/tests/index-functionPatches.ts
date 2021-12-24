import simpleStream from "../src/simple-stream";
import { CellActionConstructor, CellApp, nest, setupCell } from "../src/functionPatches";
import { add, assoc, lensProp, over } from "ramda";

describe("Meiosis with TypeScript", () => {
  describe("Meiosis Cell", () => {
    describe("Function Patches", () => {
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
          changeDuckColor: (color: string) => void;
        }

        const DuckActionsConstructor: CellActionConstructor<Duck, DuckActions> = cell => ({
          changeDuckColor: color => {
            cell.update(assoc("color", color));
          }
        });

        const app = {
          initial: { duck: { color: "white" }, sound: "quack" }
        };

        const rootCell = setupCell<State, never>({ stream: simpleStream, app });

        expect(rootCell.actions).toBeUndefined();

        const duckCell = nest(rootCell, "duck", DuckActionsConstructor);
        duckCell.actions.changeDuckColor("yellow");
        expect(rootCell.getState()).toEqual({ duck: { color: "yellow" }, sound: "quack" });
      });
    });
  });
});
