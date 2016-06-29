interface Listener<P> {
    (proposal: P): void;
}
interface Emitter<P> {
    (proposal: P): void;
}
interface Wire<P> {
    emit: Emitter<P>;
    listen(listener: Listener<P>): any;
}
interface WireCreator<P> {
    (wireName?: string): Wire<P>;
}
declare function defaultWireCreator<P>(): WireCreator<P>;
export { Emitter, Listener, Wire, WireCreator, defaultWireCreator };
