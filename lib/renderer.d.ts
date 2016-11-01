import { Component } from "./component";
export interface Renderer<S, V> {
    (state: S, rootComponent: Component<S, V>): any;
}
