import { Component } from "./component";
import { State } from "./state";
export interface InstanceParameters<M> {
    initialModel: M;
}
export interface MeiosisApp<M, P, S> {
    propose: Flyd.Stream<P>;
    components: Flyd.Stream<Array<Component<M, P, S>>>;
    model: Flyd.Stream<M>;
    stateFn: Flyd.Stream<State<M, S>>;
    state: Flyd.Stream<S>;
}
declare function newInstance<M, P, S>(params: InstanceParameters<M>): MeiosisApp<M, P, S>;
export { newInstance };
