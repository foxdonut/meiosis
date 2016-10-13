import { WireCreator } from "./wire";

export interface Adapters<M, P> {
  rootWire?: WireCreator<M>;
  componentWire?: WireCreator<P>;
}
