import { Adapters } from "./adapters";
import { Config } from "./config";
export interface Component<M, V> {
    (model: M): V;
}
export interface CreateComponent<M, V, P> {
    (config: Config<M, V, P>): Component<M, V>;
}
export interface RenderRoot<M> {
    (model: M): void;
}
export interface Run<M, V> {
    (component: Component<M, V>): RenderRoot<M>;
}
export interface Meiosis<M, V, P> {
    createComponent: CreateComponent<M, V, P>;
    run: Run<M, V>;
}
declare const REFUSE_PROPOSAL: {};
declare function init<M, V, P>(adapters: Adapters<M, V, P>): Meiosis<M, V, P>;
export { init, REFUSE_PROPOSAL };
