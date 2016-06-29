interface Receive<M, P> {
  (model: M, proposal: P): M;
}

export { Receive };
