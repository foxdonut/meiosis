import simpleStream from "../src/simple-stream";
import { meiosisCell, nest } from "../src/mergerino";
import merge from "mergerino";

describe("Meiosis with TypeScript", () => {
  describe("Meiosis Cell", () => {
    describe("Mergerino", () => {
      test("basic with nesting and no actions", () => {
        interface Duck {
          color: string;
        }

        interface State {
          duck: Duck;
          sound: string;
        }
        const app = {};
        const rootCell = meiosisCell<State, never>({ stream: simpleStream, merge, app });

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
    });
  });
});
