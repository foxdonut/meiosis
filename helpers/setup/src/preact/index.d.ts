import { Stream } from "../common";
import { h, AnyComponent, JSX } from "preact";
import { useState } from "preact/hooks";

interface RootProps<S, P, A> {
  state: S;
  update?: Stream<P>;
  actions?: A;
}

interface PreactSetup<S, P, A> {
  h: typeof h;
  useState: typeof useState;
  Root: AnyComponent<RootProps<S, P, A>, S>;
}

interface AppProps<S, P, A> {
  states: Stream<S>;
  update: Stream<P>;
  actions: A;
}

declare function _default<S, P, A>(
  setup: PreactSetup<S, P, A>
): (props: AppProps<S, P, A>) => JSX.Element;

export default _default;
