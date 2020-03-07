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
        ({ state }) => (state.increment > 0 && state.increment < 10 ? { count: x => x + 1 } : null),
        ({ state }) =>
          state.increment <= 0 || state.increment >= 10 ? { increment: undefined } : null,
        ({ state }) => (state.invalid ? [{ invalid: undefined }, { combined: true }] : null),
        ({ state }) => (state.sequence ? { sequenced: true } : null),
        ({ state }) => (state.sequenced ? { received: true } : null)
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
        ({ state }) => (state.increment > 0 && state.increment < 10 ? { count: x => x + 1 } : null)
      ];

      const { states } = meiosis.mergerino.setup({
        stream: streamLib,
        merge,
        app: { initial: { count: 0, increment: 1 }, services }
      });

      let ticks = 0;
      states.map(() => ticks++);

      t.deepEqual(states(), { count: 1, increment: 1 }, "resulting state");
      t.equal(ticks, 1, "number of ticks");
      t.end();
    });

    t.test(label + " / effects and actions", t => {
      const Actions = update => ({
        increment: amount => update({ count: x => x + amount })
      });

      const effects = [
        ({ state, actions }) => {
          // effect should not affect state seen by the other
          if (state.count === 1) {
            actions.increment(1);
          }
        },
        ({ state, update }) => {
          if (state.count === 1 && !state.service) {
            update({ service: true });
          }
        }
      ];

      const { update, states, actions } = meiosis.mergerino.setup({
        stream: streamLib,
        merge,
        app: { initial: { count: 0 }, effects, Actions }
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

    t.test(label + " / an action can call another action", t => {
      const Actions1 = update => ({
        increment: () => update({ count: x => x + 1 })
      });

      const Actions2 = update => ({
        interact: function() {
          update({ interaction: true });
          this.increment();
        }
      });

      const Actions = update => Object.assign({}, Actions1(update), Actions2(update));

      const { states, actions } = meiosis.mergerino.setup({
        stream: streamLib,
        merge,
        app: { initial: { count: 0 }, Actions }
      });

      actions.interact();

      t.deepEqual(states(), { count: 1, interaction: true }, "action calling another action");
      t.end();
    });

    t.test(label + " / service calls are combined into a single state update", t => {
      const services = [
        ({ state }) => {
          if (state.count === 1) {
            return [{ count: x => x + 1 }, { service1: true }];
          }
        },
        // Services see previous changes
        ({ state }) => {
          if (state.count === 2) {
            return { service2: true };
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

    t.test(label + " / synchronous effect updates", t => {
      let effectCalls = 0;

      const effects = [
        ({ state, update }) => {
          effectCalls++;
          if (state.count === 1) {
            update({ count: x => x + 1 });
            update({ effect1: true });
          }
        },
        ({ state }) => {
          if (state.count === 1) {
            update({ effect2: true });
          }
        }
      ];

      const { update, states } = meiosis.mergerino.setup({
        stream: streamLib,
        merge,
        app: { effects }
      });

      update({ count: 1 });

      // effect calls: 1) initial, 2) update call, 3-4-5) update calls from effects
      t.equal(effectCalls, 5, "number of effect calls");
      t.deepEqual(states(), { count: 2, effect1: true, effect2: true }, "resulting state");
      t.end();
    });

    t.test(label + " / effects may be called in an infinite loop", t => {
      let effectCalls = 0;

      const effects = [
        ({ state, update }) => {
          if (state.count === 1 && effectCalls < 5) {
            effectCalls++;
            update({ effect: true });
          }
        }
      ];

      const { update, states } = meiosis.mergerino.setup({
        stream: streamLib,
        merge,
        app: { effects }
      });

      update({ count: 1 });

      t.equal(effectCalls, 5, "number of effect calls");
      t.deepEqual(states(), { count: 1, effect: true }, "resulting state");
      t.end();
    });

    t.test(label + " / a service can change a patch", t => {
      const services = [
        ({ patch, previousState }) => {
          if (patch && patch.one) {
            return [() => previousState, { two: true }];
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
        ({ patch, previousState }) => {
          if (patch && patch.one) {
            return () => previousState;
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
        ({ patch, previousState }) => {
          if (patch && patch.one) {
            return () => previousState;
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

    t.test(label + " / a service and an effect", t => {
      const services = [
        ({ patch }) => {
          if (patch && patch.one) {
            return { two: true };
          }
        }
      ];

      const effects = [
        ({ update, patch }) => {
          if (patch && patch.one) {
            update({ effect: true });
          }
        }
      ];

      const { update, states } = meiosis.mergerino.setup({
        stream: streamLib,
        merge,
        app: { services, effects }
      });

      let ticks = 0;
      states.map(() => ticks++);

      update({ one: true });

      t.deepEqual(states(), { one: true, two: true, effect: true }, "resulting state");
      t.equal(ticks, 3, "number of ticks");
      t.end();
    });

    t.test(label + " / a guard can cancel a sequence", t => {
      const guards = [
        ({ patch }) => {
          return !patch.one;
        }
      ];

      const services = [
        ({ patch }) => {
          if (patch && patch.one) {
            return { two: true };
          }
        }
      ];

      const effects = [
        ({ update, patch }) => {
          if (patch && patch.one) {
            update({ effect: true });
          }
        }
      ];

      const recovers = [
        ({ update, patch, invalidState }) => {
          if (patch && patch.one) {
            update({ recover: true, valid: !invalidState });
          }
        }
      ];

      const { update, states } = meiosis.mergerino.setup({
        stream: streamLib,
        merge,
        app: { guards, services, effects, recovers }
      });

      let ticks = 0;
      states.map(() => ticks++);

      update({ one: true });

      t.deepEqual(states(), { recover: true, valid: false }, "resulting state");
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
            ? R.over(R.lensProp("count"), R.add(1))
            : null,

        ({ state }) =>
          state.increment <= 0 || state.increment >= 10 ? R.dissoc("increment") : null,
        ({ state }) => (state.invalid ? [R.dissoc("invalid"), R.assoc("combined", true)] : null),
        ({ state }) => (state.sequence ? R.assoc("sequenced", true) : null),
        ({ state }) => (state.sequenced ? R.assoc("received", true) : null)
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
          state.increment > 0 && state.increment < 10 ? R.over(R.lensProp("count"), R.add(1)) : null
      ];

      const { states } = meiosis.functionPatches.setup({
        stream: streamLib,
        app: { initial: { count: 0, increment: 1 }, services }
      });

      let ticks = 0;
      states.map(() => ticks++);

      t.deepEqual(states(), { count: 1, increment: 1 }, "resulting state");
      t.equal(ticks, 1, "number of ticks");
      t.end();
    });

    t.test(label + " / effects and actions", t => {
      const Actions = update => ({
        increment: amount => update(R.over(R.lensProp("count"), R.add(amount)))
      });

      const effects = [
        ({ state, actions }) => {
          // effect should not affect state seen by the other
          if (state.count === 1) {
            actions.increment(1);
          }
        },
        ({ state, update }) => {
          if (state.count === 1 && !state.service) {
            update(R.assoc("service", true));
          }
        }
      ];

      const { update, states, actions } = meiosis.functionPatches.setup({
        stream: streamLib,
        app: { initial: { count: 0 }, effects, Actions }
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

    t.test(label + " / an action can call another action", t => {
      const Actions1 = update => ({
        increment: () => update(R.over(R.lensProp("count"), R.add(1)))
      });

      const Actions2 = update => ({
        interact: function() {
          update(R.assoc("interaction", true));
          this.increment();
        }
      });

      const Actions = update => Object.assign({}, Actions1(update), Actions2(update));

      const { states, actions } = meiosis.mergerino.setup({
        stream: streamLib,
        merge,
        app: { initial: { count: 0 }, Actions }
      });

      actions.interact();

      t.deepEqual(states(), { count: 1, interaction: true }, "action calling another action");
      t.end();
    });

    t.test(label + " / service calls are combined into a single state update", t => {
      const services = [
        ({ state }) => {
          if (state.count === 1) {
            return [R.assoc("count", 2), R.assoc("service1", true)];
          }
        },
        // Services see previous changes
        ({ state }) => {
          if (state.count === 2) {
            return R.assoc("service2", true);
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

    t.test(label + " / synchronous effect updates", t => {
      let effectCalls = 0;

      const effects = [
        ({ state, update }) => {
          effectCalls++;
          if (state.count === 1) {
            update(R.assoc("count", 2));
            update(R.assoc("effect1", true));
          }
        },
        ({ state, update }) => {
          if (state.count === 1) {
            update(R.assoc("effect2", true));
          }
        }
      ];

      const { update, states } = meiosis.functionPatches.setup({
        stream: streamLib,
        app: { effects }
      });

      update(R.assoc("count", 1));

      // effect calls: 1) initial, 2) update call, 3-4-5) update calls from effects
      t.equal(effectCalls, 5, "number of effect calls");
      t.deepEqual(states(), { count: 2, effect1: true, effect2: true }, "resulting state");
      t.end();
    });

    t.test(label + " / effects may be called in an infinite loop", t => {
      let effectCalls = 0;

      const effects = [
        ({ state, update }) => {
          if (state.count === 1 && effectCalls < 5) {
            effectCalls++;
            update(R.assoc("effect", true));
          }
        }
      ];

      const { update, states } = meiosis.functionPatches.setup({
        stream: streamLib,
        app: { effects }
      });

      update(R.assoc("count", 1));

      t.equal(effectCalls, 5, "number of effect calls");
      t.deepEqual(states(), { count: 1, effect: true }, "resulting state");
      t.end();
    });

    t.test(label + " / a service can change a patch", t => {
      const services = [
        ({ state, previousState }) => {
          if (state.one) {
            return [R.always(previousState), R.assoc("two", true)];
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
        ({ state, previousState }) => {
          if (state.one) {
            return R.always(previousState);
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
        ({ state, previousState }) => {
          if (state.one) {
            return R.always(previousState);
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

    t.test(label + " / a service and an effect", t => {
      const services = [
        ({ state, previousState }) => {
          if (state.one && !previousState.one) {
            return R.assoc("two", true);
          }
        }
      ];

      const effects = [
        ({ state, previousState, update }) => {
          if (state.one && !previousState.one) {
            update(R.assoc("effect", true));
          }
        }
      ];

      const { update, states } = meiosis.functionPatches.setup({
        stream: streamLib,
        app: { services, effects }
      });

      let ticks = 0;
      states.map(() => ticks++);

      update(R.assoc("one", true));

      t.deepEqual(states(), { one: true, two: true, effect: true }, "resulting state");
      t.equal(ticks, 3, "number of ticks");
      t.end();
    });

    t.test(label + " / a guard can cancel a sequence", t => {
      const guards = [
        ({ state, previousState }) => {
          return !(state.one && !previousState.one);
        }
      ];

      const services = [
        ({ state, previousState }) => {
          if (state.one && !previousState.one) {
            return R.assoc("two", true);
          }
        }
      ];

      const effects = [
        ({ update, state, previousState }) => {
          if (state.one && !previousState.one) {
            update(R.assoc("effect", true));
          }
        }
      ];

      const recovers = [
        ({ previousState, invalidState, update }) => {
          if (invalidState && invalidState.one && !previousState.one) {
            update([R.assoc("recover", true), R.assoc("valid", !invalidState)]);
          }
        }
      ];

      const { update, states } = meiosis.functionPatches.setup({
        stream: streamLib,
        app: { guards, services, effects, recovers }
      });

      let ticks = 0;
      states.map(() => ticks++);

      update(R.assoc("one", true));

      t.deepEqual(states(), { recover: true, valid: false }, "resulting state");
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
          state.increment < 10 &&
          (draft => {
            draft.count++;
          }),
        ({ state }) =>
          (state.increment <= 0 || state.increment >= 10) &&
          (draft => {
            delete draft.increment;
          }),
        ({ state }) =>
          state.invalid && [
            draft => {
              delete draft.invalid;
            },
            draft => {
              draft.combined = true;
            }
          ],
        ({ state }) =>
          state.sequence &&
          (draft => {
            draft.sequenced = true;
          }),
        ({ state }) =>
          state.sequenced &&
          (draft => {
            draft.received = true;
          })
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
            ? draft => {
                draft.count++;
              }
            : null
      ];

      const { states } = meiosis.immer.setup({
        stream: streamLib,
        produce,
        app: { initial: { count: 0, increment: 1 }, services }
      });

      let ticks = 0;
      states.map(() => ticks++);

      t.deepEqual(states(), { count: 1, increment: 1 }, "resulting state");
      t.equal(ticks, 1, "number of ticks");
      t.end();
    });

    t.test(label + " / effects and actions", t => {
      const Actions = update => ({
        increment: amount =>
          update(state => {
            state.count += amount;
          })
      });

      const effects = [
        ({ state, actions }) => {
          // effect should not affect state seen by the other
          if (state.count === 1) {
            actions.increment(1);
          }
        },
        ({ state, update }) => {
          if (state.count === 1 && !state.service) {
            update(draft => {
              draft.service = true;
            });
          }
        }
      ];

      const { update, states, actions } = meiosis.immer.setup({
        stream: streamLib,
        produce,
        app: { initial: { count: 0 }, effects, Actions }
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

    t.test(label + " / an action can call another action", t => {
      const Actions1 = update => ({
        increment: () =>
          update(state => {
            state.count++;
          })
      });

      const Actions2 = update => ({
        interact: function() {
          update(state => {
            state.interaction = true;
          });
          this.increment();
        }
      });

      const Actions = update => Object.assign({}, Actions1(update), Actions2(update));

      const { states, actions } = meiosis.immer.setup({
        stream: streamLib,
        produce,
        app: { initial: { count: 0 }, Actions }
      });

      actions.interact();

      t.deepEqual(states(), { count: 1, interaction: true }, "action calling another action");
      t.end();
    });

    t.test(label + " / service calls are combined into a single state update", t => {
      const services = [
        ({ state }) => {
          if (state.count === 1) {
            return [
              draft => {
                draft.count = 2;
              },
              draft => {
                draft.service1 = true;
              }
            ];
          }
        },
        // Services see previous changes
        ({ state }) => {
          if (state.count === 2) {
            return draft => {
              draft.service2 = true;
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

    t.test(label + " / synchronous effect updates", t => {
      let effectCalls = 0;

      const effects = [
        ({ state, update }) => {
          effectCalls++;
          if (state.count === 1) {
            update(draft => {
              draft.count = 2;
            });
            update(draft => {
              draft.effect1 = true;
            });
          }
        },
        ({ state, update }) => {
          if (state.count === 1) {
            update(draft => {
              draft.effect2 = true;
            });
          }
        }
      ];

      const { update, states } = meiosis.immer.setup({
        stream: streamLib,
        produce,
        app: { effects }
      });

      update(state => {
        state.count = 1;
      });

      // effect calls: 1) initial, 2) update call, 3-4-5) update calls from effects
      t.equal(effectCalls, 5, "number of effect calls");
      t.deepEqual(states(), { count: 2, effect1: true, effect2: true }, "resulting state");
      t.end();
    });

    t.test(label + " / effects may be called in an infinite loop", t => {
      let effectCalls = 0;

      const effects = [
        ({ state, update }) => {
          if (state.count === 1 && effectCalls < 5) {
            effectCalls++;
            update(draft => {
              draft.effect = true;
            });
          }
        }
      ];

      const { update, states } = meiosis.immer.setup({
        stream: streamLib,
        produce,
        app: { effects }
      });

      update(state => {
        state.count = 1;
      });

      t.equal(effectCalls, 5, "number of effect calls");
      t.deepEqual(states(), { count: 1, effect: true }, "resulting state");
      t.end();
    });

    t.test(label + " / a service can change a patch", t => {
      const services = [
        ({ state, previousState }) => {
          if (state.one) {
            return [
              () => previousState,
              draft => {
                draft.two = true;
              }
            ];
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
        ({ state, previousState }) => {
          if (state.one) {
            return () => previousState;
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
        ({ state, previousState }) => {
          if (state.one) {
            return () => previousState;
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

    t.test(label + " / a service and an effect", t => {
      const services = [
        ({ state, previousState }) => {
          if (state.one && !previousState.one) {
            return draft => {
              draft.two = true;
            };
          }
        }
      ];

      const effects = [
        ({ state, previousState, update }) => {
          if (state.two && !previousState.two) {
            update(draft => {
              draft.effect = true;
            });
          }
        }
      ];

      const { update, states } = meiosis.immer.setup({
        stream: streamLib,
        produce,
        app: { services, effects }
      });

      let ticks = 0;
      states.map(() => ticks++);

      update(draft => {
        draft.one = true;
      });

      t.deepEqual(states(), { one: true, two: true, effect: true }, "resulting state");
      t.equal(ticks, 3, "number of ticks");
      t.end();
    });

    t.test(label + " / a guard can cancel a sequence", t => {
      const guards = [
        ({ state, previousState }) => {
          return !(state.one && !previousState.one);
        }
      ];

      const services = [
        ({ state, previousState }) => {
          if (state.one && !previousState.one) {
            return draft => {
              draft.two = true;
            };
          }
        }
      ];

      const effects = [
        ({ update, state, previousState }) => {
          if (state.one && !previousState.one) {
            update(draft => {
              draft.effect = true;
            });
          }
        }
      ];

      const recovers = [
        ({ previousState, invalidState, update }) => {
          if (invalidState && invalidState.one && !previousState.one) {
            update(draft => {
              draft.recover = true;
              draft.valid = !invalidState;
            });
          }
        }
      ];

      const { update, states } = meiosis.immer.setup({
        stream: streamLib,
        produce,
        app: { guards, services, effects, recovers }
      });

      let ticks = 0;
      states.map(() => ticks++);

      update(draft => {
        draft.one = true;
      });

      t.deepEqual(states(), { recover: true, valid: false }, "resulting state");
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
