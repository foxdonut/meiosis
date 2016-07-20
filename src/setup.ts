import { Actions } from "./actions";

interface Setup<P> {
  (actions: Actions<P>): void;
}

export { Setup };
