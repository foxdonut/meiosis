import { Emitter } from "./wire";

interface View<M, V, P, A> {
  (model: M, actions: A | Emitter<P>): V;
}

export { View };
