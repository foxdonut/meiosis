import { NextAction } from "./nextAction";
import { State } from "./state";
import { Receive } from "./receive";

export interface Component<M, P, S> {
  initialModel?: M;
  receive?: Receive<M, P>;
  state?: State<M, S>;
  nextAction?: NextAction<M, P>;
}
