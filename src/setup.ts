import { Emitter } from "./wire";

export interface Setup<P, A> {
  (actions: A | Emitter<P>): void;
}
