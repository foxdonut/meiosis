import { Context } from "./context";
import { Emitter } from "./wire";

export interface NextAction<M, P, A> {
  (context: Context<M, P, A>): void;
}

export interface NextActionFromActions<M, P> {
  (model: M, proposal: P): void;
}
