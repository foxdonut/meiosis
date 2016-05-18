interface ReceiveUpdate<M, U> {
    (model: M, update: U): M;
}
export { ReceiveUpdate };
