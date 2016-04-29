import { Emitter } from "./wire";

interface Actions {
  (sendUpdate: Emitter): any;
}

export { Actions };
