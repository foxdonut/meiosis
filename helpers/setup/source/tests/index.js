/* eslint-env jest */

import flyd from "flyd";
import Stream from "mithril/stream";
import merge from "mergerino";
import R from "ramda";

import meiosis from "../src/index";

const streamCases = [
  ["Meiosis simple-stream", meiosis.simpleStream],
  ["flyd", flyd],
  ["mithril-stream", Stream]
];

describe("meiosis setup with library for applying patches", () => {
  describe.each(streamCases)("%s", (_label, streamLib) => {
    const applyPatchCases = [
      ["mergerino", app => meiosis.mergerino.setup({ stream: streamLib, merge, app })],
      ["functionPatches", app => meiosis.functionPatches.setup({ stream: streamLib, app })]
    ];

    const createTestCases = (label, arr = [[], [], []]) => {
      const result = [];
      const total = Math.min(arr.length, applyPatchCases.length);
      for (let i = 0; i < total; i++) {
        result.push([applyPatchCases[i][0] + " / " + label, applyPatchCases[i][1], ...arr[i]]);
      }
      return result;
    };

    test.each(
      createTestCases("minimal", [
        [{ duck: { sound: "quack" } }, { duck: { color: "yellow" } }],
        [() => ({ duck: { sound: "quack" } }), R.assocPath(["duck", "color"], "yellow")],
        [
          state => {
            state.duck = { sound: "quack" };
          },
          state => {
            state.duck.color = "yellow";
          }
        ]
      ])
    )("%s", (_label, setupFn, patch1, patch2) => {
      const { states, getCell } = setupFn();
      const cell = getCell();
      expect(cell.state).toEqual({});

      cell.update(patch1);
      cell.update(patch2);

      expect(states()).toEqual({ duck: { sound: "quack", color: "yellow" } });
    });

    test.each(createTestCases("initial state"))("%s", (_label, setupFn) => {
      const { getCell } = setupFn({ initial: { duck: "yellow" } });

      expect(getCell().state).toEqual({ duck: "yellow" }, "initial state");
    });

    test.each(createTestCases("initial state promise"))("%s", (_label, setupFn) => {
      const Initial = () =>
        new Promise(resolve => {
          setTimeout(() => resolve({ duck: "yellow" }), 10);
        });

      const createApp = () => Initial().then(initial => ({ initial }));

      return createApp().then(app => {
        const { states } = setupFn(app);

        expect(states()).toEqual({ duck: "yellow" }, "initial state");
      });
    });

    test.each(
      createTestCases("services", [
        [
          [
            { count: x => x + 1 },
            { increment: undefined },
            meiosis.mergerino.combinePatches([{ invalid: undefined }, { combined: true }]),
            { sequenced: true },
            { received: true }
          ],
          [{ increment: 1 }, { increment: 10 }, { invalid: true }, { sequence: true }]
        ],
        [
          [
            R.over(R.lensProp("count"), R.add(1)),
            R.dissoc("increment"),
            meiosis.functionPatches.combinePatches([
              R.dissoc("invalid"),
              R.assoc("combined", true)
            ]),
            R.assoc("sequenced", true),
            R.assoc("received", true)
          ],
          [
            R.assoc("increment", 1),
            R.assoc("increment", 10),
            R.assoc("invalid", true),
            R.assoc("sequence", true)
          ]
        ]
      ])
    )("%s", (_label, setupFn, servicePatches, updatePatches) => {
      const services = [
        state => (state.increment > 0 && state.increment < 10 ? servicePatches[0] : null),
        state => (state.increment <= 0 || state.increment >= 10 ? servicePatches[1] : null),
        state => (state.invalid ? servicePatches[2] : null),
        state => (state.sequence ? servicePatches[3] : null),
        state => (state.sequenced ? servicePatches[4] : null)
      ];

      const { states, getCell } = setupFn({ initial: { count: 0 }, services });
      const cell = getCell();

      cell.update(updatePatches[0]);
      cell.update(updatePatches[1]);
      cell.update(updatePatches[2]);
      cell.update(updatePatches[3]);

      expect(states()).toEqual({
        count: 1,
        combined: true,
        sequence: true,
        sequenced: true,
        received: true
      });
    });

    test.each(
      createTestCases("services run on initial state", [
        [{ count: x => x + 1 }],
        [R.over(R.lensProp("count"), R.add(1))],
        [
          draft => {
            draft.count++;
          }
        ]
      ])
    )("%s", (_label, setupFn, patch) => {
      const services = [state => (state.increment > 0 && state.increment < 10 ? patch : null)];

      const { states } = setupFn({ initial: { count: 0, increment: 1 }, services });

      let ticks = 0;
      states.map(() => ticks++);

      expect(states()).toEqual({ count: 1, increment: 1 });
      expect(ticks).toEqual(1);
    });

    test.each(
      createTestCases("effects and actions", [
        [{ count: x => x + 1 }, { service: true }, { count: 1 }],
        [R.over(R.lensProp("count"), R.add(1)), R.assoc("service", true), R.assoc("count", 1)],
        [
          draft => {
            draft.count++;
          },
          draft => {
            draft.service = true;
          },
          draft => {
            draft.count = 1;
          }
        ]
      ])
    )("%s", (_label, setupFn, actionPatch, servicePatch, updatePatch) => {
      const actions = {
        increment: cell => cell.update(actionPatch)
      };

      const effects = [
        cell => {
          if (cell.state.count === 1) {
            actions.increment(cell);
          }
        },
        ({ state, update }) => {
          if (state.count === 2 && !state.service) {
            update(servicePatch);
          }
        }
      ];

      const { states, getCell } = setupFn({ initial: { count: 0 }, effects });
      const cell = getCell();

      cell.update(updatePatch);

      expect(states()).toEqual({ count: 2, service: true });
    });

    test.each(
      createTestCases("actions can use combine", [
        [meiosis.mergerino.combinePatches([{ count: x => x + 1 }, { combined: true }])],
        [
          meiosis.functionPatches.combinePatches([
            R.over(R.lensProp("count"), R.add(1)),
            R.assoc("combined", true)
          ])
        ]
      ])
    )("%s", (_label, setupFn, actionPatch) => {
      const actions = {
        increment: cell => cell.update(actionPatch)
      };

      const { states, getCell } = setupFn({ initial: { count: 0 } });
      const cell = getCell();

      actions.increment(cell);

      expect(states()).toEqual({ count: 1, combined: true });
    });

    test.each(
      createTestCases("an action can call another action", [
        [{ count: x => x + 1 }, { interaction: true }],
        [R.over(R.lensProp("count"), R.add(1)), R.assoc("interaction", true)],
        [
          draft => {
            draft.count++;
          },
          draft => {
            draft.interaction = true;
          }
        ]
      ])
    )("%s", (_label, setupFn, action1, action2) => {
      const actions = {
        increment: cell => cell.update(action1),

        interact: function (cell) {
          cell.update(action2);
          this.increment(cell);
        }
      };

      const { states, getCell } = setupFn({ initial: { count: 0 } });
      const cell = getCell();

      actions.interact(cell);

      expect(states()).toEqual({ count: 1, interaction: true });
    });

    test.each(
      createTestCases("service calls are combined into a single state update", [
        [
          meiosis.mergerino.combinePatches([{ count: x => x + 1 }, { service1: true }]),
          { service2: true },
          { count: 1 }
        ],
        [
          meiosis.functionPatches.combinePatches([
            R.over(R.lensProp("count"), R.add(1)),
            R.assoc("service1", true)
          ]),
          R.assoc("service2", true),
          R.assoc("count", 1)
        ]
      ])
    )("%s", (_label, setupFn, service1, service2, updatePatch) => {
      const services = [
        state => {
          if (state.count === 1) {
            return service1;
          }
        },
        // Services see previous changes
        state => {
          if (state.count === 2) {
            return service2;
          }
        }
      ];

      const { states, getCell } = setupFn({ services });
      const cell = getCell();

      let ticks = 0;
      states.map(() => ticks++);

      cell.update(updatePatch);

      expect(ticks).toEqual(2);
      expect(states()).toEqual({ count: 2, service1: true, service2: true });
    });

    test.each(
      createTestCases("synchronous effect updates", [
        [{ count: x => x + 1 }, { effect1: true }, { effect2: true }, { count: 1 }],
        [
          R.over(R.lensProp("count"), R.add(1)),
          R.assoc("effect1", true),
          R.assoc("effect2", true),
          R.assoc("count", 1)
        ],
        [
          draft => {
            draft.count++;
          },
          draft => {
            draft.effect1 = true;
          },
          draft => {
            draft.effect2 = true;
          },
          draft => {
            draft.count = 1;
          }
        ]
      ])
    )("%s", (_label, setupFn, incr, effect1, effect2, init) => {
      const effects = [
        ({ state, update }) => {
          if (state.count === 1) {
            update(incr);
            update(effect1);
          }
        },
        ({ state, update }) => {
          if (state.count > 1 && !state.effect2) {
            update(effect2);
          }
        }
      ];

      const { states, getCell } = setupFn({ effects });
      const cell = getCell();

      cell.update(init);

      expect(states()).toEqual({ count: 2, effect1: true, effect2: true });
    });

    test.each(
      createTestCases("effects may be called in an infinite loop", [
        [{ effect: true }, { count: 1 }],
        [R.assoc("effect", true), R.assoc("count", 1)],
        [
          draft => {
            draft.effect = true;
          },
          draft => {
            draft.count = 1;
          }
        ]
      ])
    )("%s", (_label, setupFn, effect, init) => {
      let effectCalls = 0;

      const effects = [
        ({ state, update }) => {
          if (state.count === 1 && effectCalls < 5) {
            effectCalls++;
            update(effect);
          }
        }
      ];

      const { states, getCell } = setupFn({ effects });
      const cell = getCell();

      cell.update(init);

      expect(effectCalls).toEqual(5);
      expect(states()).toEqual({ count: 1, effect: true });
    });

    test.each(
      createTestCases("effect running on initial state is seen in the getState stream", [
        [{ effect: true }],
        [R.assoc("effect", true)],
        [
          draft => {
            draft.effect = true;
          }
        ]
      ])
    )("%s", (_label, setupFn, effect) => {
      const effects = [
        ({ state, update }) => {
          if (!state.effect) {
            update(effect);
          }
        }
      ];

      const { states } = setupFn({ effects });

      expect(states()).toEqual({ effect: true });
    });

    test.each(
      createTestCases("a service can alter a state change", [
        [{ one: true }, { one: undefined, two: true }],
        [R.assoc("one", true), R.compose(R.dissoc("one"), R.assoc("two", true))],
        [
          draft => {
            draft.one = true;
          },
          draft => {
            delete draft.one;
            draft.two = true;
          }
        ]
      ])
    )("%s", (_label, setupFn, updatePatch, servicePatch) => {
      const services = [
        state => {
          if (state.one) {
            return servicePatch;
          }
        }
      ];

      const { states, getCell } = setupFn({ services });
      const cell = getCell();

      cell.update(updatePatch);

      expect(states()).toEqual({ two: true });
    });

    test.each(
      createTestCases("a service can cancel a patch", [
        [{ one: true }, { one: undefined }],
        [R.assoc("one", true), R.dissoc("one")],
        [
          draft => {
            draft.one = true;
          },
          draft => {
            delete draft.one;
          }
        ]
      ])
    )("%s", (_label, setupFn, updatePatch, servicePatch) => {
      const services = [
        state => {
          if (state.one) {
            return servicePatch;
          }
        }
      ];

      const { states, getCell } = setupFn({ services });
      const cell = getCell();

      let ticks = 0;
      states.map(() => ticks++);

      cell.update(updatePatch);

      expect(states()).toEqual({});
      expect(ticks).toEqual(2);
    });

    test.each(
      createTestCases("a service and an effect", [
        [{ patch: true }, { one: true }, { patch: undefined, effect: true }],
        [
          R.assoc("patch", true),
          R.assoc("one", true),
          meiosis.functionPatches.combinePatches([R.dissoc("patch"), R.assoc("effect", true)])
        ],
        [
          draft => {
            draft.patch = true;
          },
          draft => {
            draft.one = true;
          },
          draft => {
            delete draft.patch;
            draft.effect = true;
          }
        ]
      ])
    )("%s", (_label, setupFn, updatePatch, servicePatch, effectPatch) => {
      const services = [
        state => {
          if (state.patch) {
            return servicePatch;
          }
        }
      ];

      const effects = [
        ({ state, update }) => {
          if (state.patch) {
            update(effectPatch);
          }
        }
      ];

      const { states, getCell } = setupFn({ services, effects });
      const cell = getCell();

      let ticks = 0;
      states.map(() => ticks++);

      cell.update(updatePatch);

      expect(states()).toEqual({ one: true, effect: true });
      expect(ticks).toEqual(3);
    });

    describe.each(
      createTestCases("route change, please wait, load async", [
        [{ route: "PageB" }, { data: "Loading" }, { data: "Loaded" }],
        [R.assoc("route", "PageB"), R.assoc("data", "Loading"), R.assoc("data", "Loaded")],
        [
          draft => {
            draft.route = "PageB";
          },
          draft => {
            draft.data = "Loading";
          },
          draft => {
            draft.data = "Loaded";
          }
        ]
      ])
    )("%s", (_label, setupFn, updatePatch, servicePatch, effectPatch) => {
      test("async", done => {
        const initial = { route: "PageA", data: "None" };

        const services = [
          state => {
            if (state.route === "PageB" && state.data === "None") {
              return servicePatch;
            }
          }
        ];

        const effects = [
          ({ state, update }) => {
            if (state.data === "Loading") {
              setTimeout(() => {
                update(effectPatch);
              }, 10);
            }
          }
        ];

        const { states, getCell } = setupFn({ initial, services, effects });
        const cell = getCell();

        states.map(state => {
          try {
            if (state.data === "Loading") {
              expect(state.route).toEqual("PageB");
            } else if (state.data === "Loaded") {
              expect(state).toEqual({ route: "PageB", data: "Loaded" });
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
          { nextRoute: "PageB" },
          { data: "Loading" },
          state => ({ route: state.nextRoute, nextRoute: undefined, data: "Loaded" })
        ],
        [
          R.assoc("nextRoute", "PageB"),
          R.assoc("data", "Loading"),
          state =>
            meiosis.functionPatches.combinePatches([
              R.assoc("route", state.nextRoute),
              R.dissoc("nextRoute"),
              R.assoc("data", "Loaded")
            ])
        ],
        [
          draft => {
            draft.nextRoute = "PageB";
          },
          draft => {
            draft.data = "Loading";
          },
          state => draft => {
            draft.route = state.nextRoute;
            delete draft.nextRoute;
            draft.data = "Loaded";
          }
        ]
      ])
    )("%s", (_label, setupFn, updatePatch, servicePatch, effectPatch) => {
      test("async", done => {
        const initial = { route: "PageA", data: "None" };

        const services = [
          state => {
            if (state.nextRoute === "PageB" && state.data === "None") {
              return servicePatch;
            }
          }
        ];

        const effects = [
          ({ state, update }) => {
            if (state.data === "Loading") {
              setTimeout(() => {
                update(effectPatch(state));
              }, 10);
            }
          }
        ];

        const { states, getCell } = setupFn({ initial, services, effects });
        const cell = getCell();

        states.map(state => {
          try {
            if (state.data === "Loading") {
              expect(state.route).toEqual("PageA");
            } else if (state.data === "Loaded") {
              expect(state).toEqual({ route: "PageB", data: "Loaded" });
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
      createTestCases("route change, not authorized, redirect", [
        [
          { nextRoute: "PageB" },
          {
            nextRoute: undefined,
            redirect: { route: "PageC", message: "Please login." }
          },
          state => ({
            route: state.redirect.route,
            message: state.redirect.message,
            redirect: undefined
          })
        ],
        [
          R.assoc("nextRoute", "PageB"),
          meiosis.functionPatches.combinePatches([
            R.dissoc("nextRoute"),
            R.assoc("redirect", { route: "PageC", message: "Please login." })
          ]),
          state =>
            meiosis.functionPatches.combinePatches([
              R.assoc("route", state.redirect.route),
              R.assoc("message", state.redirect.message),
              R.dissoc("redirect")
            ])
        ],
        [
          draft => {
            draft.nextRoute = "PageB";
          },
          draft => {
            delete draft.nextRoute;
            draft.redirect = { route: "PageC", message: "Please login." };
          },
          state => draft => {
            draft.route = state.redirect.route;
            draft.message = state.redirect.message;
            delete draft.redirect;
          }
        ]
      ])
    )("%s", (_label, setupFn, updatePatch, servicePatch, effectPatch) => {
      const initial = { route: "PageA" };

      const services = [
        state => {
          if (state.nextRoute === "PageB" && !state.user) {
            return servicePatch;
          }
        }
      ];

      const effects = [
        ({ state, update }) => {
          if (state.redirect) {
            update(effectPatch(state));
          }
        }
      ];

      const { states, getCell } = setupFn({ initial, services, effects });
      const cell = getCell();

      states.map(state => {
        expect(state.route).not.toEqual("PageB");

        if (state.route === "PageC") {
          expect(state).toEqual({ route: "PageC", message: "Please login." });
        }
      });

      cell.update(updatePatch);
    });

    test.each(
      createTestCases("leave route, cleanup", [
        [{ route: "PageB" }, { data: "None" }],
        [R.assoc("route", "PageB"), R.assoc("data", "None")],
        [
          draft => {
            draft.route = "PageB";
          },
          draft => {
            draft.data = "None";
          }
        ]
      ])
    )("%s", (_label, setupFn, updatePatch, servicePatch) => {
      const initial = { route: "PageA", data: "Loaded" };

      const services = [
        state => {
          if (state.data === "Loaded" && state.route !== "PageA") {
            return servicePatch;
          }
        }
      ];

      const { states, getCell } = setupFn({ initial, services });
      const cell = getCell();

      states.map(state => {
        if (state.route === "PageB") {
          expect(state).toEqual({ route: "PageB", data: "None" });
        }
      });

      cell.update(updatePatch);
    });

    test.each(
      createTestCases("leave route, confirm unsaved data, stay on page", [
        [{ nextRoute: "PageB" }, { confirm: true }, { confirm: false }],
        [R.assoc("nextRoute", "PageB"), R.assoc("confirm", true), R.assoc("confirm", false)],
        [
          draft => {
            draft.nextRoute = "PageB";
          },
          draft => {
            draft.confirm = true;
          },
          draft => {
            draft.confirm = false;
          }
        ]
      ])
    )("%s", (_label, setupFn, updatePatch, servicePatch, cancelPatch) => {
      const initial = { route: "PageA", form: "data" };

      const services = [
        state => {
          if (state.form === "data" && state.nextRoute !== "PageA" && state.confirm !== false) {
            return servicePatch;
          }
        }
      ];

      const { states, getCell } = setupFn({ initial, services });
      const cell = getCell();

      states.map(state => {
        expect(state.route).not.toEqual("PageB");

        if (state.confirm === true) {
          expect(state.route).toEqual("PageA");
        } else if (state.confirm === false) {
          expect(state.route).toEqual("PageA");
        }
      });

      cell.update(updatePatch);
      cell.update(cancelPatch);
    });

    test.each(
      createTestCases("leave route, confirm unsaved data, leave page", [
        [
          { nextRoute: "PageB" },
          { confirm: true },
          state => ({
            route: state.nextRoute,
            nextRoute: undefined
          }),
          { confirm: false, nextRoute: "PageB", form: undefined }
        ],
        [
          R.assoc("nextRoute", "PageB"),
          R.assoc("confirm", true),
          state =>
            meiosis.functionPatches.combinePatches([
              R.assoc("route", state.nextRoute),
              R.dissoc("nextRoute")
            ]),
          meiosis.functionPatches.combinePatches([
            R.assoc("confirm", false),
            R.assoc("nextRoute", "PageB"),
            R.dissoc("form")
          ])
        ],
        [
          draft => {
            draft.nextRoute = "PageB";
          },
          draft => {
            draft.confirm = true;
          },
          state => draft => {
            draft.route = state.nextRoute;
            delete draft.nextRoute;
          },
          draft => {
            draft.confirm = false;
            draft.nextRoute = "PageB";
            delete draft.form;
          }
        ]
      ])
    )("%s", (_label, setupFn, updatePatch, servicePatch1, servicePatch2, confirmPatch) => {
      const initial = { route: "PageA", form: "data" };

      const services = [
        state => {
          if (state.form === "data" && state.nextRoute !== "PageA") {
            return servicePatch1;
          } else {
            return servicePatch2(state);
          }
        }
      ];

      const { states, getCell } = setupFn({ initial, services });
      const cell = getCell();

      states.map(state => {
        if (state.confirm === true) {
          expect(state.route).toEqual("PageA");
        } else if (state.confirm === false) {
          expect(state).toEqual({ route: "PageB", confirm: false });
        }
      });

      cell.update(updatePatch);
      cell.update(confirmPatch);
    });

    // credit @cmnstmntmn for this test case
    const userData = [
      { id: 1, name: "John" },
      { id: 2, name: "Mary" }
    ];

    test.each(
      createTestCases("stream - action and effect calling another action", [
        [{ data: userData }, { flag: "action2" }],
        [R.assoc("data", userData), R.assoc("flag", "action2")],
        [
          state => {
            state.data = userData;
          },
          state => {
            state.flag = "action2";
          }
        ]
      ])
    )("%s", (_label, setupFn, patch1, patch2) => {
      const actions = {
        action1: cell => {
          cell.update(patch1);
        },
        action2: cell => {
          cell.update(patch2);
        }
      };

      const appEffects = cell => {
        if (cell.state.flag === null && cell.state.data.length > 0) {
          actions.action2(cell);
        }
      };

      const app = {
        initial: {
          flag: null,
          data: []
        },
        effects: [appEffects]
      };

      const { states, getCell } = setupFn(app);
      const cell = getCell();

      const stateLog = [];
      states.map(state => stateLog.push(state));

      actions.action1(cell);

      expect(stateLog.length).toEqual(3);

      if (stateLog.length === 3) {
        expect(stateLog[2].flag).toEqual("action2");
      }
    });

    test.each(
      createTestCases("one event triggers multiple services", [
        [
          { events: { event1: true } },
          { events: { event1: undefined }, triggers: { trigger1: true, trigger2: true } },
          { triggers: { trigger1: undefined }, service1: true },
          { triggers: { trigger2: undefined }, service2: true }
        ],
        [
          R.assocPath(["events", "event1"], true),
          meiosis.functionPatches.combinePatches([
            R.dissocPath(["events", "event1"]),
            R.assoc("triggers", { trigger1: true, trigger2: true })
          ]),
          meiosis.functionPatches.combinePatches([
            R.dissocPath(["triggers", "trigger1"]),
            R.assoc("service1", true)
          ]),
          meiosis.functionPatches.combinePatches([
            R.dissocPath(["triggers", "trigger2"]),
            R.assoc("service2", true)
          ])
        ],
        [
          state => {
            state.events.event1 = true;
          },
          state => {
            delete state.events.event1;
            state.triggers = { trigger1: true, trigger2: true };
          },
          state => {
            delete state.triggers.trigger1;
            state.service1 = true;
          },
          state => {
            delete state.triggers.trigger2;
            state.service2 = true;
          }
        ]
      ])
    )("%s", (_label, setupFn, updatePatch, appServicePatch, servicePatch1, servicePatch2) => {
      const appService = state => {
        if (state.events.event1) {
          return appServicePatch;
        }
      };

      const service1 = state => {
        if (state.triggers.trigger1) {
          return servicePatch1;
        }
      };

      const service2 = state => {
        if (state.triggers.trigger2) {
          return servicePatch2;
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

      const { states, getCell } = setupFn(app);
      const cell = getCell();

      const stateLog = [];
      states.map(state => stateLog.push(state));

      cell.update(updatePatch);

      expect(stateLog).toEqual([
        { events: {}, triggers: {} },
        { events: {}, triggers: {}, service1: true, service2: true }
      ]);
    });

    describe.each(
      createTestCases("one event triggers multiple effects", [
        [
          { events: { event1: true } },
          { events: { event1: undefined }, triggers: { trigger1: true, trigger2: true } },
          { triggers: { trigger1: undefined }, effect1: true },
          { triggers: { trigger2: undefined }, effect2: true }
        ],
        [
          R.assocPath(["events", "event1"], true),
          meiosis.functionPatches.combinePatches([
            R.dissocPath(["events", "event1"]),
            R.assoc("triggers", { trigger1: true, trigger2: true })
          ]),
          meiosis.functionPatches.combinePatches([
            R.dissocPath(["triggers", "trigger1"]),
            R.assoc("effect1", true)
          ]),
          meiosis.functionPatches.combinePatches([
            R.dissocPath(["triggers", "trigger2"]),
            R.assoc("effect2", true)
          ])
        ],
        [
          state => {
            state.events.event1 = true;
          },
          state => {
            delete state.events.event1;
            state.triggers = { trigger1: true, trigger2: true };
          },
          state => {
            delete state.triggers.trigger1;
            state.effect1 = true;
          },
          state => {
            delete state.triggers.trigger2;
            state.effect2 = true;
          }
        ]
      ])
    )("%s", (_label, setupFn, updatePatch, appEffectPatch, effectPatch1, effectPatch2) => {
      test("async", done => {
        const appEffect = ({ state, update }) => {
          if (state.events.event1) {
            setTimeout(() => update(appEffectPatch), 1);
          }
        };

        const effect1 = ({ state, update }) => {
          if (state.triggers.trigger1) {
            setTimeout(() => update(effectPatch1), 1);
          }
        };

        const effect2 = ({ state, update }) => {
          if (state.triggers.trigger2) {
            setTimeout(() => update(effectPatch2), 1);
          }
        };

        const effects = [appEffect, effect1, effect2];

        const app = {
          initial: {
            events: {},
            triggers: {}
          },
          effects
        };

        const { states, getCell } = setupFn(app);
        const cell = getCell();

        const stateLog = [];
        states.map(state => {
          stateLog.push(state);

          if (stateLog.length === 6) {
            try {
              expect(stateLog).toEqual([
                { events: {}, triggers: {} },
                { events: { event1: true }, triggers: {} },
                { events: {}, triggers: { trigger1: true, trigger2: true } },
                { events: {}, triggers: { trigger2: true }, effect1: true },
                { events: {}, triggers: {}, effect1: true, effect2: true },
                { events: {}, triggers: {}, effect1: true, effect2: true }
              ]);
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

describe("meiosis setup with generic common", () => {
  describe.each(streamCases)("%s", (_label, streamLib) => {
    test("required accumulator function", () => {
      expect(() => {
        meiosis.common.setup({ stream: streamLib, app: {} });
      }).toThrow();
    });

    test("basic common setup with no services", () => {
      const actions = {
        increment: (cell, amount) => cell.update({ count: x => x + amount })
      };

      const { states, getCell } = meiosis.common.setup({
        stream: streamLib,
        accumulator: merge,
        app: { initial: { count: 0 } }
      });
      const cell = getCell();

      actions.increment(cell, 2);

      expect(states()).toEqual({ count: 2 });
    });

    test("basic functionPatch setup with no services", () => {
      const actions = {
        increment: (cell, amount) => cell.update(R.over(R.lensProp("count"), R.add(amount)))
      };

      const { states, getCell } = meiosis.common.setup({
        stream: streamLib,
        accumulator: (x, f) => f(x),
        app: { initial: { count: 0 } }
      });
      const cell = getCell();

      actions.increment(cell, 2);

      expect(states()).toEqual({ count: 2 });
    });
  });
});

describe("Meiosis cell", () => {
  const streamLib = meiosis.simpleStream;

  const applyPatchCases = [
    ["mergerino", app => meiosis.mergerino.setup({ stream: streamLib, merge, app })],
    ["functionPatches", app => meiosis.functionPatches.setup({ stream: streamLib, app })]
  ];

  const createTestCases = (label, arr = [[], [], []]) => {
    const result = [];
    const total = Math.min(arr.length, applyPatchCases.length);
    for (let i = 0; i < total; i++) {
      result.push([applyPatchCases[i][0] + " / " + label, applyPatchCases[i][1], ...arr[i]]);
    }
    return result;
  };

  test.each(
    createTestCases("minimal", [
      [{ duck: { sound: "quack" } }, { duck: { color: "yellow" } }],
      [() => ({ duck: { sound: "quack" } }), R.assocPath(["duck", "color"], "yellow")],
      [
        state => {
          state.duck = { sound: "quack" };
        },
        state => {
          state.duck.color = "yellow";
        }
      ]
    ])
  )("%s", (_label, setupFn, patch1, patch2) => {
    const { states, getCell } = setupFn();
    const cell = getCell();
    expect(cell.state).toEqual({});

    cell.update(patch1);
    cell.update(patch2);

    expect(states()).toEqual({ duck: { sound: "quack", color: "yellow" } });
  });

  test.each(
    createTestCases("nest", [
      [{ duck: { sound: "quack" } }, { duck: { color: "yellow" } }],
      [() => ({ duck: { sound: "quack" } }), R.assocPath(["duck", "color"], "yellow")],
      [
        state => {
          state.duck = { sound: "quack" };
        },
        state => {
          state.duck.color = "yellow";
        }
      ]
    ])
  )("%s", (_label, setupFn, patch1, patch2) => {
    const { states, getCell } = setupFn({ initial: { feathers: { duck: {} } } });
    const cell = getCell();
    const nested = cell.nest("feathers");

    nested.update(patch1);
    nested.update(patch2);

    expect(states()).toEqual({ feathers: { duck: { sound: "quack", color: "yellow" } } });
  });

  test.each(
    createTestCases("nest gets latest state", [
      [{ duck: { sound: "quack" } }, { duck: { color: "yellow" } }],
      [() => ({ duck: { sound: "quack" } }), R.assocPath(["duck", "color"], "yellow")],
      [
        state => {
          state.duck = { sound: "quack" };
        },
        state => {
          state.duck.color = "yellow";
        }
      ]
    ])
  )("%s", (_label, setupFn, patch1, patch2) => {
    const { getCell } = setupFn({ initial: { feathers: { duck: {} } } });
    const nested = getCell().nest("feathers");

    nested.update(patch1);
    nested.update(patch2);

    const nestedCell = getCell().nest("feathers");
    expect(nestedCell.state).toEqual({ duck: { sound: "quack", color: "yellow" } });
  });

  test.each(
    createTestCases("deep nest", [
      [{ duck: { sound: "quack" } }, { duck: { color: "yellow" } }],
      [() => ({ duck: { sound: "quack" } }), R.assocPath(["duck", "color"], "yellow")],
      [
        state => {
          state.duck = { sound: "quack" };
        },
        state => {
          state.duck.color = "yellow";
        }
      ]
    ])
  )("%s", (_label, setupFn, patch1, patch2) => {
    const { states, getCell } = setupFn({ initial: { fowl: { feathers: { duck: {} } } } });
    const cell = getCell();
    const deepNested = cell.nest("fowl").nest("feathers");

    deepNested.update(patch1);
    deepNested.update(patch2);

    expect(states()).toEqual({
      fowl: { feathers: { duck: { sound: "quack", color: "yellow" } } }
    });
  });

  test.each(
    createTestCases("actions", [
      [{ duck: { sound: "quack" } }, { duck: { color: "yellow" } }, { done: true }],
      [
        () => ({ duck: { sound: "quack" } }),
        R.assocPath(["duck", "color"], "yellow"),
        R.assoc("done", true)
      ],
      [
        state => {
          state.duck = { sound: "quack" };
        },
        state => {
          state.duck.color = "yellow";
        },
        state => {
          state.done = true;
        }
      ]
    ])
  )("%s", (_label, setupFn, patch1, patch2, patch3) => {
    const actions = {
      done: cell => cell.update(patch3)
    };

    const { states, getCell } = setupFn({
      initial: { fowl: { feathers: { duck: {} } } }
    });
    const cell = getCell();

    const nestedActions = {
      action1: cell => cell.update(patch1),
      action2: cell => cell.update(patch2)
    };

    const deepNested = cell.nest("fowl").nest("feathers");

    nestedActions.action1(deepNested);
    nestedActions.action2(deepNested);
    actions.done(cell);

    expect(states()).toEqual({
      done: true,
      fowl: { feathers: { duck: { sound: "quack", color: "yellow" } } }
    });
  });
});

describe("simpleStream", () => {
  test("basic", () => {
    const s1 = meiosis.simpleStream.stream();
    const result = s1(42);
    expect(result).toEqual(42);
  });

  test("value order", () => {
    const s1 = meiosis.simpleStream.stream();

    const f1 = x => {
      if (x === 10) {
        s1(20);
      }
    };

    const f2 = x => x;

    s1.map(f1);
    const s2 = s1.map(f2);

    const values = [];
    s2.map(value => values.push(value));

    s1(10);

    expect(values).toEqual([10, 20]);
  });

  test("effect on initial state", done => {
    const update = meiosis.simpleStream.stream();
    const initial = { route: "Home", routeChanged: true, data: [] };

    const states = meiosis.simpleStream.scan(
      (state, patch) => merge(state, patch),
      initial,
      update
    );

    const effect = state => {
      if (state.route === "Home") {
        if (state.routeChanged) {
          update({ routeChanged: false, loading: true });
        } else if (state.loading) {
          setTimeout(() => {
            update({ loading: false, data: ["duck", "quack"] });
          });
        }
      }
    };

    states.map(state => effect(state));

    states.map(state => {
      try {
        if (state.data.length === 2) {
          done();
        }
      } catch (error) {
        done(error);
      }
    });
  });

  test("set undefined", done => {
    const s1 = meiosis.simpleStream.stream();

    s1.map(_value => {
      done();
    });

    s1(undefined);
  });

  test("end stream", () => {
    const s1 = meiosis.simpleStream.stream();

    let c2 = 0;
    const s2 = s1.map(() => {
      c2++;
    });

    let c3 = 0;
    s2.map(() => {
      c3++;
    });

    s1(1);
    expect(c2).toEqual(1);
    expect(c3).toEqual(1);

    s2.end();
    s1(1);
    expect(c2).toEqual(2);
    expect(c3).toEqual(1);

    s1.end();
    s1(1);
    expect(c2).toEqual(2);
    expect(c3).toEqual(1);
  });
});

describe("util", () => {
  test("get", () => {
    expect(meiosis.util.get(null, ["a", "b"])).toBeUndefined();
    expect(meiosis.util.get(undefined, ["a", "b"])).toBeUndefined();
    expect(meiosis.util.get({}, ["a", "b"])).toBeUndefined();
    expect(meiosis.util.get({ a: 42 }, ["a", "b"])).toBeUndefined();
    expect(meiosis.util.get({ a: { b: 42 } }, ["a", "b"])).toEqual(42);
  });
});
