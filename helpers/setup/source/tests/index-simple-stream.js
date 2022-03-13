/* eslint-env jest */

import merge from "mergerino";

import meiosis from "../src/index";

describe("simpleStream", () => {
  test("basic", () => {
    const s1 = meiosis.simpleStream.stream();
    const result = s1(42);
    expect(result).toEqual(42);
  });

  test("latest value", () => {
    const s1 = meiosis.simpleStream.stream();

    const f1 = x => {
      if (x === 10) {
        s1(20);
      }
    };

    s1.map(f1);

    const f2 = x => x;
    const s2 = s1.map(f2);

    const values = [];
    s2.map(value => values.push(value));

    s1(10);

    // Synchronous updates
    expect(values).toEqual([20, 20]);
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

    let c1 = 0;
    const d1 = s1.map(() => {
      c1++;
    });

    let c2 = 0;
    const d2 = s1.map(() => {
      c2++;
    });

    let c3 = 0;
    d2.map(() => {
      c3++;
    });

    let c4 = 0;
    s1.map(() => {
      c4++;
    });

    s1(1);
    expect(c1).toEqual(1);
    expect(c2).toEqual(1);
    expect(c3).toEqual(1);
    expect(c4).toEqual(1);

    d1.end();
    s1(1);
    expect(c1).toEqual(1);
    expect(c2).toEqual(2);
    expect(c3).toEqual(2);
    expect(c4).toEqual(2);

    d2.end();
    s1(1);
    expect(c1).toEqual(1);
    expect(c2).toEqual(2);
    expect(c3).toEqual(2);
    expect(c4).toEqual(3);

    s1.end();
    s1(1);
    expect(c1).toEqual(1);
    expect(c2).toEqual(2);
    expect(c3).toEqual(2);
    expect(c4).toEqual(3);
  });
});
