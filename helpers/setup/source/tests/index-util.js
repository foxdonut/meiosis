/* eslint-env jest */

import meiosis from "../src/index";

describe("util", () => {
  test("get", () => {
    expect(meiosis.util.get(null, ["a", "b"])).toBeUndefined();
    expect(meiosis.util.get(undefined, ["a", "b"])).toBeUndefined();
    expect(meiosis.util.get({}, ["a", "b"])).toBeUndefined();
    expect(meiosis.util.get({ a: 42 }, ["a", "b"])).toBeUndefined();
    expect(meiosis.util.get({ a: { b: 42 } }, ["a", "b"])).toEqual(42);
  });
});
