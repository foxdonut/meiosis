import { Component } from "./component";

interface Renderer<M, V> {
  (model: M, rootComponent: Component<M, V>): void;
}

export { Renderer };
