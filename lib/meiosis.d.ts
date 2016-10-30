import { Component } from "./component";
import { Config } from "./config";
import { Renderer } from "./renderer";
export interface RenderRoot<M> {
    (model: M): any;
    initialModel: M;
}
export interface RunConfig<M, V> {
    renderer: Renderer<M, V>;
    rootComponent: Component<M, V>;
    initialModel?: M;
}
export interface Run<M, V> {
    (runConfig: RunConfig<M, V>): RenderRoot<M>;
}
export interface CreateComponent<M, V, P> {
    <A>(config: Config<M, V, P, A>): Component<M, V>;
}
export interface MeiosisApp<M, V, P> {
    createComponent: CreateComponent<M, V, P>;
    run: Run<M, V>;
}
declare const REFUSE_PROPOSAL: {};
declare function newInstance<M, V, P>(): MeiosisApp<M, V, P>;
declare const createComponent: CreateComponent<any, any, any>;
declare const run: Run<any, any>;
export { newInstance, createComponent, run, REFUSE_PROPOSAL };
