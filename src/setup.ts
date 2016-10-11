import { Emitter } from "./wire";

interface Setup<P, A> {
  (actions: A | Emitter<P>): void;
}

export { Setup };
