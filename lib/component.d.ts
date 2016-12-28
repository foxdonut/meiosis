import { InitialModel } from "./initialModel";
import { NextAction } from "./nextAction";
import { ComponentState } from "./state";
import { Receive } from "./receive";
export interface Component<M, P, S> {
    initialModel?: InitialModel<M>;
    receive?: Receive<M, P>;
    state?: ComponentState<M, S>;
    nextAction?: NextAction<M, P>;
    components?: Array<Component<M, P, S>>;
}
