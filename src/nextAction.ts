export interface NextAction<M, P> {
  (model: M, proposal: P): void;
}
