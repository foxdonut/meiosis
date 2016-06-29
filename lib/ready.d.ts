import { Actions } from "./actions";
interface Ready<P> {
    (actions: Actions<P>): void;
}
export { Ready };
