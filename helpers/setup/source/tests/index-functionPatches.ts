import { meiosisSetup } from '../src';
import {
  MeiosisCell,
  MeiosisComponent,
  MeiosisViewComponent,
  Patch,
  Service
} from '../src/types';
import { add, assoc, dissoc, lensProp, over } from 'ramda';

describe('Meiosis with TypeScript - Function Patches', () => {
  test('with no parameters', () => {
    interface State {
      ducks: number;
      sound: string;
    }

    const cells = meiosisSetup<State>();
    const cell = cells();

    expect(cell.state).toEqual({});

    cell.update(assoc('sound', 'quack'));
    expect(cells().state).toEqual({ sound: 'quack' });
  });

  test('with no actions', () => {
    interface State {
      ducks: number;
      sound: string;
    }

    const app = { initial: { ducks: 1, sound: 'silent' } };
    const cells = meiosisSetup<State>({ app });
    const cell = cells();

    expect(cell.state).toEqual({ ducks: 1, sound: 'silent' });

    cell.update(assoc('sound', 'quack'));
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

    const cells = meiosisSetup<State>();
    const cell = cells();

    expect(cell.state).toEqual({});

    cell.update(assoc('sound', 'quack'));
    expect(cells().state).toEqual({ sound: 'quack' });

    const duckCell = cell.nest('duck');
    expect(duckCell.state).toBeUndefined();

    duckCell.update(assoc('color', 'yellow'));
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
        cell.update(over(lensProp('ducks'), add(amount)));
      }
    };

    const app: MeiosisComponent<State> = {
      initial: { ducks: 1, sound: 'quack' }
    };

    const cells = meiosisSetup<State>({ app });
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
        cell.update(assoc('color', color));
      }
    };

    const app = {
      initial: { duck: { color: 'white' }, sound: 'quack' }
    };

    const cells = meiosisSetup<State>({ app });
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
      over(lensProp('count'), add(1)),
      dissoc('increment'),
      [dissoc('invalid'), assoc('combined', true)],
      [assoc('sequence', false), assoc('sequenced', true)],
      assoc('received', true)
    ];

    const updatePatches: Patch<State>[] = [
      assoc('increment', 1),
      assoc('increment', 10),
      assoc('invalid', true),
      assoc('sequence', true)
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

    const cells = meiosisSetup<State>({ app: { initial: { count: 0 }, services } });
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
        cell.update(over(lensProp('count'), add(value)));
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
            cell.update(assoc('service', true));
          }
        }
      }
    ];

    const app: MeiosisComponent<Counter> = {
      initial: { count: 0, service: false },
      services
    };

    const cells = meiosisSetup<Counter>({ app });
    const cell = cells();

    cell.update(assoc('count', 1));
    expect(cells().state).toEqual({ count: 2, service: true });

    cell.update([assoc('count', 3), assoc('service', false)]);
    expect(cells().state).toEqual({ count: 3, service: false });
  });

  test('getState async', (done) => {
    interface AppState {
      active: boolean;
      loading: boolean;
    }

    const dataActions = {
      loadData: (cell: MeiosisCell<AppState>) => {
        setTimeout(
          () => {
            done();
            if (cell.getState().active) {
              // Fail
              expect('active: T').toEqual('active: F');
            }
          },
          100
        );
      }
    };

    const cells = meiosisSetup<AppState>({ app: { initial: { active: false, loading: false } } });

    cells().update([assoc('active', true), assoc('loading', true)]);

    dataActions.loadData(cells());

    cells().update([assoc('active', false), assoc('loading', false)]);
  });

  test('getState nested', () => {
    interface Duck {
      color: string;
    }

    interface State {
      duck: Duck;
      sound: string;
    }

    const cells = meiosisSetup<State>();
    const cell = cells();

    cell.update(assoc('sound', 'quack'));
    const duckCell = cell.nest('duck');
    duckCell.update(assoc('color', 'yellow'));
    expect(cells().getState()).toEqual({ sound: 'quack', duck: { color: 'yellow' } });
  });

  describe('Nested Components', () => {
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

      const homeComponent: MeiosisComponent<Home> = {
        initial: {
          size: 37
        }
      };

      const duckComponent: MeiosisComponent<Duck> = {
        initial: {
          color: 'yellow',
          texture: 'soft',
          env: {
            material: 'straw'
          }
        },
        nested: {
          house: homeComponent
        }
      };

      const app: MeiosisComponent<AppState> = {
        initial: {
          sound: 'quack'
        },
        nested: {
          pet: duckComponent
        }
      };

      const cells = meiosisSetup<AppState>({ app });
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

      const homeComponent: MeiosisComponent<Home> = {
        initial: {
          size: 37
        },
        services: [
          {
            onchange: (state) => state.size,
            run: (cell) => {
              if (cell.state.size === 38) {
                cell.update(assoc('size', 42));
              }
            }
          }
        ]
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
        cell.update(assoc('fullName', getFullName(cell.state)));

      const duckComponent: MeiosisComponent<Duck> = {
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
          house: homeComponent
        }
      };

      interface AppState {
        pet: Duck;
        sound: string;
        volume: string;
      }

      const app: MeiosisComponent<AppState> = {
        initial: {
          sound: 'quack'
        },
        services: [
          {
            onchange: (state) => state.sound,
            run: (cell) => {
              if (cell.state.sound === 'quack') {
                cell.update(assoc('volume', 'loud'));
              } else {
                cell.update(assoc('volume', 'quiet'));
              }
            }
          }
        ],
        nested: {
          pet: duckComponent
        }
      };

      const cells = meiosisSetup<AppState>({ app });

      expect(cells().state.volume).toEqual('loud');
      cells().update(assoc('sound', 'beck'));
      expect(cells().state.volume).toEqual('quiet');

      expect(cells().state.pet.fullName).toEqual('Fluffy McDuck');
      cells().nest('pet').update(assoc('lastName', 'Quackington'));
      expect(cells().state.pet.fullName).toEqual('Fluffy Quackington');
      cells().nest('pet').update(assoc('firstName', 'Softy'));
      expect(cells().state.pet.fullName).toEqual('Softy Quackington');

      cells().nest('pet').nest('house').update(assoc('size', 38));
      expect(cells().state.pet.house.size).toEqual(42);
    });

    test('views', (done) => {
      interface Home {
        size: number;
      }

      const homeApp: MeiosisViewComponent<Home> = {
        initial: {
          size: 37
        },
        view: (cell, value: number) => {
          expect(cell.state.size).toEqual(37);
          expect(value).toEqual(42);
          done();
        }
      };

      interface Duck {
        color: string;
        house: Home;
      }

      const duckApp: MeiosisViewComponent<Duck> = {
        initial: {
          color: 'yellow'
        },
        nested: {
          house: homeApp
        },
        view: (cell) => {
          cell.nested.house.view(cell, 42);
        }
      };

      interface AppState {
        pet: Duck;
        sound: string;
        volume: string;
      }

      const app: MeiosisComponent<AppState> = {
        initial: {
          sound: 'quack'
        },
        nested: {
          pet: duckApp
        }
      };

      const cells = meiosisSetup<AppState>({ app });
      const cell = cells();
      cell.nested.pet.view(cell);
    });
  });
});
