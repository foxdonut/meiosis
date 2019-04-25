const test = require("tape");

const flyd = require("flyd");
const stream = require("mithril/stream");
const O = require("patchinko/constant");

const meiosis = require("../dist/meiosis-helpers");

test("patchinko", t => {
  t.test("setup", t => {
    t.test("flyd", t => {
      t.test("minimal", t => {
        meiosis.patchinko
          .setup({
            O,
            stream: flyd
          })
          .then(({ update, states }) => {
            t.deepEqual(states(), {});

            update({ duck: { sound: "quack" } });
            update({ duck: O({ color: "yellow" }) });

            t.deepEqual(states(), { duck: { sound: "quack", color: "yellow" } });

            t.end();
          });
      });

      t.test("initial state", t => {
        meiosis.patchinko
          .setup({ O, stream: flyd, initial: () => ({ duck: "yellow" }) })
          .then(({ states }) => {
            t.deepEqual(states(), { duck: "yellow" });
            t.end();
          });
      });

      t.test("initial state promise", t => {
        const initialState = () =>
          new Promise(resolve => {
            setTimeout(() => resolve({ duck: "yellow" }), 10);
          });

        meiosis.patchinko.setup({ O, stream: flyd, initial: initialState }).then(({ states }) => {
          t.deepEqual(states(), { duck: "yellow" });
          t.end();
        });
      });

      t.test("acceptors", t => {
        const acceptors = [
          state => (state.increment > 0 && state.increment < 10 ? { count: O(x => x + 1) } : null),
          state => (state.increment <= 0 || state.increment >= 10 ? { increment: O } : null),
          state => (state.invalid ? { invalid: O } : null)
        ];

        meiosis.patchinko
          .setup({ O, stream: flyd, initial: () => ({ count: 0 }), acceptors })
          .then(({ update, states }) => {
            update({ increment: 1 });
            update({ increment: 10 });
            update({ invalid: true });

            t.deepEqual(states(), { count: 1 });
            t.end();
          });
      });

      t.test("services and actions", t => {
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
          .setup({ O, stream: flyd, initial: () => ({ count: 0 }), services, actions })
          .then(({ update, states, actions }) => {
            t.ok(typeof actions.increment === "function");

            update({ count: 1 });

            t.deepEqual(states(), { count: 2, service: true });
            t.end();
          });
      });
    });

    t.test("mithril-stream", t => {
      t.test("minimal", t => {
        meiosis.patchinko
          .setup({
            O,
            stream
          })
          .then(({ update, states }) => {
            t.deepEqual(states(), {});

            update({ duck: { sound: "quack" } });
            update({ duck: O({ color: "yellow" }) });

            t.deepEqual(states(), { duck: { sound: "quack", color: "yellow" } });

            t.end();
          });
      });
    });
  });
});
