interface NextUpdate<M, U> {
    (model: M, update: U, actions: any): void;
}
interface NextUpdateFromActions<M, U> {
    (model: M, update: U): void;
}
export { NextUpdate, NextUpdateFromActions };
