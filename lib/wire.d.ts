interface Listener<U> {
    (update: U): void;
}
interface Emitter<U> {
    (update: U): void;
}
interface Wire<U> {
    emit: Emitter<U>;
    listen(listener: Listener<U>): any;
}
interface WireCreator<U> {
    (wireName?: string): Wire<U>;
}
declare function defaultWireCreator<U>(): WireCreator<U>;
export { Emitter, Listener, Wire, WireCreator, defaultWireCreator };
