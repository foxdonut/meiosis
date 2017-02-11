/// <reference path="flyd.d.ts" />
export declare type Stream<T> = Flyd.Stream<T>;
export declare type Scanner<A, B> = Flyd.Scanner<A, B>;
export declare type Mapper<A, B> = Flyd.Mapper<A, B>;
export interface MapperSpec<A, B> {
    [name: string]: Mapper<A, B>;
}
export interface ModelChange<M> {
    (model: M): M;
}
export interface NextAction {
    (model: any): void;
}
export interface RunParameters<M> {
    initialModel: M;
    modelChanges: Stream<ModelChange<M>>;
    mappers?: Array<MapperSpec<any, any> | Mapper<any, any>>;
    nextAction?: NextAction;
    copy?: any;
}
export interface MeiosisRun<M> {
    (params: RunParameters<M>): MeiosisApp;
}
export interface MeiosisInstance<M> {
    run: MeiosisRun<M>;
}
export interface MeiosisApp {
    [key: string]: Stream<any>;
}
export declare const combine: <A, B, C>(combinator: (stream1: Flyd.Stream<A>, stream2: Flyd.Stream<B>) => C, streams: Flyd.Stream<any>[]) => Flyd.Stream<C>, map: <T, R>(mapper: Flyd.Mapper<T, R>, stream: Flyd.Stream<T>) => Flyd.Stream<R>, merge: <T>(stream1: Flyd.Stream<T>, stream2: Flyd.Stream<T>) => Flyd.Stream<T>, on: <T, R>(mapper: Flyd.Mapper<T, R>, stream: Flyd.Stream<T>) => Flyd.Stream<R>, scan: <A, B>(scanner: Flyd.Scanner<A, B>, initial: A, stream: Flyd.Stream<B>) => Flyd.Stream<A>, stream: {
    <T>(): Flyd.Stream<T>;
    <T>(value: T): Flyd.Stream<T>;
};
export declare const mergeAll: (streams: Flyd.Stream<any>[]) => Flyd.Stream<{}>;
declare function newInstance<M>(): MeiosisInstance<M>;
declare const run: MeiosisRun<any>;
export { newInstance, run };
