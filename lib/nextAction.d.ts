interface NextAction<M, P> {
    (model: M, proposal: P, actions: any): void;
}
interface NextActionFromActions<M, P> {
    (model: M, proposal: P): void;
}
export { NextAction, NextActionFromActions };
