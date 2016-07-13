import { WireCreator } from "./wire";

interface Adapters<M, V, P> {
  rootWire?: WireCreator<M>;
  componentWire?: WireCreator<P>;
}

export { Adapters };
