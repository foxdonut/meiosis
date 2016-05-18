import { Actions } from "./actions";
import { NextUpdate } from "./nextUpdate";
import { PostRender } from "./postRender";
import { Ready } from "./ready";
import { ReceiveUpdate } from "./receiveUpdate";
import { View } from "./view";
interface Config<M, V, U> {
    initialModel: M;
    view?: View<M, V>;
    receiveUpdate?: ReceiveUpdate<M, U>;
    actions?: Actions<U>;
    nextUpdate?: NextUpdate<M, U>;
    ready?: Ready<U>;
    postRender?: PostRender<V>;
}
export { Config };
