/// <reference path="flyd.d.ts" />
export declare type Stream<T> = Flyd.Stream<T>;
export declare type Scanner<M, P> = Flyd.Scanner<M, P>;
export declare type Mapper<A, B> = Flyd.Mapper<A, B>;
export interface ScannerSpec<M, P> {
    [name: string]: Scanner<M, P> | Scanner<M, P>;
}
export interface MapperSpec<A, B> {
    [name: string]: Mapper<A, B> | Mapper<A, B>;
}
export interface NextAction<P> {
    (model: any, proposal: P): void;
}
export interface RunParameters<M, P> {
    initialModel: M;
    scanner: ScannerSpec<M, P>;
    mappers?: Array<MapperSpec<any, any>>;
    nextAction: NextAction<P>;
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
export declare const combine: <A, B, C>(combinator: (stream1: Flyd.Stream<A>, stream2: Flyd.Stream<B>) => C, streams: Flyd.Stream<any>[]) => Flyd.Stream<C>, map: <T, R>(mapper: Flyd.Mapper<T, R>, stream: Flyd.Stream<T>) => Flyd.Stream<R>, merge: <T>(stream1: Flyd.Stream<T>, stream2: Flyd.Stream<T>) => Flyd.Stream<T>, on: <T, R>(mapper: Flyd.Mapper<T, R>, stream: Flyd.Stream<T>) => Flyd.Stream<R>, scan: <A, B>(scanner: Flyd.Scanner<A, B>, initial: A, stream: Flyd.Stream<B>) => Flyd.Stream<A>, stream: {
    <T>(): Flyd.Stream<T>;
    <T>(value: T): Flyd.Stream<T>;
};
declare function newInstance<M, P>(): MeiosisInstance<M, P>;
declare const propose: Flyd.Stream<any>;
declare const run: MeiosisRun<any, any>;
export { newInstance, propose, run };
