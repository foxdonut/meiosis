import { Stream } from "../common";

interface ReactFunctions {
  createElement: any;
  useState: any;
}

interface ReactSetup {
  React: ReactFunctions;
  Root: any;
}

interface AppProps<S, P, A> {
  states: Stream<S>;
  update?: Stream<P>;
  actions?: A;
}

declare function _default<S, P, A>(
  setup: ReactSetup
): (props: AppProps<S, P, A>) => any;

export default _default;
