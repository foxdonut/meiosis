export interface Receive<M, P> {
  (model: M, proposal: P): M;
}
