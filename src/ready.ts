import { Actions } from "./actions";

interface Ready<U> {
  (actions: Actions<U>): void;
}

export { Ready };
