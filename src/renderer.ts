import { Component } from "./component";
import { Emitter } from "./wire";

export interface Renderer<M, V> {
  (model: M, rootComponent: Component<M, V>): any;
}
