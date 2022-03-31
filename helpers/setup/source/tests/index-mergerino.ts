import { App, MeiosisCell, Patch, Service, combinePatches, setup } from '../src/mergerino';

describe('Meiosis with TypeScript - Mergerino', () => {
  test('with no actions', () => {
    interface State {
      ducks: number;
      sound: string;
    }

    const app = { initial: { ducks: 1, sound: 'silent' } };
    const cells = setup<State>({ app });
    const cell = cells();

    expect(cell.state).toEqual({ ducks: 1, sound: 'silent' });

    cell.update({ sound: 'quack' });
    expect(cells().state).toEqual({ ducks: 1, sound: 'quack' });
  });

  test('with nesting and no actions', () => {
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

    cell.update({ sound: 'quack' });
    expect(cells().state).toEqual({ sound: 'quack' });

    const duckCell = cell.nest('duck');
    expect(duckCell.state).toBeUndefined();

    duckCell.update({ color: 'yellow' });
    expect(cells().state).toEqual({ sound: 'quack', duck: { color: 'yellow' } });
  });

  test('with actions', () => {
    interface State {
      ducks: number;
      sound: string;
    }

    interface Actions {
      addDucks: (cell: MeiosisCell<State>, amount: number) => void;
    }

    const actions: Actions = {
      addDucks: (cell, amount) => {
        cell.update({ ducks: (value) => value + amount });
      }
    };

    const app: App<State> = {
      initial: { ducks: 1, sound: 'quack' }
    };

    const cells = setup<State>({ app });
    const cell = cells();

    expect(cell.state).toEqual({ ducks: 1, sound: 'quack' });

    actions.addDucks(cell, 4);
    expect(cells().state).toEqual({ ducks: 5, sound: 'quack' });
  });

  test('with actions and nesting', () => {
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
      initial: { duck: { color: 'white' }, sound: 'quack' }
    };

    const cells = setup<State>({ app });
    const cell = cells();

    const duckCell = cell.nest('duck');
    duckActions.changeDuckColor(duckCell, 'yellow');
    expect(cells().state).toEqual({ duck: { color: 'yellow' }, sound: 'quack' });
  });

  test('services', () => {
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
      { count: (x) => x + 1 },
      { increment: undefined },
      combinePatches([{ invalid: undefined }, { combined: true }]),
      { sequence: false, sequenced: true },
      { received: true }
    ];

    const updatePatches: Patch<State>[] = [
      { increment: 1 },
      { increment: 10 },
      { invalid: true },
      { sequence: true }
    ];

    const services: Service<State>[] = [
      {
        onchange: (state) => state.increment,
        run: (cell) => {
          if (cell.state.increment && cell.state.increment > 0 && cell.state.increment < 10) {
            cell.update(servicePatches[0]);
          }
        }
      },
      {
        onchange: (state) => state.increment,
        run: (cell) => {
          if (cell.state.increment && (cell.state.increment <= 0 || cell.state.increment >= 10)) {
            cell.update(servicePatches[1]);
          }
        }
      },
      {
        run: (cell) => {
          if (cell.state.invalid) {
            cell.update(servicePatches[2]);
          }
        }
      },
      {
        run: (cell) => {
          if (cell.state.sequence) {
            cell.update(servicePatches[3]);
          }
        }
      },
      {
        onchange: (state) => state.sequenced,
        run: (cell) => {
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

  test('service actions', () => {
    interface Counter {
      count: number;
      service: boolean;
    }

    interface CounterActions {
      increment: (cell: MeiosisCell<Counter>, value: number) => void;
    }

    const counterActions: CounterActions = {
      increment: (cell, value) => {
        cell.update({ count: (count) => count + value });
      }
    };

    const services: Service<Counter>[] = [
      {
        run: (cell) => {
          if (cell.state.count === 1) {
            counterActions.increment(cell, 1);
          }
        }
      },
      {
        run: (cell) => {
          if (cell.state.count === 2 && !cell.state.service) {
            cell.update({ service: true });
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

    cell.update({ count: 1 });
    expect(cells().state).toEqual({ count: 2, service: true });

    // FIXME: add rest of test
  });

  describe('Nested Apps', () => {
    test('initial state', () => {
      interface Home {
        size: number;
      }

      interface Environment {
        material: string;
      }

      interface Duck {
        color: string;
        texture: string;
        house: Home;
        env: Environment;
      }

      interface AppState {
        pet: Duck;
        sound: string;
      }

      const homeApp: App<Home> = {
        initial: {
          size: 37
        }
      };

      const duckApp: App<Duck> = {
        initial: {
          color: 'yellow',
          texture: 'soft',
          env: {
            material: 'straw'
          }
        },
        nested: {
          house: homeApp
        }
      };

      const app: App<AppState> = {
        initial: {
          sound: 'quack'
        },
        nested: {
          pet: duckApp
        }
      };

      const cells = setup<AppState>({ app });
      const initialState = cells().state;

      expect(initialState).toEqual({
        sound: 'quack',
        pet: {
          color: 'yellow',
          texture: 'soft',
          env: {
            material: 'straw'
          },
          house: {
            size: 37
          }
        }
      });
    });

    test('services', () => {
      interface Home {
        size: number;
      }

      const homeApp: App<Home> = {
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
        house: Home;
        env: Environment;
      }

      const getFullName = (duck: Duck): string => `${duck.firstName} ${duck.lastName}`;
      const updateFullName = (cell: MeiosisCell<Duck>) =>
        cell.update({ fullName: getFullName(cell.state) });

      const duckApp: App<Duck> = {
        initial: {
          color: 'yellow',
          texture: 'soft',
          firstName: 'Fluffy',
          lastName: 'McDuck',
          env: {
            material: 'straw'
          }
        },
        services: [
          {
            onchange: (state) => state.firstName,
            run: updateFullName
          },
          {
            onchange: (state) => state.lastName,
            run: updateFullName
          }
        ],
        nested: {
          house: homeApp
        }
      };

      interface AppState {
        pet: Duck;
        sound: string;
        volume: string;
      }

      const app: App<AppState> = {
        initial: {
          sound: 'quack'
        },
        services: [
          {
            onchange: (state) => state.sound,
            run: (cell) => {
              if (cell.state.sound === 'quack') {
                cell.update({ volume: 'loud' });
              } else {
                cell.update({ volume: 'quiet' });
              }
            }
          }
        ],
        nested: {
          pet: duckApp
        }
      };

      const cells = setup<AppState>({ app });

      expect(cells().state.volume).toEqual('loud');
      cells().update({ sound: 'beck' });
      expect(cells().state.volume).toEqual('quiet');

      expect(cells().state.pet.fullName).toEqual('Fluffy McDuck');
      cells().nest('pet').update({ lastName: 'Quackington' });
      expect(cells().state.pet.fullName).toEqual('Fluffy Quackington');
      cells().nest('pet').update({ firstName: 'Softy' });
      expect(cells().state.pet.fullName).toEqual('Softy Quackington');
    });

    test('views', () => {
      interface Home {
        size: number;
      }

      const homeApp: App<Home> = {
        initial: {
          size: 37
        },
        view: (cell) => {
          expect(cell.state.size).toEqual(37);
        }
      };

      interface Duck {
        color: string;
        house: Home;
      }

      const duckApp: App<Duck> = {
        initial: {
          color: 'yellow'
        },
        nested: {
          house: homeApp
        },
        view: (cell) => {
          cell.nested.house.view(cell);
        }
      };

      interface AppState {
        pet: Duck;
        sound: string;
        volume: string;
      }

      const app: App<AppState> = {
        initial: {
          sound: 'quack'
        },
        nested: {
          pet: duckApp
        }
      };

      const cells = setup<AppState>({ app });
      const cell = cells();
      cell.nested.pet.view(cell);
    });
  });
});
