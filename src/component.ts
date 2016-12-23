import { InitialModel } from "./model";
import { NextAction } from "./nextAction";
import { State } from "./state";
import { Receive } from "./receive";

export interface Component<M, P, S> {
  initialModel?: InitialModel<M>;
  state?: State<M, S>;
  receive?: Receive<M, P>;
  nextAction?: NextAction<M, P>;
}
