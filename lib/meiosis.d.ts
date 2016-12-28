import { Component } from "./component";
import { State } from "./state";
declare type Stream<T> = Flyd.Stream<T>;
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
export { Stream, newInstance, propose, run, nestComponent, componentContainer };
export declare const combine: <A, B, C>(combinator: (stream1: Flyd.Stream<A>, stream2: Flyd.Stream<B>) => C, streams: Flyd.Stream<any>[]) => Flyd.Stream<C>, map: <T, R>(mapper: Flyd.Mapper<T, R>, stream: Flyd.Stream<T>) => Flyd.Stream<R>, merge: <T>(stream1: Flyd.Stream<T>, stream2: Flyd.Stream<T>) => Flyd.Stream<T>, on: <T, R>(mapper: Flyd.Mapper<T, R>, stream: Flyd.Stream<T>) => Flyd.Stream<R>, scan: <T, R>(scanner: Flyd.Scanner<T, R>, initial: R, stream: Flyd.Stream<T>) => Flyd.Stream<R>;
