import { Actions } from "./actions";
import { NextAction } from "./nextAction";
import { PostRender } from "./postRender";
import { Ready } from "./ready";
import { Receive } from "./receive";
import { View } from "./view";
interface Config<M, V, P> {
    initialModel?: M;
    actions?: Actions<P>;
    view?: View<M, V>;
    postRender?: PostRender<V>;
    ready?: Ready<P>;
    receive?: Receive<M, P>;
    nextAction?: NextAction<M, P>;
}
export { Config };
