import { Stream } from "../common";

export interface PreactSetup {
  h: any;
  useState: any;
  Root: any;
}

export interface PreactAppProps<S, P, A> {
  states: Stream<S>;
  update?: Stream<P>;
  actions?: A;
}

/**
 * Helper to setup the Meiosis pattern with [Preact](https://preactjs.com/).
 */
declare function _default<S, P, A>(setup: PreactSetup): (props: PreactAppProps<S, P, A>) => any;

export default _default;
