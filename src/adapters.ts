import { WireCreator } from "./wire";

interface Adapters<M, P> {
  rootWire?: WireCreator<M>;
  componentWire?: WireCreator<P>;
}

export { Adapters };
