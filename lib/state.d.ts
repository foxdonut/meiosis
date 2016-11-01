export interface State<M, S> {
    (model: M, state?: S): S;
}
