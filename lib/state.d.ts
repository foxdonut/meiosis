export interface ComponentState<M, S> {
    (model: M, state: S): S;
}
export interface State<M, S> {
    (model: M): S;
}
