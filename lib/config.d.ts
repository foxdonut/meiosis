import { ActionCreator } from "./actions";
import { NextAction } from "./nextAction";
import { PostRender } from "./postRender";
import { Ready } from "./ready";
import { Receive } from "./receive";
import { View } from "./view";
export interface InitialModel<M> {
    (model: M): M;
}
export interface Config<M, V, P, A> {
    initialModel?: M | InitialModel<M>;
    actions?: ActionCreator<P, A>;
    view?: View<M, V, P, A>;
    postRender?: PostRender<M>;
    ready?: Ready<P, A>;
    receive?: Receive<M, P>;
    nextAction?: NextAction<M, P, A>;
}
