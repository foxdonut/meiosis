import { Component } from "./component";
import { Emitter } from "./wire";

export interface Renderer<S, V> {
  (state: S, rootComponent: Component<S, V>): any;
}
