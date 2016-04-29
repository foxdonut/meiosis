import { Actions } from "./actions";
import { NextUpdate } from "./nextUpdate";
import { ReceiveUpdate } from "./receiveUpdate";
import { View } from "./view";

interface Config {
  actions?: Actions;
  nextUpdate?: NextUpdate;
  initialModel?: any;
  receiveUpdate?: ReceiveUpdate;
  view?: View;
}

export { Config };
