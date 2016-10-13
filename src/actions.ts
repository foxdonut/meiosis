import { Emitter } from "./wire";

export interface ActionCreator<P, A> {
  (propose: Emitter<P>): A;
}
