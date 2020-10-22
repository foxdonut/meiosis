import { Stream } from "../common";

interface PreactSetup {
  h: any;
  useState: any;
  Root: any;
}

interface AppProps<S, P, A> {
  states: Stream<S>;
  update?: Stream<P>;
  actions?: A;
}

declare function _default<S, P, A>(
  setup: PreactSetup
): (props: AppProps<S, P, A>) => any;

export default _default;
