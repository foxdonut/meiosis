import { Emitter } from "./wire";
interface Ready<P, A> {
    (actions: A | Emitter<P>): void;
}
export { Ready };
