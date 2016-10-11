import { ActionCreator } from "./actions";
import { NextAction } from "./nextAction";
import { PostRender } from "./postRender";
import { Ready } from "./ready";
import { Receive } from "./receive";
import { Setup } from "./setup";
import { View } from "./view";
interface Config<M, V, P, A> {
    initialModel?: M;
    actions?: ActionCreator<P, A>;
    setup?: Setup<P, A>;
    view?: View<M, V, P, A>;
    postRender?: PostRender<M>;
    ready?: Ready<P, A>;
    receive?: Receive<M, P>;
    nextAction?: NextAction<M, P, A>;
}
export { Config };
