export declare type Stream<T> = Flyd.Stream<T>;
export declare type Scanner<T, R> = Flyd.Scanner<T, R>;
export declare type Mapper<T, R> = Flyd.Mapper<T, R>;
export interface ScannerSpec<T, R> {
    [name: string]: Scanner<T, R> | Scanner<T, R>;
}
export interface MapperSpec<T, R> {
    [name: string]: Mapper<T, R> | Mapper<T, R>;
}
export interface RunParameters<C, P> {
    initial: C;
    scanner: ScannerSpec<P, C>;
    mappers?: Array<MapperSpec<any, any>>;
}
export interface MeiosisRun<C, P> {
    (params: RunParameters<C, P>): MeiosisApp;
}
export interface MeiosisInstance<C, P> {
    propose: Stream<P>;
    run: MeiosisRun<C, P>;
}
export interface MeiosisApp {
    [key: string]: Stream<any>;
}
declare function newInstance<C, P>(): MeiosisInstance<C, P>;
declare const propose: Flyd.Stream<any>;
declare const run: MeiosisRun<any, any>;
export { newInstance, propose, run };
export declare const combine: <A, B, C>(combinator: (stream1: Flyd.Stream<A>, stream2: Flyd.Stream<B>) => C, streams: Flyd.Stream<any>[]) => Flyd.Stream<C>, map: <T, R>(mapper: Flyd.Mapper<T, R>, stream: Flyd.Stream<T>) => Flyd.Stream<R>, merge: <T>(stream1: Flyd.Stream<T>, stream2: Flyd.Stream<T>) => Flyd.Stream<T>, on: <T, R>(mapper: Flyd.Mapper<T, R>, stream: Flyd.Stream<T>) => Flyd.Stream<R>, scan: <T, R>(scanner: Flyd.Scanner<T, R>, initial: R, stream: Flyd.Stream<T>) => Flyd.Stream<R>;
