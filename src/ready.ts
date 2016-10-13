import { Emitter } from "./wire";

export interface Ready<P, A> {
  (actions: A | Emitter<P>): void;
}
