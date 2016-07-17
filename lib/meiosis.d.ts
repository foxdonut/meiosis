import { Adapters } from "./adapters";
import { Component } from "./component";
import { Config } from "./config";
import { Renderer } from "./renderer";
export interface CreateComponent<M, V, P> {
    (config: Config<M, V, P>): Component<M, V>;
}
export interface RenderRoot<M> {
    (model: M): any;
}
export interface Run<M, V, P> {
    (render: Renderer<M, V, P>, component: Component<M, V>): RenderRoot<M>;
}
export interface MeiosisApp<M, V, P> {
    createComponent: CreateComponent<M, V, P>;
    run: Run<M, V, P>;
}
declare const REFUSE_PROPOSAL: {};
declare function init<M, V, P>(adapters?: Adapters<M, V, P>): MeiosisApp<M, V, P>;
declare const createComponent: CreateComponent<any, any, any>;
declare const run: Run<any, any, any>;
export { init, createComponent, run, REFUSE_PROPOSAL };
