import { Component } from "./component";
import { State } from "./state";
export interface RunParameters<M, P, S> {
    initialModel: M;
    components: Array<Component<M, P, S>>;
}
export interface MeiosisRun<M, P, S> {
    (params: RunParameters<M, P, S>): MeiosisApp<M, P, S>;
}
export interface MeiosisInstance<M, P, S> {
    propose: Flyd.Stream<P>;
    run: MeiosisRun<M, P, S>;
}
export interface MeiosisApp<M, P, S> {
    model: Flyd.Stream<M>;
    stateFn: State<M, S>;
    state: Flyd.Stream<S>;
}
declare function newInstance<M, P, S>(): MeiosisInstance<M, P, S>;
export interface NestComponent<N, P, T> {
    component: Component<N, P, T>;
    path: string;
}
declare function nestComponent<M, N, P, S, T>(params: NestComponent<N, P, T>): Component<M, P, S>;
export interface ComponentContainer<M, P, S> {
    component: Component<M, P, S>;
    getComponentIds: (model: M) => Array<string>;
    getComponentById: (id: string) => Component<M, P, S>;
}
declare function componentContainer<M, P, S>(params: ComponentContainer<M, P, S>): Component<M, P, S>;
declare const propose: Flyd.Stream<any>;
declare const run: MeiosisRun<any, any, any>;
export { newInstance, propose, run, nestComponent, componentContainer };
