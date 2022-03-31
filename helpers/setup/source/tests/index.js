/* eslint-env jest */

import flyd from 'flyd';
import Stream from 'mithril/stream';
import merge from 'mergerino';
import R from 'ramda';

import meiosis from '../src/index';

const streamCases = [
  ['Meiosis simple-stream', meiosis.simpleStream],
  ['flyd', flyd],
  ['mithril-stream', Stream]
];

describe('meiosis setup with library for applying patches', () => {
  describe.each(streamCases)('%s', (_label, streamLib) => {
    const applyPatchCases = [
      ['mergerino', (app) => meiosis.mergerino.setup({ stream: streamLib, merge, app })],
      ['functionPatches', (app) => meiosis.functionPatches.setup({ stream: streamLib, app })]
    ];

    const createTestCases = (label, arr = [[], [], []]) => {
      const result = [];
      const total = Math.min(arr.length, applyPatchCases.length);
      for (let i = 0; i < total; i++) {
        result.push([applyPatchCases[i][0] + ' / ' + label, applyPatchCases[i][1], ...arr[i]]);
      }
      return result;
    };

    test.each(
      createTestCases('minimal', [
        [{ duck: { sound: 'quack' } }, { duck: { color: 'yellow' } }],
        [() => ({ duck: { sound: 'quack' } }), R.assocPath(['duck', 'color'], 'yellow')]
      ])
    )('%s', (_label, setupFn, patch1, patch2) => {
      const cells = setupFn();
      const cell = cells();
      expect(cell.state).toEqual({});

      cell.update(patch1);
      cell.update(patch2);

      expect(cells().state).toEqual({ duck: { sound: 'quack', color: 'yellow' } });
    });

    test.each(createTestCases('initial state'))('%s', (_label, setupFn) => {
      const cells = setupFn({ initial: { duck: 'yellow' } });

      expect(cells().state).toEqual({ duck: 'yellow' }, 'initial state');
    });

    test.each(createTestCases('initial state promise'))('%s', (_label, setupFn) => {
      const Initial = () =>
        new Promise((resolve) => {
          setTimeout(() => resolve({ duck: 'yellow' }), 10);
        });

      const createApp = () => Initial().then((initial) => ({ initial }));

      return createApp().then((app) => {
        const cells = setupFn(app);

        expect(cells().state).toEqual({ duck: 'yellow' }, 'initial state');
      });
    });

    test.each(
      createTestCases('services run on initial state', [
        [{ count: (x) => x + 1, increment: 0 }],
        [
          meiosis.functionPatches.combinePatches([
            R.over(R.lensProp('count'), R.add(1)),
            R.assoc('increment', 0)
          ])
        ]
      ])
    )('%s', (_label, setupFn, patch) => {
      const services = [
        {
          run: (cell) =>
            cell.state.increment > 0 && cell.state.increment < 10 ? cell.update(patch) : null
        }
      ];

      const cells = setupFn({ initial: { count: 0, increment: 1 }, services });

      let ticks = 0;
      cells.map(() => ticks++);

      expect(cells().state).toEqual({ count: 1, increment: 0 });
      expect(ticks).toEqual(1);
    });

    test.each(
      createTestCases('services and actions', [
        [{ count: (x) => x + 1 }, { service: true }, { count: 1 }],
        [R.over(R.lensProp('count'), R.add(1)), R.assoc('service', true), R.assoc('count', 1)]
      ])
    )('%s', (_label, setupFn, actionPatch, servicePatch, updatePatch) => {
      const actions = {
        increment: (cell) => cell.update(actionPatch)
      };

      const services = [
        {
          run: (cell) => {
            if (cell.state.count === 1) {
              actions.increment(cell);
            }
          }
        },
        {
          run: ({ state, update }) => {
            if (state.count === 2 && !state.service) {
              update(servicePatch);
            }
          }
        }
      ];

      const cells = setupFn({ initial: { count: 0 }, services });
      const cell = cells();

      cell.update(updatePatch);

      expect(cells().state).toEqual({ count: 2, service: true });
    });

    test.each(
      createTestCases('actions can use combine', [
        [meiosis.mergerino.combinePatches([{ count: (x) => x + 1 }, { combined: true }])],
        [
          meiosis.functionPatches.combinePatches([
            R.over(R.lensProp('count'), R.add(1)),
            R.assoc('combined', true)
          ])
        ]
      ])
    )('%s', (_label, setupFn, actionPatch) => {
      const actions = {
        increment: (cell) => cell.update(actionPatch)
      };

      const cells = setupFn({ initial: { count: 0 } });
      const cell = cells();

      actions.increment(cell);

      expect(cells().state).toEqual({ count: 1, combined: true });
    });

    test.each(
      createTestCases('an action can call another action', [
        [{ count: (x) => x + 1 }, { interaction: true }],
        [R.over(R.lensProp('count'), R.add(1)), R.assoc('interaction', true)]
      ])
    )('%s', (_label, setupFn, action1, action2) => {
      const actions = {
        increment: (cell) => cell.update(action1),

        interact: function (cell) {
          cell.update(action2);
          this.increment(cell);
        }
      };

      const cells = setupFn({ initial: { count: 0 } });
      const cell = cells();

      actions.interact(cell);

      expect(cells().state).toEqual({ count: 1, interaction: true });
    });

    test.each(
      createTestCases('service calls', [
        [
          meiosis.mergerino.combinePatches([{ count: (x) => x + 1 }, { service1: true }]),
          { service2: true },
          { count: 1 }
        ],
        [
          meiosis.functionPatches.combinePatches([
            R.over(R.lensProp('count'), R.add(1)),
            R.assoc('service1', true)
          ]),
          R.assoc('service2', true),
          R.assoc('count', 1)
        ]
      ])
    )('%s', (_label, setupFn, service1, service2, updatePatch) => {
      const services = [
        {
          run: (cell) => {
            if (cell.state.count === 1) {
              cell.update(service1);
            }
          }
        },
        // Services see previous changes
        {
          onchange: (state) => state.count,
          run: (cell) => {
            if (cell.state.count === 2) {
              cell.update(service2);
            }
          }
        }
      ];

      const cells = setupFn({ services });
      const cell = cells();

      cell.update(updatePatch);
      expect(cells().state).toEqual({ count: 2, service1: true, service2: true });
    });

    test.each(
      createTestCases('synchronous service updates', [
        [{ count: (x) => x + 1 }, { service1: true }, { service2: true }, { count: 1 }],
        [
          R.over(R.lensProp('count'), R.add(1)),
          R.assoc('service1', true),
          R.assoc('service2', true),
          R.assoc('count', 1)
        ]
      ])
    )('%s', (_label, setupFn, incr, service1, service2, init) => {
      const services = [
        {
          run: ({ state, update }) => {
            if (state.count === 1) {
              update(incr);
              update(service1);
            }
          }
        },
        {
          run: ({ state, update }) => {
            if (state.count > 1 && !state.service2) {
              update(service2);
            }
          }
        }
      ];

      const cells = setupFn({ services });
      const cell = cells();

      cell.update(init);

      expect(cells().state).toEqual({ count: 2, service1: true, service2: true });
    });

    test.each(
      createTestCases('services may be called in an infinite loop', [
        [{ service: true }, { count: 1 }],
        [R.assoc('service', true), R.assoc('count', 1)]
      ])
    )('%s', (_label, setupFn, service, init) => {
      let serviceCalls = 0;

      const services = [
        {
          run: ({ state, update }) => {
            if (state.count === 1 && serviceCalls < 5) {
              serviceCalls++;
              update(service);
            }
          }
        }
      ];

      const cells = setupFn({ services });
      const cell = cells();

      cell.update(init);

      expect(serviceCalls).toEqual(5);
      expect(cells().state).toEqual({ count: 1, service: true });
    });

    test.each(
      createTestCases('service running on initial state is seen in the states stream', [
        [{ service: true }],
        [R.assoc('service', true)]
      ])
    )('%s', (_label, setupFn, service) => {
      const services = [
        {
          run: ({ state, update }) => {
            if (!state.service) {
              update(service);
            }
          }
        }
      ];

      const cells = setupFn({ services });

      expect(cells().state).toEqual({ service: true });
    });

    test.each(
      createTestCases('a service can alter a state change', [
        [{ one: true }, { one: undefined, two: true }],
        [R.assoc('one', true), R.compose(R.dissoc('one'), R.assoc('two', true))]
      ])
    )('%s', (_label, setupFn, updatePatch, servicePatch) => {
      const services = [
        {
          run: (cell) => {
            if (cell.state.one) {
              cell.update(servicePatch);
            }
          }
        }
      ];

      const cells = setupFn({ services });
      const cell = cells();

      cell.update(updatePatch);

      expect(cells().state).toEqual({ two: true });
    });

    test.each(
      createTestCases('a service can cancel a patch', [
        [{ one: true }, { one: undefined }],
        [R.assoc('one', true), R.dissoc('one')]
      ])
    )('%s', (_label, setupFn, updatePatch, servicePatch) => {
      const services = [
        {
          run: (cell) => {
            if (cell.state.one) {
              cell.update(servicePatch);
            }
          }
        }
      ];

      const cells = setupFn({ services });
      const cell = cells();

      cell.update(updatePatch);

      expect(cells().state).toEqual({});
    });

    describe.each(
      createTestCases('route change, please wait, load async', [
        [{ route: 'PageB' }, { data: 'Loading' }, { data: 'Loaded' }],
        [R.assoc('route', 'PageB'), R.assoc('data', 'Loading'), R.assoc('data', 'Loaded')]
      ])
    )('%s', (_label, setupFn, updatePatch, servicePatch1, servicePatch2) => {
      test('async', (done) => {
        const initial = { route: 'PageA', data: 'None' };

        const services = [
          {
            onchange: (state) => state.route,
            run: (cell) => {
              if (cell.state.route === 'PageB') {
                cell.update(servicePatch1);
              }
            }
          },
          {
            run: ({ state, update }) => {
              if (state.data === 'Loading') {
                setTimeout(() => {
                  update(servicePatch2);
                }, 10);
              }
            }
          }
        ];

        const cells = setupFn({ initial, services });
        const cell = cells();

        cells.map((cell) => {
          try {
            if (cell.state.data === 'Loading') {
              expect(cell.state.route).toEqual('PageB');
            } else if (cell.state.data === 'Loaded') {
              expect(cell.state).toEqual({ route: 'PageB', data: 'Loaded' });
              done();
            }
          } catch (error) {
            done(error);
          }
        });

        cell.update(updatePatch);
      });
    });

    describe.each(
      createTestCases("route change, don't go to page yet, load async", [
        [
          { nextRoute: 'PageB' },
          { data: 'Loading' },
          (state) => ({ route: state.nextRoute, nextRoute: undefined, data: 'Loaded' })
        ],
        [
          R.assoc('nextRoute', 'PageB'),
          R.assoc('data', 'Loading'),
          (state) =>
            meiosis.functionPatches.combinePatches([
              R.assoc('route', state.nextRoute),
              R.dissoc('nextRoute'),
              R.assoc('data', 'Loaded')
            ])
        ]
      ])
    )('%s', (_label, setupFn, updatePatch, servicePatch1, servicePatch2) => {
      test('async', (done) => {
        const initial = { route: 'PageA', data: 'None' };

        const services = [
          {
            onchange: (state) => state.nextRoute,
            run: (cell) => {
              if (cell.state.nextRoute === 'PageB') {
                cell.update(servicePatch1);
              }
            }
          },
          {
            run: ({ state, update }) => {
              if (state.data === 'Loading') {
                setTimeout(() => {
                  update(servicePatch2(state));
                }, 10);
              }
            }
          }
        ];

        const cells = setupFn({ initial, services });
        const cell = cells();

        cells.map((cell) => {
          try {
            if (cell.state.data === 'Loading') {
              expect(cell.state.route).toEqual('PageA');
            } else if (cell.state.data === 'Loaded') {
              expect(cell.state).toEqual({ route: 'PageB', data: 'Loaded' });
              done();
            }
          } catch (error) {
            done(error);
          }
        });

        cell.update(updatePatch);
      });
    });

    test.each(
      createTestCases('route change, not authorized, redirect', [
        [
          { nextRoute: 'PageB' },
          {
            nextRoute: undefined,
            redirect: { route: 'PageC', message: 'Please login.' }
          },
          (state) => ({
            route: state.redirect.route,
            message: state.redirect.message,
            redirect: undefined
          })
        ],
        [
          R.assoc('nextRoute', 'PageB'),
          meiosis.functionPatches.combinePatches([
            R.dissoc('nextRoute'),
            R.assoc('redirect', { route: 'PageC', message: 'Please login.' })
          ]),
          (state) =>
            meiosis.functionPatches.combinePatches([
              R.assoc('route', state.redirect.route),
              R.assoc('message', state.redirect.message),
              R.dissoc('redirect')
            ])
        ]
      ])
    )('%s', (_label, setupFn, updatePatch, servicePatch1, servicePatch2) => {
      const initial = { route: 'PageA' };

      const services = [
        {
          onchange: (state) => state.nextRoute,
          run: (cell) => {
            if (cell.state.nextRoute === 'PageB' && !cell.state.user) {
              cell.update(servicePatch1);
            }
          }
        },
        {
          run: ({ state, update }) => {
            if (state.redirect) {
              update(servicePatch2(state));
            }
          }
        }
      ];

      const cells = setupFn({ initial, services });
      const cell = cells();

      cells.map((cell) => {
        expect(cell.state.route).not.toEqual('PageB');

        if (cell.state.route === 'PageC') {
          expect(cell.state).toEqual({ route: 'PageC', message: 'Please login.' });
        }
      });

      cell.update(updatePatch);
    });

    test.each(
      createTestCases('leave route, cleanup', [
        [{ route: 'PageB' }, { data: 'None' }],
        [R.assoc('route', 'PageB'), R.assoc('data', 'None')]
      ])
    )('%s', (_label, setupFn, updatePatch, servicePatch) => {
      const initial = { route: 'PageA', data: 'Loaded' };

      const services = [
        {
          onchange: (state) => state.route,
          run: (cell) => {
            if (cell.state.data === 'Loaded' && cell.state.route !== 'PageA') {
              cell.update(servicePatch);
            }
          }
        }
      ];

      const cells = setupFn({ initial, services });
      const cell = cells();

      cell.update(updatePatch);
      expect(cells().state).toEqual({ route: 'PageB', data: 'None' });
    });

    test.each(
      createTestCases('leave route, confirm unsaved data, stay on page', [
        [{ nextRoute: 'PageB' }, { confirm: true }, { confirm: false }],
        [R.assoc('nextRoute', 'PageB'), R.assoc('confirm', true), R.assoc('confirm', false)]
      ])
    )('%s', (_label, setupFn, updatePatch, servicePatch, cancelPatch) => {
      const initial = { route: 'PageA', form: 'data' };

      const services = [
        {
          onchange: (state) => state.nextRoute,
          run: (cell) => {
            if (
              cell.state.form === 'data' &&
              cell.state.nextRoute !== 'PageA' &&
              cell.state.confirm !== false
            ) {
              cell.update(servicePatch);
            }
          }
        }
      ];

      const cells = setupFn({ initial, services });
      const cell = cells();

      cells.map((cell) => {
        expect(cell.state.route).not.toEqual('PageB');

        if (cell.state.confirm === true) {
          expect(cell.state.route).toEqual('PageA');
        } else if (cell.state.confirm === false) {
          expect(cell.state.route).toEqual('PageA');
        }
      });

      cell.update(updatePatch);
      cell.update(cancelPatch);
    });

    test.each(
      createTestCases('leave route, confirm unsaved data, leave page', [
        [
          { nextRoute: 'PageB' },
          { confirm: true },
          (state) => ({
            route: state.nextRoute,
            nextRoute: undefined
          }),
          { confirm: false, nextRoute: 'PageB', form: undefined }
        ],
        [
          R.assoc('nextRoute', 'PageB'),
          R.assoc('confirm', true),
          (state) =>
            meiosis.functionPatches.combinePatches([
              R.assoc('route', state.nextRoute),
              R.dissoc('nextRoute')
            ]),
          meiosis.functionPatches.combinePatches([
            R.assoc('confirm', false),
            R.assoc('nextRoute', 'PageB'),
            R.dissoc('form')
          ])
        ]
      ])
    )('%s', (_label, setupFn, updatePatch, servicePatch1, servicePatch2, confirmPatch) => {
      const initial = { route: 'PageA', form: 'data' };

      const services = [
        {
          onchange: (state) => state.nextRoute,
          run: (cell) => {
            if (cell.state.form === 'data' && cell.state.nextRoute !== 'PageA') {
              cell.update(servicePatch1);
            }
          }
        },
        {
          onchange: (state) => state.confirm,
          run: (cell) => {
            if (!cell.state.confirm) {
              cell.update(servicePatch2(cell.state));
            }
          }
        }
      ];

      const cells = setupFn({ initial, services });
      const cell = cells();

      cells.map((cell) => {
        if (cell.state.confirm === true) {
          expect(cell.state.route).toEqual('PageA');
        }
      });

      cell.update(updatePatch);
      cell.update(confirmPatch);

      expect(cells().state).toEqual({ route: 'PageB', confirm: false });
    });

    // credit @cmnstmntmn for this test case
    const userData = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Mary' }
    ];

    test.each(
      createTestCases('stream - action and service calling another action', [
        [{ data: userData }, { flag: 'action2' }],
        [R.assoc('data', userData), R.assoc('flag', 'action2')]
      ])
    )('%s', (_label, setupFn, patch1, patch2) => {
      const actions = {
        action1: (cell) => {
          cell.update(patch1);
        },
        action2: (cell) => {
          cell.update(patch2);
        }
      };

      const services = [
        {
          run: (cell) => {
            if (cell.state.flag === null && cell.state.data.length > 0) {
              actions.action2(cell);
            }
          }
        }
      ];

      const app = {
        initial: {
          flag: null,
          data: []
        },
        services
      };

      const cells = setupFn(app);
      const cell = cells();

      actions.action1(cell);

      expect(cells().state.flag).toEqual('action2');
    });

    test.each(
      createTestCases('one event triggers multiple services', [
        [
          { events: { event1: true } },
          { events: { event1: undefined }, triggers: { trigger1: true, trigger2: true } },
          { triggers: { trigger1: undefined }, service1: true },
          { triggers: { trigger2: undefined }, service2: true }
        ],
        [
          R.assocPath(['events', 'event1'], true),
          meiosis.functionPatches.combinePatches([
            R.dissocPath(['events', 'event1']),
            R.assoc('triggers', { trigger1: true, trigger2: true })
          ]),
          meiosis.functionPatches.combinePatches([
            R.dissocPath(['triggers', 'trigger1']),
            R.assoc('service1', true)
          ]),
          meiosis.functionPatches.combinePatches([
            R.dissocPath(['triggers', 'trigger2']),
            R.assoc('service2', true)
          ])
        ]
      ])
    )('%s', (_label, setupFn, updatePatch, appServicePatch, servicePatch1, servicePatch2) => {
      const appService = {
        run: (cell) => {
          if (cell.state.events.event1) {
            cell.update(appServicePatch);
          }
        }
      };

      const service1 = {
        run: (cell) => {
          if (cell.state.triggers.trigger1) {
            cell.update(servicePatch1);
          }
        }
      };

      const service2 = {
        run: (cell) => {
          if (cell.state.triggers.trigger2) {
            cell.update(servicePatch2);
          }
        }
      };

      const services = [appService, service1, service2];

      const app = {
        initial: {
          events: {},
          triggers: {}
        },
        services
      };

      const cells = setupFn(app);
      const cell = cells();

      cell.update(updatePatch);

      expect(cells().state).toEqual({ events: {}, triggers: {}, service1: true, service2: true });
    });

    describe.each(
      createTestCases('one event triggers multiple services', [
        [
          { events: { event1: true } },
          { events: { event1: undefined }, triggers: { trigger1: true, trigger2: true } },
          { triggers: { trigger1: undefined }, service1: true },
          { triggers: { trigger2: undefined }, service2: true }
        ],
        [
          R.assocPath(['events', 'event1'], true),
          meiosis.functionPatches.combinePatches([
            R.dissocPath(['events', 'event1']),
            R.assoc('triggers', { trigger1: true, trigger2: true })
          ]),
          meiosis.functionPatches.combinePatches([
            R.dissocPath(['triggers', 'trigger1']),
            R.assoc('service1', true)
          ]),
          meiosis.functionPatches.combinePatches([
            R.dissocPath(['triggers', 'trigger2']),
            R.assoc('service2', true)
          ])
        ]
      ])
    )('%s', (_label, setupFn, updatePatch, appServicePatch, servicePatch1, servicePatch2) => {
      test('async', (done) => {
        const appService = {
          run: ({ state, update }) => {
            if (state.events.event1) {
              setTimeout(() => update(appServicePatch), 1);
            }
          }
        };

        const service1 = {
          run: ({ state, update }) => {
            if (state.triggers.trigger1) {
              setTimeout(() => update(servicePatch1), 1);
            }
          }
        };

        const service2 = {
          run: ({ state, update }) => {
            if (state.triggers.trigger2) {
              setTimeout(() => update(servicePatch2), 1);
            }
          }
        };

        const services = [appService, service1, service2];

        const app = {
          initial: {
            events: {},
            triggers: {}
          },
          services
        };

        const cells = setupFn(app);
        const cell = cells();

        const stateLog = [];
        cells.map((cell) => {
          stateLog.push(cell.state);

          if (stateLog.length === 6) {
            try {
              expect(cells().state).toEqual({
                events: {},
                triggers: {},
                service1: true,
                service2: true
              });
              done();
            } catch (error) {
              done(error);
            }
          }
        });

        cell.update(updatePatch);
      });
    });
  });
});

describe('meiosis setup with generic common', () => {
  describe.each(streamCases)('%s', (_label, streamLib) => {
    test('required accumulator function', () => {
      expect(() => {
        meiosis.common.setup({ stream: streamLib, app: {} });
      }).toThrow();
    });

    test('basic mergerino setup with no services', () => {
      const actions = {
        increment: (update, amount) => {
          update({ count: (x) => x + amount });
        }
      };

      const { states, update } = meiosis.common.setup({
        stream: streamLib,
        accumulator: merge,
        app: { initial: { count: 0 } }
      });

      actions.increment(update, 2);

      expect(states()).toEqual({ count: 2 });
    });

    test('basic functionPatch setup with no services', () => {
      const actions = {
        increment: (update, amount) => {
          update(R.over(R.lensProp('count'), R.add(amount)));
        }
      };

      const { states, update } = meiosis.common.setup({
        stream: streamLib,
        accumulator: (x, f) => f(x),
        app: { initial: { count: 0 } }
      });

      actions.increment(update, 2);

      expect(states()).toEqual({ count: 2 });
    });
  });
});

describe('Meiosis cell', () => {
  const streamLib = meiosis.simpleStream;

  const applyPatchCases = [
    ['mergerino', (app) => meiosis.mergerino.setup({ stream: streamLib, merge, app })],
    ['functionPatches', (app) => meiosis.functionPatches.setup({ stream: streamLib, app })]
  ];

  const createTestCases = (label, arr = [[], [], []]) => {
    const result = [];
    const total = Math.min(arr.length, applyPatchCases.length);
    for (let i = 0; i < total; i++) {
      result.push([applyPatchCases[i][0] + ' / ' + label, applyPatchCases[i][1], ...arr[i]]);
    }
    return result;
  };

  test.each(
    createTestCases('minimal', [
      [{ duck: { sound: 'quack' } }, { duck: { color: 'yellow' } }],
      [() => ({ duck: { sound: 'quack' } }), R.assocPath(['duck', 'color'], 'yellow')]
    ])
  )('%s', (_label, setupFn, patch1, patch2) => {
    const cells = setupFn();
    const cell = cells();
    expect(cell.state).toEqual({});

    cell.update(patch1);
    cell.update(patch2);

    expect(cells().state).toEqual({ duck: { sound: 'quack', color: 'yellow' } });
  });

  test.each(
    createTestCases('nest', [
      [{ duck: { sound: 'quack' } }, { duck: { color: 'yellow' } }],
      [() => ({ duck: { sound: 'quack' } }), R.assocPath(['duck', 'color'], 'yellow')]
    ])
  )('%s', (_label, setupFn, patch1, patch2) => {
    const cells = setupFn({ initial: { feathers: { duck: {} } } });
    const cell = cells();
    const nested = cell.nest('feathers');

    nested.update(patch1);
    nested.update(patch2);

    expect(cells().state).toEqual({ feathers: { duck: { sound: 'quack', color: 'yellow' } } });
  });

  test.each(
    createTestCases('nest gets latest state', [
      [{ duck: { sound: 'quack' } }, { duck: { color: 'yellow' } }],
      [() => ({ duck: { sound: 'quack' } }), R.assocPath(['duck', 'color'], 'yellow')]
    ])
  )('%s', (_label, setupFn, patch1, patch2) => {
    const cells = setupFn({ initial: { feathers: { duck: {} } } });
    const nested = cells().nest('feathers');

    nested.update(patch1);
    nested.update(patch2);

    const nestedCell = cells().nest('feathers');
    expect(nestedCell.state).toEqual({ duck: { sound: 'quack', color: 'yellow' } });
  });

  test.each(
    createTestCases('deep nest', [
      [{ duck: { sound: 'quack' } }, { duck: { color: 'yellow' } }],
      [() => ({ duck: { sound: 'quack' } }), R.assocPath(['duck', 'color'], 'yellow')]
    ])
  )('%s', (_label, setupFn, patch1, patch2) => {
    const cells = setupFn({ initial: { fowl: { feathers: { duck: {} } } } });
    const cell = cells();
    const deepNested = cell.nest('fowl').nest('feathers');

    deepNested.update(patch1);
    deepNested.update(patch2);

    expect(cells().state).toEqual({
      fowl: { feathers: { duck: { sound: 'quack', color: 'yellow' } } }
    });
  });

  test.each(
    createTestCases('actions', [
      [{ duck: { sound: 'quack' } }, { duck: { color: 'yellow' } }, { done: true }],
      [
        () => ({ duck: { sound: 'quack' } }),
        R.assocPath(['duck', 'color'], 'yellow'),
        R.assoc('done', true)
      ]
    ])
  )('%s', (_label, setupFn, patch1, patch2, patch3) => {
    const actions = {
      done: (cell) => cell.update(patch3)
    };

    const cells = setupFn({
      initial: { fowl: { feathers: { duck: {} } } }
    });
    const cell = cells();

    const nestedActions = {
      action1: (cell) => cell.update(patch1),
      action2: (cell) => cell.update(patch2)
    };

    const deepNested = cell.nest('fowl').nest('feathers');

    nestedActions.action1(deepNested);
    nestedActions.action2(deepNested);
    actions.done(cell);

    expect(cells().state).toEqual({
      done: true,
      fowl: { feathers: { duck: { sound: 'quack', color: 'yellow' } } }
    });
  });
});
