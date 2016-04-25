import { Actions } from "./actions";
import { Chain } from "./chain";
import { Receiver } from "./receivers";
import { Transform } from "./transform";
import { View } from "./view";

interface Config {
  actions?: Actions;
  chain?: Chain;
  initialModel?: any;
  transform?: Transform;
  receivers?: Array<Receiver>;
  view: View;
}

export { Config };
