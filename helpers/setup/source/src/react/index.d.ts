import { Stream } from "../common";

export interface ReactFunctions {
  createElement: any;
  useState: any;
}

export interface ReactSetup {
  React: ReactFunctions;
  Root: any;
}

export interface ReactAppProps<S, P, A> {
  states: Stream<S>;
  update?: Stream<P>;
  actions?: A;
}

declare function _default<S, P, A>(setup: ReactSetup): (props: ReactAppProps<S, P, A>) => any;

export default _default;
