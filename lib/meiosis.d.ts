import { Component } from "./component";
import { Config } from "./config";
import { Renderer } from "./renderer";
import { State } from "./state";
export interface RenderRoot<M, S> {
    (state: S): any;
    initialModel: M;
    state: State<M, S>;
}
export interface RunConfig<M, S, V> {
    renderer: Renderer<S, V>;
    rootComponent: Component<S, V>;
    initialModel?: M;
    state?: State<M, S>;
}
export interface Run<M, S, V> {
    (runConfig: RunConfig<M, S, V>): RenderRoot<M, S>;
}
export interface CreateComponent<M, S, V, P> {
    <A>(config: Config<M, S, V, P, A>): Component<S, V>;
}
export interface MeiosisApp<M, S, V, P> {
    createComponent: CreateComponent<M, S, V, P>;
    run: Run<M, S, V>;
}
declare const REFUSE_PROPOSAL: {};
declare function newInstance<M, S, V, P>(): MeiosisApp<M, S, V, P>;
declare const createComponent: CreateComponent<any, any, any, any>;
declare const run: Run<any, any, any>;
export { newInstance, createComponent, run, REFUSE_PROPOSAL };
