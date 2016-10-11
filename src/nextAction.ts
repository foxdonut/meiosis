import { Emitter } from "./wire";

interface NextAction<M, P, A> {
  (model: M, proposal: P, actions: A | Emitter<P>): void;
}

interface NextActionFromActions<M, P> {
  (model: M, proposal: P): void;
}

export { NextAction, NextActionFromActions };
