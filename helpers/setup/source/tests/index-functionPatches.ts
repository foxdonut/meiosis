import { App, MeiosisCell, Patch, Service, combinePatches, setup } from "../src/functionPatches";
import { add, assoc, dissoc, lensProp, over } from "ramda";

describe("Meiosis with TypeScript - Function Patches", () => {
  test("with no actions", () => {
    interface State {
      ducks: number;
      sound: string;
    }

    const app = { initial: { ducks: 1, sound: "silent" } };
    const cells = setup<State>({ app });
    const cell = cells();

    expect(cell.state).toEqual({ ducks: 1, sound: "silent" });

    cell.update(assoc("sound", "quack"));
    expect(cells().state).toEqual({ ducks: 1, sound: "quack" });
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
    const cells = setup<State>({ app });
    const cell = cells();

    expect(cell.state).toEqual({});

    cell.update(assoc("sound", "quack"));
    expect(cells().state).toEqual({ sound: "quack" });

    const duckCell = cell.nest("duck");
    expect(duckCell.state).toBeUndefined();

    duckCell.update(assoc("color", "yellow"));
    expect(cells().state).toEqual({ sound: "quack", duck: { color: "yellow" } });
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
        cell.update(over(lensProp("ducks"), add(amount)));
      }
    };

    const app: App<State> = {
      initial: { ducks: 1, sound: "quack" }
    };

    const cells = setup<State>({ app });
    const cell = cells();

    expect(cell.state).toEqual({ ducks: 1, sound: "quack" });

    actions.addDucks(cell, 4);
    expect(cells().state).toEqual({ ducks: 5, sound: "quack" });
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

    const cells = setup<State>({ app });
    const cell = cells();

    const duckCell = cell.nest("duck");
    duckActions.changeDuckColor(duckCell, "yellow");
    expect(cells().state).toEqual({ duck: { color: "yellow" }, sound: "quack" });
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
      combinePatches<State>([dissoc("invalid"), assoc("combined", true)]),
      combinePatches<State>([assoc("sequence", false), assoc("sequenced", true)]),
      assoc("received", true)
    ];

    const updatePatches: Patch<State>[] = [
      assoc("increment", 1),
      assoc("increment", 10),
      assoc("invalid", true),
      assoc("sequence", true)
    ];

    const services: Service<State>[] = [
      {
        onchange: state => state.increment,
        run: cell => {
          if (cell.state.increment && cell.state.increment > 0 && cell.state.increment < 10) {
            cell.update(servicePatches[0]);
          }
        }
      },
      {
        onchange: state => state.increment,
        run: cell => {
          if (cell.state.increment && (cell.state.increment <= 0 || cell.state.increment >= 10)) {
            cell.update(servicePatches[1]);
          }
        }
      },
      {
        run: cell => {
          if (cell.state.invalid) {
            cell.update(servicePatches[2]);
          }
        }
      },
      {
        run: cell => {
          if (cell.state.sequence) {
            cell.update(servicePatches[3]);
          }
        }
      },
      {
        onchange: state => state.sequenced,
        run: cell => {
          if (cell.state.sequenced) {
            cell.update(servicePatches[4]);
          }
        }
      }
    ];

    const cells = setup<State>({ app: { initial: { count: 0 }, services } });
    const cell = cells();

    cell.update(updatePatches[0]);
    cell.update(updatePatches[1]);
    cell.update(updatePatches[2]);
    cell.update(updatePatches[3]);

    expect(cells().state).toEqual({
      count: 1,
      combined: true,
      sequence: false,
      sequenced: true,
      received: true
    });
  });

  test("service actions", () => {
    interface Counter {
      count: number;
      service: boolean;
    }

    interface CounterActions {
      increment: (cell: MeiosisCell<Counter>, value: number) => void;
    }

    const counterActions: CounterActions = {
      increment: (cell, value) => {
        cell.update(over(lensProp("count"), add(value)));
      }
    };

    const services: Service<Counter>[] = [
      {
        run: cell => {
          if (cell.state.count === 1) {
            counterActions.increment(cell, 1);
          }
        }
      },
      {
        run: cell => {
          if (cell.state.count === 2 && !cell.state.service) {
            cell.update(assoc("service", true));
          }
        }
      }
    ];

    const app: App<Counter> = {
      initial: { count: 0, service: false },
      services
    };

    const cells = setup<Counter>({ app });
    const cell = cells();

    cell.update(assoc("count", 1));
    expect(cells().state).toEqual({ count: 2, service: true });

    cell.update(combinePatches([assoc("count", 3), assoc("service", false)]));
    expect(cells().state).toEqual({ count: 3, service: false });
  });
});
