import { Stream } from "../common";

/**
 * Properties passed to the Preact application.
 *
 * @template S the State type.
 * @template P the Patch type.
 * @template A the Actions type.
 */
export interface PreactAppProps<S, P, A> {
  states: Stream<S>;
  update?: Stream<P>;
  actions?: A;
}

/**
 * Parameters for Preact setup.
 *
 * @template S the State type.
 * @template P the Patch type.
 * @template A the Actions type.
 */
export interface PreactSetup<S, P, A> {
  /** The Preact `h` function. */
  h: any;

  /** The Preact `useState` function. */
  useState: any;

  /** The root view component of the application. */
  Root: (props: PreactAppProps<S, P, A>) => any;
}

/**
 * Helper to setup the Meiosis pattern with [Preact](https://preactjs.com/).
 *
 * @template S the State type.
 * @template P the Patch type.
 * @template A the Actions type.
 *
 * @param {PreactSetup} setup the Preact setup, including `h`, `useState`, and `Root`.
 *
 * @returns an application component that accepts `states`, `update`, `actions` and passes `state`,
 * `update`, `actions` to the `Root` component.
 *
 * Example:
 *
 * ```javascript
 * import meiosis from "meiosis-setup";
 * import { h, render } from "preact";
 * import { useState } from "preact/hooks";
 *
 * // This does not have to be `meiosis.mergerino.setup`, it could be
 * // `meiosis.functionPatches.setup`, `meiosis.immer.setup`, `meiosis.common.setup`,
 * // or even your own setup code.
 * const { states, update, actions } = meiosis.mergerino.setup({ ... });
 *
 * const Root = ({ state, update, actions }) => (
 *   <div>...</div>
 * )
 *
 * const App = meiosis.preact.setup({ h, useState, Root });
 * const element = document.getElementById("app");
 * render(<App states="states" update="update" actions="actions"/>, element);
 * ```
 */
export function preactSetup<S, P, A>(
  setup: PreactSetup<S, P, A>
): (props: PreactAppProps<S, P, A>) => any;

export default preactSetup;
