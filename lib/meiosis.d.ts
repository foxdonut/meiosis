export interface Mapper<A, B> {
    (value: A): B;
}
export interface Stream<T> {
    (): T;
    (value: T): Stream<T>;
    map<T, R>(mapper: Mapper<T, R>): Stream<R>;
}
export interface Scanner<A, B> {
    (acc: A, next: B): A;
}
export interface TraceParameters<M> {
    modelChanges: Stream<any>;
    streams: Array<Stream<any>>;
    copy?: Function;
}
export interface EventType {
    type: string;
    data: any;
}
export declare function applyModelChange<M>(model: M, modelChange: Function): any;
export declare const createEvents: (eventStream: Stream<EventType>, events: any, connections: any) => any;
export declare function isMeiosisTracerOn(): boolean;
export declare function trace<M>(params: TraceParameters<M>): void;
