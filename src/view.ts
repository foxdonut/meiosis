import { Emitter } from "./wire";

export interface View<M, V, P, A> {
  (model: M, actions: A | Emitter<P>): V;
}
