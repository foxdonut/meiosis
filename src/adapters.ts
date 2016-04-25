import { Merger } from "./merge";
import { Renderer } from "./render";
import { WireCreator } from "./wire";

interface Adapters {
  merge: Merger;
  render: Renderer;
  wire: WireCreator;
}

export { Adapters };
