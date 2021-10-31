// import { Stream } from "../common";
import { ReactElement } from "react";

/**
 * Functions present on the React object.
 */
export interface ReactFunctions {
  /** The React `createElement` function. */
  createElement: any;

  /** The React `useState` function. */
  useState: any;
}

/**
 * Parameters for React setup.
 *
 * @template R the Root properties.
 * @template V the View type returned by the Root component.
 */
export interface ReactSetup<R> {
  /** The React object. */
  React: ReactFunctions;

  /** The root view component of the application. */
  Root: (props: R) => ReactElement;
}

/**
 * Helper to setup the Meiosis pattern with [React](https://reactjs.org/).
 *
 * @template S the State type.
 * @template R the Root properties.
 * @template V the View type returned by the Root component.
 *
 * @param {ReactSetup} setup the React setup, including `React` and `Root`.
 *
 * @returns an application component that accepts `states` and other props of your choice, and
 * passes `state` and your other props to the `Root` component.
 */
// declare function reactSetup<S, R, V>(
declare function reactSetup<R>(
  setup: ReactSetup<R>
  // ): (props: { states: Stream<S>; [k: string]: any }) => V;
): (props: { states: any; [k: string]: any }) => ReactElement;

export default reactSetup;
