import { Stream } from "../common";
import { createElement, useState, ComponentType } from "react";

interface ReactFunctions {
  createElement: typeof createElement;
  useState: typeof useState;
}

interface RootProps<S, P, A> {
  state: S;
  update?: Stream<P>;
  actions?: A;
}

interface ReactSetup<S, P, A> {
  React: ReactFunctions;
  Root: ComponentType<RootProps<S, P, A>>;
}

interface AppProps<S, P, A> {
  states: Stream<S>;
  update: Stream<P>;
  actions: A;
}

declare function _default<S, P, A>(
  setup: ReactSetup<S, P, A>
): (props: AppProps<S, P, A>) => JSX.Element;

export default _default;
