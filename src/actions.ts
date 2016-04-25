import { Emitter } from "./wire";

interface Actions {
  (next: Emitter): any;
}

export { Actions };
