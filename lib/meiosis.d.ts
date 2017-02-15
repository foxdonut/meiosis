export interface Mapper<A, B> {
    (value: A): B;
}
export interface Stream<T> {
    (): T;
    (value: T): Stream<T>;
    map<T, R>(mapper: Mapper<T, R>): Stream<R>;
}
export interface StreamLibrary {
    stream<T>(): Stream<T>;
    stream<T>(value: T): Stream<T>;
}
export interface StreamLibraryCombine extends StreamLibrary {
    combine<T>(combinator: (...streams: Array<Stream<any>>) => T, streams: Array<Stream<any>>): Stream<T>;
}
export interface Scanner<A, B> {
    (acc: A, next: B): A;
}
export interface TraceParameters<M> {
    streamLibrary: StreamLibrary;
    modelChanges: Stream<any>;
    streams: Array<Stream<any>>;
    copy?: Function;
}
export declare const createMergeIntoOne: (streamLibrary: StreamLibrary) => (streams: Stream<any>[]) => Stream<{}>;
export declare const createScan: (streamLibrary: StreamLibraryCombine) => <A, B>(fn: Scanner<A, B>, acc: A, s: Stream<B>) => Stream<A>;
export declare const applyModelChange: (model: any, modelChange: Function) => any;
export declare function trace<M>(params: TraceParameters<M>): void;
