/*global expect*/
import { sum } from "../src/index";

test("adds 40 + 2 to equal 42", () => {
  expect(sum(40)(2)).toBe(42);
});
