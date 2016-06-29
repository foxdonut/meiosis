import { Emitter } from "./wire";
interface Actions<P> {
    (propose: Emitter<P>): any;
}
export { Actions };
