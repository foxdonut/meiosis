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
export interface CreateEvents {
    eventStream: Stream<EventType>;
    events: any;
    connect?: any;
}
export declare function applyModelChange<M>(model: M, modelChange: Function): any;
export declare const createEvents: (params: CreateEvents) => any;
export declare function isMeiosisTracerOn(): boolean;
export declare function trace<M>(params: TraceParameters<M>): void;
