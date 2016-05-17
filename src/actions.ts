import { Emitter } from "./wire";

interface Actions<U> {
  (sendUpdate: Emitter<U>): any;
}

export { Actions };
