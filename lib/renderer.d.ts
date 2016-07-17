import { Component } from "./component";
import { Emitter } from "./wire";
interface Renderer<M, V, P> {
    (model: M, rootComponent: Component<M, V>, propose?: Emitter<P>): any;
}
export { Renderer };
