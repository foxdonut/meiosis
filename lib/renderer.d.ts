import { Component } from "./component";
export interface Renderer<M, V> {
    (model: M, rootComponent: Component<M, V>): any;
}
