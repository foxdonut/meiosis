import { Emitter } from "./wire";
interface ActionCreator<P, A> {
    (propose: Emitter<P>): A;
}
export { ActionCreator };
