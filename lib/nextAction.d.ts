import { Emitter } from "./wire";
export interface NextAction<M, P, A> {
    (model: M, proposal: P, actions: A | Emitter<P>): void;
}
export interface NextActionFromActions<M, P> {
    (model: M, proposal: P): void;
}
