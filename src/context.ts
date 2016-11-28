import { Emitter } from "./wire";

export interface Context<M, P, A> {
  model: M;
  proposal: P;
  actions?: A;
  propose?: Emitter<P>;
}
