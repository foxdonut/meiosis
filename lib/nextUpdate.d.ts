interface NextUpdate<M, U> {
    (model: M, update: U, actions: any): void;
}
export { NextUpdate };
