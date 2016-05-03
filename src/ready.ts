import { Actions } from "./actions";

interface Ready {
  (actions: Actions): any;
}

export { Ready };
