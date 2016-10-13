export interface Listener<P> {
    (proposal: P): void;
}
export interface Emitter<P> {
    (proposal: P): void;
}
export interface Wire<P> {
    emit: Emitter<P>;
    listen(listener: Listener<P>): any;
}
export interface WireCreator<P> {
    (wireName?: string): Wire<P>;
}
export declare function defaultWireCreator<P>(): WireCreator<P>;
