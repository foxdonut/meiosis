export interface Component<M, V> {
    (model: M): V;
}
