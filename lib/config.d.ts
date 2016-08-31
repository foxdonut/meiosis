import { Actions } from "./actions";
import { NextAction } from "./nextAction";
import { PostRender } from "./postRender";
import { Ready } from "./ready";
import { Receive } from "./receive";
import { Setup } from "./setup";
import { View } from "./view";
interface Config<M, V, P> {
    initialModel?: M;
    actions?: Actions<P>;
    setup?: Setup<P>;
    view?: View<M, V>;
    postRender?: PostRender<M>;
    ready?: Ready<P>;
    receive?: Receive<M, P>;
    nextAction?: NextAction<M, P>;
}
export { Config };
