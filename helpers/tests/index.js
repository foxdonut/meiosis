const test = require("tape");

const flyd = require("flyd");
const stream = require("mithril/stream");
const Oc = require("patchinko/constant");
const Oi = require("patchinko/immutable");
const R = require("ramda");

const meiosis = require("../dist/meiosis-helpers");

const patchinkoTest = (O, streamLib, label) => {
  test("patchinko setup", t => {
    t.test(label + " / minimal", t => {
      meiosis.patchinko.setup(streamLib, O).then(({ update, states }) => {
        t.deepEqual(states(), {}, "initial state");

        update({ duck: { sound: "quack" } });
        update({ duck: O({ color: "yellow" }) });

        t.deepEqual(states(), { duck: { sound: "quack", color: "yellow" } }, "resulting state");

        t.end();
      });
    });

    t.test(label + " / initial state", t => {
      meiosis.patchinko
        .setup(streamLib, O, { initial: () => ({ duck: "yellow" }) })
        .then(({ states }) => {
          t.deepEqual(states(), { duck: "yellow" }, "initial state");
          t.end();
        });
    });

    t.test(label + " / initial state promise", t => {
      const initialState = () =>
        new Promise(resolve => {
          setTimeout(() => resolve({ duck: "yellow" }), 10);
        });

      meiosis.patchinko.setup(streamLib, O, { initial: initialState }).then(({ states }) => {
        t.deepEqual(states(), { duck: "yellow" }, "initial state");
        t.end();
      });
    });

    t.test(label + " / acceptors", t => {
      const acceptors = [
        state => (state.increment > 0 && state.increment < 10 ? { count: O(x => x + 1) } : null),
        state => (state.increment <= 0 || state.increment >= 10 ? { increment: O } : null),
        state => (state.invalid ? { invalid: O } : null)
      ];

      meiosis.patchinko
        .setup(streamLib, O, { initial: () => ({ count: 0 }), acceptors })
        .then(({ update, states }) => {
          update({ increment: 1 });
          update({ increment: 10 });
          update({ invalid: true });

          t.deepEqual(states(), { count: 1 }, "resulting state");
          t.end();
        });
    });

    t.test(label + " / acceptors run on initial state", t => {
      const acceptors = [
        state => (state.increment > 0 && state.increment < 10 ? { count: O(x => x + 1) } : null)
      ];

      meiosis.patchinko
        .setup(streamLib, O, { initial: () => ({ count: 0, increment: 1 }), acceptors })
        .then(({ states }) => {
          t.deepEqual(states(), { count: 1, increment: 1 }, "resulting state");
          t.end();
        });
    });

    t.test(label + " / services and actions", t => {
      const actions = update => ({
        increment: amount => update({ count: O(x => x + amount) })
      });

      const services = [
        ({ state, actions }) => {
          /* update from one service should not affect state seen by the other */
          if (state.count === 1) {
            actions.increment(1);
          }
        },
        ({ state, update }) => {
          if (state.count === 1) {
            update({ service: true });
          }
        }
      ];

      meiosis.patchinko
        .setup(streamLib, O, { initial: () => ({ count: 0 }), services, actions })
        .then(({ update, states, actions }) => {
          t.ok(typeof actions.increment === "function", "actions");

          update({ count: 1 });

          t.deepEqual(states(), { count: 2, service: true }, "resulting state");
          t.end();
        });
    });

    t.test(label + " / service calls are combined into a single state update", t => {
      const services = [
        ({ state, update }) => {
          if (state.count === 1) {
            update({ count: 2 });
            update({ service1: true });
          }
        },
        ({ state, update }) => {
          if (state.count === 1) {
            update({ service2: true });
          }
        }
      ];

      meiosis.patchinko.setup(streamLib, O, { services }).then(({ update, states }) => {
        let ticks = 0;
        states.map(() => ticks++);

        update({ count: 1 });

        t.equal(ticks, 2, "number of ticks");
        t.deepEqual(states(), { count: 2, service1: true, service2: true }, "resulting state");
        t.end();
      });
    });
  });
};

patchinkoTest(Oc, flyd, "patchinko-constant + flyd");
patchinkoTest(Oi, flyd, "patchinko-immutable + flyd");
patchinkoTest(Oc, stream, "patchinko-constant + mithril-stream");
patchinkoTest(Oc, stream, "patchinko-immutable + mithril-stream");

const functionPatchTest = (streamLib, label) => {
  test("functionPatch setup", t => {
    t.test(label + " / minimal", t => {
      meiosis.functionPatches.setup(streamLib).then(({ update, states }) => {
        t.deepEqual(states(), {}, "initial state");

        update(() => ({ duck: { sound: "quack" } }));
        update(R.assocPath(["duck", "color"], "yellow"));

        t.deepEqual(states(), { duck: { sound: "quack", color: "yellow" } }, "resulting state");

        t.end();
      });
    });

    t.test(label + " / initial state", t => {
      meiosis.functionPatches
        .setup(streamLib, { initial: () => ({ duck: "yellow" }) })
        .then(({ states }) => {
          t.deepEqual(states(), { duck: "yellow" }, "initial state");
          t.end();
        });
    });

    t.test(label + " / initial state promise", t => {
      const initialState = () =>
        new Promise(resolve => {
          setTimeout(() => resolve({ duck: "yellow" }), 10);
        });

      meiosis.functionPatches.setup(streamLib, { initial: initialState }).then(({ states }) => {
        t.deepEqual(states(), { duck: "yellow" }, "initial state");
        t.end();
      });
    });

    t.test(label + " / acceptors", t => {
      const I = x => x;

      const acceptors = [
        state =>
          state.increment > 0 && state.increment < 10 ? R.over(R.lensProp("count"), R.add(1)) : I,

        state => (state.increment <= 0 || state.increment >= 10 ? R.dissoc("increment") : I),

        state => (state.invalid ? R.dissoc("invalid") : I)
      ];

      meiosis.functionPatches
        .setup(streamLib, { initial: () => ({ count: 0 }), acceptors })
        .then(({ update, states }) => {
          update(R.assoc("increment", 1));
          update(R.assoc("increment", 10));
          update(R.assoc("invalid", true));

          t.deepEqual(states(), { count: 1 }, "resulting state");
          t.end();
        });
    });

    t.test(label + " / acceptors run on initial state", t => {
      const I = x => x;

      const acceptors = [
        state =>
          state.increment > 0 && state.increment < 10 ? R.over(R.lensProp("count"), R.add(1)) : I
      ];

      meiosis.functionPatches
        .setup(streamLib, { initial: () => ({ count: 0, increment: 1 }), acceptors })
        .then(({ states }) => {
          t.deepEqual(states(), { count: 1, increment: 1 }, "resulting state");
          t.end();
        });
    });

    t.test(label + " / services and actions", t => {
      const actions = update => ({
        increment: amount => update(R.over(R.lensProp("count"), R.add(amount)))
      });

      const services = [
        ({ state, actions }) => {
          /* update from one service should not affect state seen by the other */
          if (state.count === 1) {
            actions.increment(1);
          }
        },
        ({ state, update }) => {
          if (state.count === 1) {
            update(R.assoc("service", true));
          }
        }
      ];

      meiosis.functionPatches
        .setup(streamLib, { initial: () => ({ count: 0 }), services, actions })
        .then(({ update, states, actions }) => {
          t.ok(typeof actions.increment === "function", "actions");

          update(R.assoc("count", 1));

          t.deepEqual(states(), { count: 2, service: true }, "resulting state");
          t.end();
        });
    });

    t.test(label + " / service calls are combined into a single state update", t => {
      const services = [
        ({ state, update }) => {
          if (state.count === 1) {
            update(R.assoc("count", 2));
            update(R.assoc("service1", true));
          }
        },
        ({ state, update }) => {
          if (state.count === 1) {
            update(R.assoc("service2", true));
          }
        }
      ];

      meiosis.functionPatches.setup(streamLib, { services }).then(({ update, states }) => {
        let ticks = 0;
        states.map(() => ticks++);

        update(R.assoc("count", 1));

        t.equal(ticks, 2, "number of ticks");
        t.deepEqual(states(), { count: 2, service1: true, service2: true }, "resulting state");
        t.end();
      });
    });
  });
};

functionPatchTest(flyd, "functionPatch + flyd");
functionPatchTest(stream, "functionPatch + mithril-stream");
