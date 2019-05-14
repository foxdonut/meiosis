const test = require("tape");

const flyd = require("flyd");
const Stream = require("mithril/stream");
const Oc = require("patchinko/constant");
const Oi = require("patchinko/immutable");
// eslint-disable-next-line no-global-assign
window = {};
require("mergerino");
const merge = window.mergerino;
const { SUB, DEL } = merge;
const R = require("ramda");
const { produce } = require("immer");

const meiosis = require("../dist/meiosis-setup");

const patchinkoTest = (O, streamLib, label) => {
  test("patchinko setup", t => {
    t.test(label + " / minimal", t => {
      meiosis.patchinko.setup({ stream: streamLib, O }).then(({ update, states }) => {
        t.deepEqual(states(), {}, "initial state");

        update({ duck: { sound: "quack" } });
        update({ duck: O({ color: "yellow" }) });

        t.deepEqual(states(), { duck: { sound: "quack", color: "yellow" } }, "resulting state");

        t.end();
      });
    });

    t.test(label + " / initial state", t => {
      meiosis.patchinko
        .setup({ stream: streamLib, O, app: { Initial: () => ({ duck: "yellow" }) } })
        .then(({ states }) => {
          t.deepEqual(states(), { duck: "yellow" }, "initial state");
          t.end();
        });
    });

    t.test(label + " / initial state promise", t => {
      const Initial = () =>
        new Promise(resolve => {
          setTimeout(() => resolve({ duck: "yellow" }), 10);
        });

      meiosis.patchinko.setup({ stream: streamLib, O, app: { Initial } }).then(({ states }) => {
        t.deepEqual(states(), { duck: "yellow" }, "initial state");
        t.end();
      });
    });

    t.test(label + " / acceptors", t => {
      const acceptors = [
        state => (state.increment > 0 && state.increment < 10 ? { count: O(x => x + 1) } : null),
        state => (state.increment <= 0 || state.increment >= 10 ? { increment: O } : null),
        state => (state.invalid ? [{ invalid: O }, { combined: true }] : null),
        state => (state.sequence ? { sequenced: true } : null),
        state => (state.sequenced ? { received: true } : null)
      ];

      meiosis.patchinko
        .setup({ stream: streamLib, O, app: { Initial: () => ({ count: 0 }), acceptors } })
        .then(({ update, states }) => {
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
    });

    t.test(label + " / acceptors run on initial state", t => {
      const acceptors = [
        state => (state.increment > 0 && state.increment < 10 ? { count: O(x => x + 1) } : null)
      ];

      meiosis.patchinko
        .setup({
          stream: streamLib,
          O,
          app: { Initial: () => ({ count: 0, increment: 1 }), acceptors }
        })
        .then(({ states }) => {
          t.deepEqual(states(), { count: 1, increment: 1 }, "resulting state");
          t.end();
        });
    });

    t.test(label + " / services and actions", t => {
      const Actions = ({ update }) => ({
        increment: amount => update({ count: O(x => x + amount) })
      });

      const services = [
        ({ state, actions }) => {
          // update from one service should not affect state seen by the other
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
        .setup({ stream: streamLib, O, app: { Initial: () => ({ count: 0 }), services, Actions } })
        .then(({ update, states, actions }) => {
          t.ok(typeof actions.increment === "function", "actions");

          update({ count: 1 });

          t.deepEqual(states(), { count: 2, service: true }, "resulting state");
          t.end();
        });
    });

    t.test(label + " / actions can use combine", t => {
      const Actions = ({ update, combine }) => ({
        increment: amount => update(combine([{ count: O(x => x + amount) }, { combined: true }]))
      });

      meiosis.patchinko
        .setup({
          stream: streamLib,
          O,
          app: { Initial: () => ({ count: 0 }), Actions }
        })
        .then(({ states, actions }) => {
          actions.increment(1);

          t.deepEqual(states(), { count: 1, combined: true }, "combined patches");
          t.end();
        });
    });

    t.test(label + " / service calls are combined into a single state update", t => {
      const services = [
        ({ state, update }) => {
          if (state.count === 1) {
            update({ count: O(x => x + 1) });
            update({ service1: true });
          }
        },
        ({ state, update }) => {
          if (state.count === 1) {
            update({ service2: true });
          }
        }
      ];

      meiosis.patchinko
        .setup({ stream: streamLib, O, app: { services } })
        .then(({ update, states }) => {
          let ticks = 0;
          states.map(() => ticks++);

          update({ count: 1 });

          t.equal(ticks, 2, "number of ticks");
          t.deepEqual(states(), { count: 2, service1: true, service2: true }, "resulting state");
          t.end();
        });
    });

    t.test(label + " / synchronous service updates are combined into one", t => {
      let serviceCalls = 0;

      const services = [
        ({ state, update }) => {
          serviceCalls++;
          if (state.count === 1) {
            update({ count: O(x => x + 1) });
            update({ service1: true });
          }
        },
        ({ state, update }) => {
          if (state.count === 1) {
            update({ service2: true });
          }
        }
      ];

      meiosis.patchinko
        .setup({ stream: streamLib, O, app: { services } })
        .then(({ update, states }) => {
          update({ count: 1 });

          // Service calls: 1) initial, 2) update call
          t.equal(serviceCalls, 2, "number of service calls");
          t.deepEqual(states(), { count: 2, service1: true, service2: true }, "resulting state");
          t.end();
        });
    });

    t.test(label + " / services are not called in an infinite loop", t => {
      let serviceCalls = 0;

      const services = [
        ({ state, update }) => {
          if (state.count === 1) {
            serviceCalls++;
            update({ service: true });
          }
        }
      ];

      meiosis.patchinko
        .setup({ stream: streamLib, O, app: { services } })
        .then(({ update, states }) => {
          update({ count: 1 });

          t.equal(serviceCalls, 1, "number of service calls");
          t.deepEqual(states(), { count: 1, service: true }, "resulting state");
          t.end();
        });
    });
  });
};

patchinkoTest(Oc, meiosis.simpleStream, "patchinko-constant + Meiosis simple-stream");
patchinkoTest(Oi, meiosis.simpleStream, "patchinko-immutable + Meiosis simple-stream");
patchinkoTest(Oc, flyd, "patchinko-constant + flyd");
patchinkoTest(Oi, flyd, "patchinko-immutable + flyd");
patchinkoTest(Oc, Stream, "patchinko-constant + mithril-stream");
patchinkoTest(Oi, Stream, "patchinko-immutable + mithril-stream");

const mergerinoTest = (merge, streamLib, label) => {
  test("mergerino setup", t => {
    t.test(label + " / minimal", t => {
      meiosis.mergerino.setup({ stream: streamLib, merge }).then(({ update, states }) => {
        t.deepEqual(states(), {}, "initial state");

        update({ duck: { sound: "quack" } });
        update({ duck: { color: "yellow" } });

        t.deepEqual(states(), { duck: { sound: "quack", color: "yellow" } }, "resulting state");

        t.end();
      });
    });

    t.test(label + " / initial state", t => {
      meiosis.mergerino
        .setup({ stream: streamLib, merge, app: { Initial: () => ({ duck: "yellow" }) } })
        .then(({ states }) => {
          t.deepEqual(states(), { duck: "yellow" }, "initial state");
          t.end();
        });
    });

    t.test(label + " / initial state promise", t => {
      const Initial = () =>
        new Promise(resolve => {
          setTimeout(() => resolve({ duck: "yellow" }), 10);
        });

      meiosis.mergerino.setup({ stream: streamLib, merge, app: { Initial } }).then(({ states }) => {
        t.deepEqual(states(), { duck: "yellow" }, "initial state");
        t.end();
      });
    });

    t.test(label + " / acceptors", t => {
      const acceptors = [
        state => (state.increment > 0 && state.increment < 10 ? { count: SUB(x => x + 1) } : null),
        state => (state.increment <= 0 || state.increment >= 10 ? { increment: DEL } : null),
        state => (state.invalid ? [{ invalid: DEL }, { combined: true }] : null),
        state => (state.sequence ? { sequenced: true } : null),
        state => (state.sequenced ? { received: true } : null)
      ];

      meiosis.mergerino
        .setup({ stream: streamLib, merge, app: { Initial: () => ({ count: 0 }), acceptors } })
        .then(({ update, states }) => {
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
    });

    t.test(label + " / acceptors run on initial state", t => {
      const acceptors = [
        state => (state.increment > 0 && state.increment < 10 ? { count: SUB(x => x + 1) } : null)
      ];

      meiosis.mergerino
        .setup({
          stream: streamLib,
          merge,
          app: { Initial: () => ({ count: 0, increment: 1 }), acceptors }
        })
        .then(({ states }) => {
          t.deepEqual(states(), { count: 1, increment: 1 }, "resulting state");
          t.end();
        });
    });

    t.test(label + " / services and actions", t => {
      const Actions = ({ update }) => ({
        increment: amount => update({ count: SUB(x => x + amount) })
      });

      const services = [
        ({ state, actions }) => {
          // update from one service should not affect state seen by the other
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

      meiosis.mergerino
        .setup({
          stream: streamLib,
          merge,
          app: { Initial: () => ({ count: 0 }), services, Actions }
        })
        .then(({ update, states, actions }) => {
          t.ok(typeof actions.increment === "function", "actions");

          update({ count: 1 });

          t.deepEqual(states(), { count: 2, service: true }, "resulting state");
          t.end();
        });
    });

    t.test(label + " / actions can use combine", t => {
      const Actions = ({ update, combine }) => ({
        increment: amount => update(combine([{ count: SUB(x => x + amount) }, { combined: true }]))
      });

      meiosis.mergerino
        .setup({
          stream: streamLib,
          merge,
          app: { Initial: () => ({ count: 0 }), Actions }
        })
        .then(({ states, actions }) => {
          actions.increment(1);

          t.deepEqual(states(), { count: 1, combined: true }, "combined patches");
          t.end();
        });
    });

    t.test(label + " / service calls are combined into a single state update", t => {
      const services = [
        ({ state, update }) => {
          if (state.count === 1) {
            update({ count: SUB(x => x + 1) });
            update({ service1: true });
          }
        },
        ({ state, update }) => {
          if (state.count === 1) {
            update({ service2: true });
          }
        }
      ];

      meiosis.mergerino
        .setup({ stream: streamLib, merge, app: { services } })
        .then(({ update, states }) => {
          let ticks = 0;
          states.map(() => ticks++);

          update({ count: 1 });

          t.equal(ticks, 2, "number of ticks");
          t.deepEqual(states(), { count: 2, service1: true, service2: true }, "resulting state");
          t.end();
        });
    });

    t.test(label + " / synchronous service updates are combined into one", t => {
      let serviceCalls = 0;

      const services = [
        ({ state, update }) => {
          serviceCalls++;
          if (state.count === 1) {
            update({ count: SUB(x => x + 1) });
            update({ service1: true });
          }
        },
        ({ state, update }) => {
          if (state.count === 1) {
            update({ service2: true });
          }
        }
      ];

      meiosis.mergerino
        .setup({ stream: streamLib, merge, app: { services } })
        .then(({ update, states }) => {
          update({ count: 1 });

          // Service calls: 1) initial, 2) update call
          t.equal(serviceCalls, 2, "number of service calls");
          t.deepEqual(states(), { count: 2, service1: true, service2: true }, "resulting state");
          t.end();
        });
    });

    t.test(label + " / services are not called in an infinite loop", t => {
      let serviceCalls = 0;

      const services = [
        ({ state, update }) => {
          if (state.count === 1) {
            serviceCalls++;
            update({ service: true });
          }
        }
      ];

      meiosis.mergerino
        .setup({ stream: streamLib, merge, app: { services } })
        .then(({ update, states }) => {
          update({ count: 1 });

          t.equal(serviceCalls, 1, "number of service calls");
          t.deepEqual(states(), { count: 1, service: true }, "resulting state");
          t.end();
        });
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
      meiosis.functionPatches.setup({ stream: streamLib }).then(({ update, states }) => {
        t.deepEqual(states(), {}, "initial state");

        update(() => ({ duck: { sound: "quack" } }));
        update(R.assocPath(["duck", "color"], "yellow"));

        t.deepEqual(states(), { duck: { sound: "quack", color: "yellow" } }, "resulting state");

        t.end();
      });
    });

    t.test(label + " / initial state", t => {
      meiosis.functionPatches
        .setup({ stream: streamLib, app: { Initial: () => ({ duck: "yellow" }) } })
        .then(({ states }) => {
          t.deepEqual(states(), { duck: "yellow" }, "initial state");
          t.end();
        });
    });

    t.test(label + " / initial state promise", t => {
      const Initial = () =>
        new Promise(resolve => {
          setTimeout(() => resolve({ duck: "yellow" }), 10);
        });

      meiosis.functionPatches.setup({ stream: streamLib, app: { Initial } }).then(({ states }) => {
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
        state => (state.invalid ? [R.dissoc("invalid"), R.assoc("combined", true)] : I),
        state => (state.sequence ? R.assoc("sequenced", true) : I),
        state => (state.sequenced ? R.assoc("received", true) : I)
      ];

      meiosis.functionPatches
        .setup({ stream: streamLib, app: { Initial: () => ({ count: 0 }), acceptors } })
        .then(({ update, states }) => {
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
    });

    t.test(label + " / acceptors run on initial state", t => {
      const I = x => x;

      const acceptors = [
        state =>
          state.increment > 0 && state.increment < 10 ? R.over(R.lensProp("count"), R.add(1)) : I
      ];

      meiosis.functionPatches
        .setup({
          stream: streamLib,
          app: { Initial: () => ({ count: 0, increment: 1 }), acceptors }
        })
        .then(({ states }) => {
          t.deepEqual(states(), { count: 1, increment: 1 }, "resulting state");
          t.end();
        });
    });

    t.test(label + " / services and Actions", t => {
      const Actions = ({ update }) => ({
        increment: amount => update(R.over(R.lensProp("count"), R.add(amount)))
      });

      const services = [
        ({ state, actions }) => {
          // update from one service should not affect state seen by the other
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
        .setup({ stream: streamLib, app: { Initial: () => ({ count: 0 }), services, Actions } })
        .then(({ update, states, actions }) => {
          t.ok(typeof actions.increment === "function", "actions");

          update(R.assoc("count", 1));

          t.deepEqual(states(), { count: 2, service: true }, "resulting state");
          t.end();
        });
    });

    t.test(label + " / actions can use combine", t => {
      const Actions = ({ update, combine }) => ({
        increment: amount =>
          update(combine([R.over(R.lensProp("count"), R.add(amount)), R.assoc("combined", true)]))
      });

      meiosis.functionPatches
        .setup({
          stream: streamLib,
          app: { Initial: () => ({ count: 0 }), Actions }
        })
        .then(({ states, actions }) => {
          actions.increment(1);

          t.deepEqual(states(), { count: 1, combined: true }, "combined patches");
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

      meiosis.functionPatches
        .setup({ stream: streamLib, app: { services } })
        .then(({ update, states }) => {
          let ticks = 0;
          states.map(() => ticks++);

          update(R.assoc("count", 1));

          t.equal(ticks, 2, "number of ticks");
          t.deepEqual(states(), { count: 2, service1: true, service2: true }, "resulting state");
          t.end();
        });
    });

    t.test(label + " / synchronous service updates are combined into one", t => {
      let serviceCalls = 0;

      const services = [
        ({ state, update }) => {
          serviceCalls++;
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

      meiosis.functionPatches
        .setup({ stream: streamLib, app: { services } })
        .then(({ update, states }) => {
          update(R.assoc("count", 1));

          // Service calls: 1) initial, 2) update call
          t.equal(serviceCalls, 2, "number of service calls");
          t.deepEqual(states(), { count: 2, service1: true, service2: true }, "resulting state");
          t.end();
        });
    });

    t.test(label + " / services are not called in an infinite loop", t => {
      let serviceCalls = 0;

      const services = [
        ({ state, update }) => {
          if (state.count === 1) {
            serviceCalls++;
            update(R.assoc("service", true));
          }
        }
      ];

      meiosis.functionPatches
        .setup({ stream: streamLib, app: { services } })
        .then(({ update, states }) => {
          update(R.assoc("count", 1));

          t.equal(serviceCalls, 1, "number of service calls");
          t.deepEqual(states(), { count: 1, service: true }, "resulting state");
          t.end();
        });
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
      meiosis.immer.setup({ stream: streamLib, produce }).then(({ update, states }) => {
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
    });

    t.test(label + " / initial state", t => {
      meiosis.immer
        .setup({ stream: streamLib, produce, app: { Initial: () => ({ duck: "yellow" }) } })
        .then(({ states }) => {
          t.deepEqual(states(), { duck: "yellow" }, "initial state");
          t.end();
        });
    });

    t.test(label + " / initial state promise", t => {
      const Initial = () =>
        new Promise(resolve => {
          setTimeout(() => resolve({ duck: "yellow" }), 10);
        });

      meiosis.immer.setup({ stream: streamLib, produce, app: { Initial } }).then(({ states }) => {
        t.deepEqual(states(), { duck: "yellow" }, "initial state");
        t.end();
      });
    });

    t.test(label + " / acceptors", t => {
      const I = x => x;

      const acceptors = [
        state =>
          state.increment > 0 && state.increment < 10
            ? draft => {
                draft.count++;
              }
            : I,
        state =>
          state.increment <= 0 || state.increment >= 10
            ? draft => {
                delete draft.increment;
              }
            : I,
        state =>
          state.invalid
            ? [
                draft => {
                  delete draft.invalid;
                },
                draft => {
                  draft.combined = true;
                }
              ]
            : I,
        state =>
          state.sequence
            ? draft => {
                draft.sequenced = true;
              }
            : I,
        state =>
          state.sequenced
            ? draft => {
                draft.received = true;
              }
            : I
      ];

      meiosis.immer
        .setup({ stream: streamLib, produce, app: { Initial: () => ({ count: 0 }), acceptors } })
        .then(({ update, states }) => {
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
    });

    t.test(label + " / acceptors run on initial state", t => {
      const I = x => x;

      const acceptors = [
        state =>
          state.increment > 0 && state.increment < 10
            ? draft => {
                draft.count++;
              }
            : I
      ];

      meiosis.immer
        .setup({
          stream: streamLib,
          produce,
          app: { Initial: () => ({ count: 0, increment: 1 }), acceptors }
        })
        .then(({ states }) => {
          t.deepEqual(states(), { count: 1, increment: 1 }, "resulting state");
          t.end();
        });
    });

    t.test(label + " / services and Actions", t => {
      const Actions = ({ update }) => ({
        increment: amount =>
          update(state => {
            state.count += amount;
          })
      });

      const services = [
        ({ state, actions }) => {
          // update from one service should not affect state seen by the other
          if (state.count === 1) {
            actions.increment(1);
          }
        },
        ({ state, update }) => {
          if (state.count === 1) {
            update(draft => {
              draft.service = true;
            });
          }
        }
      ];

      meiosis.immer
        .setup({
          stream: streamLib,
          produce,
          app: { Initial: () => ({ count: 0 }), services, Actions }
        })
        .then(({ update, states, actions }) => {
          t.ok(typeof actions.increment === "function", "actions");

          update(state => {
            state.count = 1;
          });

          t.deepEqual(states(), { count: 2, service: true }, "resulting state");
          t.end();
        });
    });

    t.test(label + " / actions can use combine", t => {
      const Actions = ({ update, combine }) => ({
        increment: amount =>
          update(
            combine([
              state => {
                state.count += amount;
              },
              state => {
                state.combined = true;
              }
            ])
          )
      });

      meiosis.immer
        .setup({
          stream: streamLib,
          produce,
          app: { Initial: () => ({ count: 0 }), Actions }
        })
        .then(({ states, actions }) => {
          actions.increment(1);

          t.deepEqual(states(), { count: 1, combined: true }, "combined patches");
          t.end();
        });
    });

    t.test(label + " / service calls are combined into a single state update", t => {
      const services = [
        ({ state, update }) => {
          if (state.count === 1) {
            update(draft => {
              draft.count = 2;
            });
            update(draft => {
              draft.service1 = true;
            });
          }
        },
        ({ state, update }) => {
          if (state.count === 1) {
            update(draft => {
              draft.service2 = true;
            });
          }
        }
      ];

      meiosis.immer
        .setup({ stream: streamLib, produce, app: { services } })
        .then(({ update, states }) => {
          let ticks = 0;
          states.map(() => ticks++);

          update(state => {
            state.count = 1;
          });

          t.equal(ticks, 2, "number of ticks");
          t.deepEqual(states(), { count: 2, service1: true, service2: true }, "resulting state");
          t.end();
        });
    });

    t.test(label + " / synchronous service updates are combined into one", t => {
      let serviceCalls = 0;

      const services = [
        ({ state, update }) => {
          serviceCalls++;
          if (state.count === 1) {
            update(draft => {
              draft.count = 2;
            });
            update(draft => {
              draft.service1 = true;
            });
          }
        },
        ({ state, update }) => {
          if (state.count === 1) {
            update(draft => {
              draft.service2 = true;
            });
          }
        }
      ];

      meiosis.immer
        .setup({ stream: streamLib, produce, app: { services } })
        .then(({ update, states }) => {
          update(state => {
            state.count = 1;
          });

          // Service calls: 1) initial, 2) update call
          t.equal(serviceCalls, 2, "number of service calls");
          t.deepEqual(states(), { count: 2, service1: true, service2: true }, "resulting state");
          t.end();
        });
    });

    t.test(label + " / services are not called in an infinite loop", t => {
      let serviceCalls = 0;

      const services = [
        ({ state, update }) => {
          if (state.count === 1) {
            serviceCalls++;
            update(draft => {
              draft.service = true;
            });
          }
        }
      ];

      meiosis.immer
        .setup({ stream: streamLib, produce, app: { services } })
        .then(({ update, states }) => {
          update(state => {
            state.count = 1;
          });

          t.equal(serviceCalls, 1, "number of service calls");
          t.deepEqual(states(), { count: 1, service: true }, "resulting state");
          t.end();
        });
    });
  });
};

immerTest(meiosis.simpleStream, "Meiosis simple-stream");
immerTest(flyd, "flyd");
immerTest(Stream, "mithril-stream");

const commonTest = (streamLib, label) => {
  test("common setup", t => {
    t.test(label + " / required accumulator function", t => {
      const I = x => x;

      try {
        meiosis.common
          .setup({ stream: streamLib, combine: x => x, app: { acceptors: [() => I] } })
          .then(() => {
            t.fail("An error should have been thrown for missing accumulator function.");
            t.end();
          });
      } catch (err) {
        t.pass("Error was thrown as it should.");
        t.end();
      }
    });

    t.test(label + " / acceptors do not require a combine function", t => {
      const I = x => x;

      try {
        meiosis.common
          .setup({ stream: streamLib, accumulator: (x, f) => f(x), app: { acceptors: [() => I] } })
          .then(() => {
            t.pass("Acceptors without combine function works.");
            t.end();
          });
      } catch (err) {
        t.fail("No error should be thrown for acceptors without combine function.");
        t.end();
      }
    });

    t.test(label + " / services require combine function", t => {
      const I = x => x;

      try {
        meiosis.common
          .setup({ stream: streamLib, accumulator: (x, f) => f(x), app: { services: [() => I] } })
          .then(() => {
            t.fail("An error should have been thrown for missing combine function.");
            t.end();
          });
      } catch (err) {
        t.pass("Error was thrown as it should.");
        t.end();
      }
    });

    t.test(label + " / basic common setup with no acceptors/services", t => {
      const Actions = ({ update }) => ({
        increment: amount => update({ count: Oc(x => x + amount) })
      });

      meiosis.common
        .setup({
          stream: streamLib,
          accumulator: Oc,
          app: { Initial: () => ({ count: 0 }), Actions }
        })
        .then(({ states, actions }) => {
          t.ok(typeof actions.increment === "function", "actions");

          actions.increment(2);

          t.deepEqual(states(), { count: 2 }, "resulting state");
          t.end();
        });
    });

    t.test(label + " / basic functionPatch setup with no acceptors/services", t => {
      const Actions = ({ update }) => ({
        increment: amount => update(R.over(R.lensProp("count"), R.add(amount)))
      });

      meiosis.common
        .setup({
          stream: streamLib,
          accumulator: (x, f) => f(x),
          app: { Initial: () => ({ count: 0 }), Actions }
        })
        .then(({ states, actions }) => {
          t.ok(typeof actions.increment === "function", "actions");

          actions.increment(2);

          t.deepEqual(states(), { count: 2 }, "resulting state");
          t.end();
        });
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
