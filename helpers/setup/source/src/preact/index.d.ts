import { Stream } from "../common";

/**
 * Properties passed to the Preact application.
 *
 * @template S the State type.
 */
export interface PreactAppProps<S> {
  states: Stream<S>;
}

/**
 * Parameters for Preact setup.
 *
 * @template R the Root properties.
 * @template V the View type returned by the Root component.
 */
export interface PreactSetup<R, V> {
  /** The Preact `h` function. */
  h: any;

  /** The Preact `useState` function. */
  useState: any;

  /** The root view component of the application. */
  Root: (props: R) => V;
}

/**
 * Helper to setup the Meiosis pattern with [Preact](https://preactjs.com/).
 *
 * @template S the State type.
 * @template R the Root properties.
 * @template V the View type returned by the Root component.
 *
 * @param {PreactSetup} setup the Preact setup, including `h`, `useState`, and `Root`.
 *
 * @returns an application component that accepts `states` and other props of your choice, and
 * passes `state` and your other props to the `Root` component.
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
export function preactSetup<S, R, V>(setup: PreactSetup<R, V>): (props: PreactAppProps<S>) => any;

export default preactSetup;
