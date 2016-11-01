import { ActionCreator } from "./actions";
import { NextAction } from "./nextAction";
import { PostRender } from "./postRender";
import { State } from "./state";
import { Ready } from "./ready";
import { Receive } from "./receive";
import { View } from "./view";
export interface InitialModel<M> {
    (model: M): M;
}
export interface Config<M, S, V, P, A> {
    initialModel?: InitialModel<M>;
    actions?: ActionCreator<P, A>;
    state?: State<M, S>;
    view?: View<S, V, P, A>;
    postRender?: PostRender<S>;
    ready?: Ready<P, A>;
    receive?: Receive<M, P>;
    nextAction?: NextAction<M, P, A>;
}
