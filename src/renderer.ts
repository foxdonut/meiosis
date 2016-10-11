import { Component } from "./component";
import { Emitter } from "./wire";

interface Renderer<M, V> {
  (model: M, rootComponent: Component<M, V>): any;
}

export { Renderer };
