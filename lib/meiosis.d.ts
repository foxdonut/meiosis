import { Component } from "./component";
export interface MeiosisApp<M, P, S> {
    model: Flyd.Stream<M>;
    propose: Flyd.Stream<P>;
}
declare function newInstance<M, P, S>(component: Component<M, P, S>): MeiosisApp<M, P, S>;
export { newInstance };
