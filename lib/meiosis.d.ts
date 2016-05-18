import { Adapters } from "./adapters";
import { Config } from "./config";
export interface Component<M, V> {
    (model: M): V;
}
export interface CreateComponent<M, V, U> {
    (config: Config<M, V, U>): Component<M, V>;
}
export interface RenderRoot<M> {
    (model: M): void;
}
export interface Run<M, V> {
    (component: Component<M, V>): RenderRoot<M>;
}
export interface Meiosis<M, V, U> {
    createComponent: CreateComponent<M, V, U>;
    run: Run<M, V>;
}
declare const REFUSE_UPDATE: {};
declare function init<M, V, U>(adapters: Adapters<M, V, U>): Meiosis<M, V, U>;
export { init, REFUSE_UPDATE };
