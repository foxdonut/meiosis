/// <reference path="flyd.d.ts" />
export declare type Stream<T> = Flyd.Stream<T>;
export declare type Scanner<T, R> = Flyd.Scanner<T, R>;
export declare type Mapper<T, R> = Flyd.Mapper<T, R>;
export interface ScannerSpec<T, R> {
    [name: string]: Scanner<T, R> | Scanner<T, R>;
}
export interface MapperSpec<T, R> {
    [name: string]: Mapper<T, R> | Mapper<T, R>;
}
export interface RunParameters<M, P> {
    initialModel: M;
    scanner: ScannerSpec<P, M>;
    mappers?: Array<MapperSpec<any, any>>;
    copy?: any;
}
export interface MeiosisRun<M, P> {
    (params: RunParameters<M, P>): MeiosisApp;
}
export interface MeiosisInstance<M, P> {
    propose: Stream<P>;
    run: MeiosisRun<M, P>;
}
export interface MeiosisApp {
    [key: string]: Stream<any>;
}
export declare const combine: <A, B, C>(combinator: (stream1: Flyd.Stream<A>, stream2: Flyd.Stream<B>) => C, streams: Flyd.Stream<any>[]) => Flyd.Stream<C>, map: <T, R>(mapper: Flyd.Mapper<T, R>, stream: Flyd.Stream<T>) => Flyd.Stream<R>, merge: <T>(stream1: Flyd.Stream<T>, stream2: Flyd.Stream<T>) => Flyd.Stream<T>, on: <T, R>(mapper: Flyd.Mapper<T, R>, stream: Flyd.Stream<T>) => Flyd.Stream<R>, scan: <T, R>(scanner: Flyd.Scanner<T, R>, initial: R, stream: Flyd.Stream<T>) => Flyd.Stream<R>, stream: {
    <T>(): Flyd.Stream<T>;
    <T>(value: T): Flyd.Stream<T>;
};
declare function newInstance<M, P>(): MeiosisInstance<M, P>;
declare const propose: Flyd.Stream<any>;
declare const run: MeiosisRun<any, any>;
export { newInstance, propose, run };
