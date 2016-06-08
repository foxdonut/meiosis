import { Actions } from "./actions";
import { NextUpdate } from "./nextUpdate";
import { PostRender } from "./postRender";
import { Ready } from "./ready";
import { ReceiveUpdate } from "./receiveUpdate";
import { View } from "./view";
interface Config<M, V, U> {
    initialModel?: M;
    actions?: Actions<U>;
    view?: View<M, V>;
    postRender?: PostRender<V>;
    ready?: Ready<U>;
    receiveUpdate?: ReceiveUpdate<M, U>;
    nextUpdate?: NextUpdate<M, U>;
}
export { Config };
