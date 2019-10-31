const test = require("tape");

const flyd = require("flyd");
const Stream = require("mithril/stream");
const merge = require("mergerino");
const R = require("ramda");
const { produce } = require("immer");
const compose = fns => args => fns.reduceRight((arg, fn) => fn(arg), args);

const meiosis = require("../dist/meiosis-setup");

const mergerinoTest = (merge, streamLib, label) => {
  test("mergerino setup", t => {
    t.test(label + " / minimal", t => {
      const { update, states } = meiosis.mergerino.setup({ stream: streamLib, merge });
      t.deepEqual(states(), {}, "initial state");

      update({ duck: { sound: "quack" } });
      update({ duck: { color: "yellow" } });

      t.deepEqual(states(), { duck: { sound: "quack", color: "yellow" } }, "resulting state");

      t.end();
    });

    t.test(label + " / initial state", t => {
      const { states } = meiosis.mergerino.setup({
        stream: streamLib,
        merge,
        app: { initial: { duck: "yellow" } }
      });

      t.deepEqual(states(), { duck: "yellow" }, "initial state");
      t.end();
    });

    t.test(label + " / initial state promise", t => {
      const Initial = () =>
        new Promise(resolve => {
          setTimeout(() => resolve({ duck: "yellow" }), 10);
        });

      const createApp = () => Initial().then(initial => ({ initial }));

      createApp().then(app => {
        const { states } = meiosis.mergerino.setup({ stream: streamLib, merge, app });

        t.deepEqual(states(), { duck: "yellow" }, "initial state");
        t.end();
      });
    });

    t.test(label + " / services", t => {
      const services = [
        ({ state }) =>
          state.increment > 0 && state.increment < 10 ? { state: { count: x => x + 1 } } : null,
        ({ state }) =>
          state.increment <= 0 || state.increment >= 10
            ? { state: { increment: undefined } }
            : null,
        ({ state }) =>
          state.invalid ? { state: [{ invalid: undefined }, { combined: true }] } : null,
        ({ state }) => (state.sequence ? { state: { sequenced: true } } : null),
        ({ state }) => (state.sequenced ? { state: { received: true } } : null)
      ];

      const { update, states } = meiosis.mergerino.setup({
        stream: streamLib,
        merge,
        app: { initial: { count: 0 }, services }
      });

      update({ increment: 1 });
      update({ increment: 10 });
      update({ invalid: true });
      update({ sequence: true });

      t.deepEqual(
        states(),
        { count: 1, combined: true, sequence: true, sequenced: true, received: true },
        "resulting state"
      );
      t.end();
    });

    t.test(label + " / services run on initial state", t => {
      const services = [
        ({ state }) =>
          state.increment > 0 && state.increment < 10 ? { state: { count: x => x + 1 } } : null
      ];

      const { states } = meiosis.mergerino.setup({
        stream: streamLib,
        merge,
        app: { initial: { count: 0, increment: 1 }, services }
      });

      t.deepEqual(states(), { count: 1, increment: 1 }, "resulting state");
      t.end();
    });

    t.test(label + " / services and actions", t => {
      const Actions = update => ({
        increment: amount => update({ count: x => x + amount })
      });

      const services = [
        ({ state }) => {
          // update from one service should not affect state seen by the other
          if (state.count === 1) {
            return { next: ({ actions }) => actions.increment(1) };
          }
        },
        ({ state }) => {
          if (state.count === 1 && !state.service) {
            return { next: ({ update }) => update({ service: true }) };
          }
        }
      ];

      const { update, states, actions } = meiosis.mergerino.setup({
        stream: streamLib,
        merge,
        app: { initial: { count: 0 }, services, Actions }
      });

      t.ok(typeof actions.increment === "function", "actions");

      update({ count: 1 });

      t.deepEqual(states(), { count: 2, service: true }, "resulting state");
      t.end();
    });

    t.test(label + " / actions can use combine", t => {
      const Actions = update => ({
        increment: amount => update([{ count: x => x + amount }, { combined: true }])
      });

      const { states, actions } = meiosis.mergerino.setup({
        stream: streamLib,
        merge,
        app: { initial: { count: 0 }, Actions }
      });

      actions.increment(1);

      t.deepEqual(states(), { count: 1, combined: true }, "combined patches");
      t.end();
    });

    t.test(label + " / service calls are combined into a single state update", t => {
      const services = [
        ({ state }) => {
          if (state.count === 1) {
            return { state: [{ count: x => x + 1 }, { service1: true }] };
          }
        },
        // Services see previous changes
        ({ state }) => {
          if (state.count === 2) {
            return { state: { service2: true } };
          }
        }
      ];

      const { update, states } = meiosis.mergerino.setup({
        stream: streamLib,
        merge,
        app: { services }
      });

      let ticks = 0;
      states.map(() => ticks++);

      update({ count: 1 });

      t.equal(ticks, 2, "number of ticks");
      t.deepEqual(states(), { count: 2, service1: true, service2: true }, "resulting state");
      t.end();
    });

    t.test(label + " / synchronous service updates", t => {
      let serviceCalls = 0;

      const services = [
        ({ state }) => {
          serviceCalls++;
          if (state.count === 1) {
            return {
              next: ({ update }) => {
                update({ count: x => x + 1 });
                update({ service1: true });
              }
            };
          }
        },
        ({ state }) => {
          if (state.count === 1) {
            return { next: ({ update }) => update({ service2: true }) };
          }
        }
      ];

      const { update, states } = meiosis.mergerino.setup({
        stream: streamLib,
        merge,
        app: { services }
      });

      update({ count: 1 });

      // Service calls: 1) initial, 2) update call, 3-4-5) update calls from services/next
      t.equal(serviceCalls, 5, "number of service calls");
      t.deepEqual(states(), { count: 2, service1: true, service2: true }, "resulting state");
      t.end();
    });

    t.test(label + " / services may be called in an infinite loop", t => {
      let serviceCalls = 0;

      const services = [
        ({ state }) => {
          if (state.count === 1 && serviceCalls < 5) {
            serviceCalls++;
            return { next: ({ update }) => update({ service: true }) };
          }
        }
      ];

      const { update, states } = meiosis.mergerino.setup({
        stream: streamLib,
        merge,
        app: { services }
      });

      update({ count: 1 });

      t.equal(serviceCalls, 5, "number of service calls");
      t.deepEqual(states(), { count: 1, service: true }, "resulting state");
      t.end();
    });

    t.test(label + " / a service can change a patch", t => {
      const services = [
        ({ patch }) => {
          if (patch.one) {
            return { patch: { two: true } };
          }
        }
      ];

      const { update, states } = meiosis.mergerino.setup({
        stream: streamLib,
        merge,
        app: { services }
      });

      update({ one: true });

      t.deepEqual(states(), { two: true }, "resulting state");
      t.end();
    });

    t.test(label + " / a service can cancel a patch", t => {
      const services = [
        ({ patch }) => {
          if (patch.one) {
            return { patch: false };
          }
        }
      ];

      const { update, states } = meiosis.mergerino.setup({
        stream: streamLib,
        merge,
        app: { services }
      });

      let ticks = 0;
      states.map(() => ticks++);

      update({ one: true });

      t.deepEqual(states(), {}, "resulting state");
      t.equal(ticks, 1, "number of ticks");
      t.end();
    });

    t.test(label + " / a service can cancel a render", t => {
      const services = [
        ({ patch }) => {
          if (patch.one) {
            return { render: false };
          }
        }
      ];

      const { update, states } = meiosis.mergerino.setup({
        stream: streamLib,
        merge,
        app: { services }
      });

      let ticks = 0;
      states.map(() => ticks++);

      update({ one: true });

      t.deepEqual(states(), {}, "resulting state");
      t.equal(ticks, 1, "number of ticks");
      t.end();
    });

    t.test(label + " / a service can make a state change, cancel render, and call next", t => {
      const services = [
        ({ patch }) => {
          if (patch.one) {
            return {
              state: { two: true },
              render: false,
              next: ({ update }) => update({ service: true })
            };
          }
        }
      ];

      const { update, states } = meiosis.mergerino.setup({
        stream: streamLib,
        merge,
        app: { services }
      });

      let ticks = 0;
      states.map(() => ticks++);

      update({ one: true });

      t.deepEqual(states(), { one: true, two: true, service: true }, "resulting state");
      t.equal(ticks, 2, "number of ticks");
      t.end();
    });
  });
};

mergerinoTest(merge, meiosis.simpleStream, "mergerino + Meiosis simple-stream");
mergerinoTest(merge, flyd, "mergerino + flyd");
mergerinoTest(merge, Stream, "mergerino + mithril-stream");

const functionPatchTest = (streamLib, label) => {
  label = "functionPatch + " + label;

  test("functionPatch setup", t => {
    t.test(label + " / minimal", t => {
      const { update, states } = meiosis.functionPatches.setup({ stream: streamLib });

      t.deepEqual(states(), {}, "initial state");

      update(() => ({ duck: { sound: "quack" } }));
      update(R.assocPath(["duck", "color"], "yellow"));

      t.deepEqual(states(), { duck: { sound: "quack", color: "yellow" } }, "resulting state");

      t.end();
    });

    t.test(label + " / initial state", t => {
      const { states } = meiosis.functionPatches.setup({
        stream: streamLib,
        app: { initial: { duck: "yellow" } }
      });

      t.deepEqual(states(), { duck: "yellow" }, "initial state");
      t.end();
    });

    t.test(label + " / initial state promise", t => {
      const Initial = () =>
        new Promise(resolve => {
          setTimeout(() => resolve({ duck: "yellow" }), 10);
        });

      const createApp = () => Initial().then(initial => ({ initial }));

      createApp().then(app => {
        const { states } = meiosis.functionPatches.setup({ stream: streamLib, app });

        t.deepEqual(states(), { duck: "yellow" }, "initial state");
        t.end();
      });
    });

    t.test(label + " / services", t => {
      const services = [
        ({ state }) =>
          state.increment > 0 && state.increment < 10
            ? { state: R.over(R.lensProp("count"), R.add(1)) }
            : null,

        ({ state }) =>
          state.increment <= 0 || state.increment >= 10 ? { state: R.dissoc("increment") } : null,
        ({ state }) =>
          state.invalid ? { state: [R.dissoc("invalid"), R.assoc("combined", true)] } : null,
        ({ state }) => (state.sequence ? { state: R.assoc("sequenced", true) } : null),
        ({ state }) => (state.sequenced ? { state: R.assoc("received", true) } : null)
      ];

      const { update, states } = meiosis.functionPatches.setup({
        stream: streamLib,
        app: { initial: { count: 0 }, services }
      });

      update(R.assoc("increment", 1));
      update(R.assoc("increment", 10));
      update(R.assoc("invalid", true));
      update(R.assoc("sequence", true));

      t.deepEqual(
        states(),
        { count: 1, combined: true, sequence: true, sequenced: true, received: true },
        "resulting state"
      );
      t.end();
    });

    t.test(label + " / services run on initial state", t => {
      const services = [
        ({ state }) =>
          state.increment > 0 && state.increment < 10
            ? { state: R.over(R.lensProp("count"), R.add(1)) }
            : null
      ];

      const { states } = meiosis.functionPatches.setup({
        stream: streamLib,
        app: { initial: { count: 0, increment: 1 }, services }
      });

      t.deepEqual(states(), { count: 1, increment: 1 }, "resulting state");
      t.end();
    });

    t.test(label + " / services and actions", t => {
      const Actions = update => ({
        increment: amount => update(R.over(R.lensProp("count"), R.add(amount)))
      });

      const services = [
        ({ state }) => {
          // update from one service should not affect state seen by the other
          if (state.count === 1) {
            return { next: ({ actions }) => actions.increment(1) };
          }
        },
        ({ state }) => {
          if (state.count === 1 && !state.service) {
            return { next: ({ update }) => update(R.assoc("service", true)) };
          }
        }
      ];

      const { update, states, actions } = meiosis.functionPatches.setup({
        stream: streamLib,
        app: { initial: { count: 0 }, services, Actions }
      });

      t.ok(typeof actions.increment === "function", "actions");

      update(R.assoc("count", 1));

      t.deepEqual(states(), { count: 2, service: true }, "resulting state");
      t.end();
    });

    t.test(label + " / actions can pass arrays to update", t => {
      const Actions = update => ({
        increment: amount =>
          update([R.over(R.lensProp("count"), R.add(amount)), R.assoc("combined", true)])
      });

      const { states, actions } = meiosis.functionPatches.setup({
        stream: streamLib,
        app: { initial: { count: 0 }, Actions }
      });

      actions.increment(1);

      t.deepEqual(states(), { count: 1, combined: true }, "combined patches");
      t.end();
    });

    t.test(label + " / service calls are combined into a single state update", t => {
      const services = [
        ({ state }) => {
          if (state.count === 1) {
            return { state: [R.assoc("count", 2), R.assoc("service1", true)] };
          }
        },
        // Services see previous changes
        ({ state }) => {
          if (state.count === 2) {
            return { state: R.assoc("service2", true) };
          }
        }
      ];

      const { update, states } = meiosis.functionPatches.setup({
        stream: streamLib,
        app: { services }
      });

      let ticks = 0;
      states.map(() => ticks++);

      update(R.assoc("count", 1));

      t.equal(ticks, 2, "number of ticks");
      t.deepEqual(states(), { count: 2, service1: true, service2: true }, "resulting state");
      t.end();
    });

    t.test(label + " / synchronous service updates", t => {
      let serviceCalls = 0;

      const services = [
        ({ state }) => {
          serviceCalls++;
          if (state.count === 1) {
            return {
              next: ({ update }) => {
                update(R.assoc("count", 2));
                update(R.assoc("service1", true));
              }
            };
          }
        },
        ({ state }) => {
          if (state.count === 1) {
            return { next: ({ update }) => update(R.assoc("service2", true)) };
          }
        }
      ];

      const { update, states } = meiosis.functionPatches.setup({
        stream: streamLib,
        app: { services }
      });

      update(R.assoc("count", 1));

      // Service calls: 1) initial, 2) update call, 3-4-5) update calls from services/next
      t.equal(serviceCalls, 5, "number of service calls");
      t.deepEqual(states(), { count: 2, service1: true, service2: true }, "resulting state");
      t.end();
    });

    t.test(label + " / services may not called in an infinite loop", t => {
      let serviceCalls = 0;

      const services = [
        ({ state }) => {
          if (state.count === 1 && serviceCalls < 5) {
            serviceCalls++;
            return { next: ({ update }) => update(R.assoc("service", true)) };
          }
        }
      ];

      const { update, states } = meiosis.functionPatches.setup({
        stream: streamLib,
        app: { services }
      });

      update(R.assoc("count", 1));

      t.equal(serviceCalls, 5, "number of service calls");
      t.deepEqual(states(), { count: 1, service: true }, "resulting state");
      t.end();
    });

    t.test(label + " / a service can change a patch", t => {
      const services = [
        ({ state }) => {
          if (state.one) {
            return { patch: R.assoc("two", true) };
          }
        }
      ];

      const { update, states } = meiosis.functionPatches.setup({
        stream: streamLib,
        app: { services }
      });

      update(R.assoc("one", true));

      t.deepEqual(states(), { two: true }, "resulting state");
      t.end();
    });

    t.test(label + " / a service can cancel a patch", t => {
      const services = [
        ({ state }) => {
          if (state.one) {
            return { patch: false };
          }
        }
      ];

      const { update, states } = meiosis.functionPatches.setup({
        stream: streamLib,
        app: { services }
      });

      let ticks = 0;
      states.map(() => ticks++);

      update(R.assoc("one", true));

      t.deepEqual(states(), {}, "resulting state");
      t.equal(ticks, 1, "number of ticks");
      t.end();
    });

    t.test(label + " / a service can cancel a render", t => {
      const services = [
        ({ state }) => {
          if (state.one) {
            return { render: false };
          }
        }
      ];

      const { update, states } = meiosis.functionPatches.setup({
        stream: streamLib,
        app: { services }
      });

      let ticks = 0;
      states.map(() => ticks++);

      update(R.assoc("one", true));

      t.deepEqual(states(), {}, "resulting state");
      t.equal(ticks, 1, "number of ticks");
      t.end();
    });

    t.test(label + " / a service can make a state change, cancel render, and call next", t => {
      const services = [
        ({ state, previousState }) => {
          if (state.one && !previousState.one) {
            return {
              state: R.assoc("two", true),
              render: false,
              next: ({ update }) => update(R.assoc("service", true))
            };
          }
        }
      ];

      const { update, states } = meiosis.functionPatches.setup({
        stream: streamLib,
        app: { services }
      });

      let ticks = 0;
      states.map(() => ticks++);

      update(R.assoc("one", true));

      t.deepEqual(states(), { one: true, two: true, service: true }, "resulting state");
      t.equal(ticks, 2, "number of ticks");
      t.end();
    });
  });
};

functionPatchTest(meiosis.simpleStream, "Meiosis simple-stream");
functionPatchTest(flyd, "flyd");
functionPatchTest(Stream, "mithril-stream");

const immerTest = (streamLib, label) => {
  label = "immer + " + label;

  test("immer setup", t => {
    t.test(label + " / minimal", t => {
      const { update, states } = meiosis.immer.setup({ stream: streamLib, produce });

      t.deepEqual(states(), {}, "initial state");

      update(state => {
        state.duck = { sound: "quack" };
      });
      update(state => {
        state.duck.color = "yellow";
      });

      t.deepEqual(states(), { duck: { sound: "quack", color: "yellow" } }, "resulting state");

      t.end();
    });

    t.test(label + " / initial state", t => {
      const { states } = meiosis.immer.setup({
        stream: streamLib,
        produce,
        app: { initial: { duck: "yellow" } }
      });

      t.deepEqual(states(), { duck: "yellow" }, "initial state");
      t.end();
    });

    t.test(label + " / initial state promise", t => {
      const Initial = () =>
        new Promise(resolve => {
          setTimeout(() => resolve({ duck: "yellow" }), 10);
        });

      const createApp = () => Initial().then(initial => ({ initial }));

      createApp().then(app => {
        const { states } = meiosis.immer.setup({ stream: streamLib, produce, app });

        t.deepEqual(states(), { duck: "yellow" }, "initial state");
        t.end();
      });
    });

    t.test(label + " / services", t => {
      const services = [
        ({ state }) =>
          state.increment > 0 &&
          state.increment < 10 && {
            state: draft => {
              draft.count++;
            }
          },
        ({ state }) =>
          (state.increment <= 0 || state.increment >= 10) && {
            state: draft => {
              delete draft.increment;
            }
          },
        ({ state }) =>
          state.invalid && {
            state: [
              draft => {
                delete draft.invalid;
              },
              draft => {
                draft.combined = true;
              }
            ]
          },
        ({ state }) =>
          state.sequence && {
            state: draft => {
              draft.sequenced = true;
            }
          },
        ({ state }) =>
          state.sequenced && {
            state: draft => {
              draft.received = true;
            }
          }
      ];

      const { update, states } = meiosis.immer.setup({
        stream: streamLib,
        produce,
        app: { initial: { count: 0 }, services }
      });

      update(state => {
        state.increment = 1;
      });
      update(state => {
        state.increment = 10;
      });
      update(state => {
        state.invalid = true;
      });
      update(state => {
        state.sequence = true;
      });

      t.deepEqual(
        states(),
        { count: 1, combined: true, sequence: true, sequenced: true, received: true },
        "resulting state"
      );
      t.end();
    });

    t.test(label + " / services run on initial state", t => {
      const services = [
        ({ state }) =>
          state.increment > 0 && state.increment < 10
            ? {
                state: draft => {
                  draft.count++;
                }
              }
            : null
      ];

      const { states } = meiosis.immer.setup({
        stream: streamLib,
        produce,
        app: { initial: { count: 0, increment: 1 }, services }
      });

      t.deepEqual(states(), { count: 1, increment: 1 }, "resulting state");
      t.end();
    });

    t.test(label + " / services and actions", t => {
      const Actions = update => ({
        increment: amount =>
          update(state => {
            state.count += amount;
          })
      });

      const services = [
        ({ state }) => {
          // update from one service should not affect state seen by the other
          if (state.count === 1) {
            return { next: ({ actions }) => actions.increment(1) };
          }
        },
        ({ state }) => {
          if (state.count === 1 && !state.service) {
            return {
              next: ({ update }) =>
                update(draft => {
                  draft.service = true;
                })
            };
          }
        }
      ];

      const { update, states, actions } = meiosis.immer.setup({
        stream: streamLib,
        produce,
        app: { initial: { count: 0 }, services, Actions }
      });

      t.ok(typeof actions.increment === "function", "actions");

      update(state => {
        state.count = 1;
      });

      t.deepEqual(states(), { count: 2, service: true }, "resulting state");
      t.end();
    });

    t.test(label + " / actions can pass an array to update", t => {
      const Actions = update => ({
        increment: amount =>
          update([
            state => {
              state.count += amount;
            },
            state => {
              state.combined = true;
            }
          ])
      });

      const { states, actions } = meiosis.immer.setup({
        stream: streamLib,
        produce,
        app: { initial: { count: 0 }, Actions }
      });

      actions.increment(1);

      t.deepEqual(states(), { count: 1, combined: true }, "combined patches");
      t.end();
    });

    t.test(label + " / service calls are combined into a single state update", t => {
      const services = [
        ({ state }) => {
          if (state.count === 1) {
            return {
              state: [
                draft => {
                  draft.count = 2;
                },
                draft => {
                  draft.service1 = true;
                }
              ]
            };
          }
        },
        // Services see previous changes
        ({ state }) => {
          if (state.count === 2) {
            return {
              state: draft => {
                draft.service2 = true;
              }
            };
          }
        }
      ];

      const { update, states } = meiosis.immer.setup({
        stream: streamLib,
        produce,
        app: { services }
      });

      let ticks = 0;
      states.map(() => ticks++);

      update(state => {
        state.count = 1;
      });

      t.equal(ticks, 2, "number of ticks");
      t.deepEqual(states(), { count: 2, service1: true, service2: true }, "resulting state");
      t.end();
    });

    t.test(label + " / synchronous service updates", t => {
      let serviceCalls = 0;

      const services = [
        ({ state }) => {
          serviceCalls++;
          if (state.count === 1) {
            return {
              next: ({ update }) => {
                update(draft => {
                  draft.count = 2;
                });
                update(draft => {
                  draft.service1 = true;
                });
              }
            };
          }
        },
        ({ state }) => {
          if (state.count === 1) {
            return {
              next: ({ update }) => {
                update(draft => {
                  draft.service2 = true;
                });
              }
            };
          }
        }
      ];

      const { update, states } = meiosis.immer.setup({
        stream: streamLib,
        produce,
        app: { services }
      });

      update(state => {
        state.count = 1;
      });

      // Service calls: 1) initial, 2) update call, 3-4-5) update calls from services/next
      t.equal(serviceCalls, 5, "number of service calls");
      t.deepEqual(states(), { count: 2, service1: true, service2: true }, "resulting state");
      t.end();
    });

    t.test(label + " / services may be called in an infinite loop", t => {
      let serviceCalls = 0;

      const services = [
        ({ state }) => {
          if (state.count === 1 && serviceCalls < 5) {
            serviceCalls++;
            return {
              next: ({ update }) =>
                update(draft => {
                  draft.service = true;
                })
            };
          }
        }
      ];

      const { update, states } = meiosis.immer.setup({
        stream: streamLib,
        produce,
        app: { services }
      });

      update(state => {
        state.count = 1;
      });

      t.equal(serviceCalls, 5, "number of service calls");
      t.deepEqual(states(), { count: 1, service: true }, "resulting state");
      t.end();
    });

    t.test(label + " / a service can change a patch", t => {
      const services = [
        ({ state }) => {
          if (state.one) {
            return {
              patch: draft => {
                draft.two = true;
              }
            };
          }
        }
      ];

      const { update, states } = meiosis.immer.setup({
        stream: streamLib,
        produce,
        app: { services }
      });

      update(draft => {
        draft.one = true;
      });

      t.deepEqual(states(), { two: true }, "resulting state");
      t.end();
    });

    t.test(label + " / a service can cancel a patch", t => {
      const services = [
        ({ state }) => {
          if (state.one) {
            return { patch: false };
          }
        }
      ];

      const { update, states } = meiosis.immer.setup({
        stream: streamLib,
        produce,
        app: { services }
      });

      let ticks = 0;
      states.map(() => ticks++);

      update(draft => {
        draft.one = true;
      });

      t.deepEqual(states(), {}, "resulting state");
      t.equal(ticks, 1, "number of ticks");
      t.end();
    });

    t.test(label + " / a service can cancel a render", t => {
      const services = [
        ({ state }) => {
          if (state.one) {
            return { render: false };
          }
        }
      ];

      const { update, states } = meiosis.immer.setup({
        stream: streamLib,
        produce,
        app: { services }
      });

      let ticks = 0;
      states.map(() => ticks++);

      update(draft => {
        draft.one = true;
      });

      t.deepEqual(states(), {}, "resulting state");
      t.equal(ticks, 1, "number of ticks");
      t.end();
    });

    t.test(label + " / a service can make a state change, cancel render, and call next", t => {
      const services = [
        ({ state, previousState }) => {
          if (state.one && !previousState.one) {
            return {
              state: draft => {
                draft.two = true;
              },
              render: false,
              next: ({ update }) =>
                update(draft => {
                  draft.service = true;
                })
            };
          }
        }
      ];

      const { update, states } = meiosis.immer.setup({
        stream: streamLib,
        produce,
        app: { services }
      });

      let ticks = 0;
      states.map(() => ticks++);

      update(draft => {
        draft.one = true;
      });

      t.deepEqual(states(), { one: true, two: true, service: true }, "resulting state");
      t.equal(ticks, 2, "number of ticks");
      t.end();
    });
  });
};

immerTest(meiosis.simpleStream, "Meiosis simple-stream");
immerTest(flyd, "flyd");
immerTest(Stream, "mithril-stream");

const commonTest = (streamLib, label) => {
  test("common setup", t => {
    t.test(label + " / required accumulator function", t => {
      try {
        meiosis.common.setup({ stream: streamLib, combine: x => x, app: {} });

        t.fail("An error should have been thrown for missing accumulator function.");
        t.end();
      } catch (err) {
        t.pass("Error was thrown as it should.");
        t.end();
      }
    });

    t.test(label + " / required combine function", t => {
      try {
        meiosis.common.setup({ stream: streamLib, accumulator: (x, f) => f(x), app: {} });

        t.fail("An error should have been thrown for missing combine function.");
        t.end();
      } catch (err) {
        t.pass("Error was thrown as it should.");
        t.end();
      }
    });

    t.test(label + " / basic common setup with no services", t => {
      const Actions = update => ({
        increment: amount => update({ count: x => x + amount })
      });

      const { states, actions } = meiosis.common.setup({
        stream: streamLib,
        accumulator: merge,
        combine: patches => patches,
        app: { initial: { count: 0 }, Actions }
      });

      t.ok(typeof actions.increment === "function", "actions");

      actions.increment(2);

      t.deepEqual(states(), { count: 2 }, "resulting state");
      t.end();
    });

    t.test(label + " / basic functionPatch setup with no services", t => {
      const Actions = update => ({
        increment: amount => update(R.over(R.lensProp("count"), R.add(amount)))
      });

      const { states, actions } = meiosis.common.setup({
        stream: streamLib,
        accumulator: (x, f) => f(x),
        combine: compose,
        app: { initial: { count: 0 }, Actions }
      });

      t.ok(typeof actions.increment === "function", "actions");

      actions.increment(2);

      t.deepEqual(states(), { count: 2 }, "resulting state");
      t.end();
    });
  });
};

commonTest(meiosis.simpleStream, "common + Meiosis simple-stream");
commonTest(flyd, "common + flyd");
commonTest(Stream, "common + mithril-stream");

test("simpleStream", t => {
  const s1 = meiosis.simpleStream.stream();
  const result = s1(42);
  t.equal(result, 42, "emitting value onto stream should return the value");
  t.end();
});
