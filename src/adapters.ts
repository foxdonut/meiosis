import { Merger } from "./merge";
import { Renderer } from "./renderer";
import { WireCreator } from "./wire";

interface Adapters<M, V, U> {
  merge?: Merger;
  render?: Renderer<V>;
  rootWire?: WireCreator<M>;
  componentWire?: WireCreator<U>;
}

export { Adapters };
