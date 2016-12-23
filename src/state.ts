export interface State<M, S> {
  (state: S, model: M): S;
}
