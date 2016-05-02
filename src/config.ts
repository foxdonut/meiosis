import { Actions } from "./actions";
import { NextUpdate } from "./nextUpdate";
import { Ready } from "./ready";
import { ReceiveUpdate } from "./receiveUpdate";
import { View } from "./view";

interface Config {
  actions?: Actions;
  nextUpdate?: NextUpdate;
  initialModel?: any;
  ready?: Ready;
  receiveUpdate?: ReceiveUpdate;
  view?: View;
}

export { Config };
