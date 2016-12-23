import * as flyd from "flyd";
import { Component } from "./component";

export interface MeiosisApp<M, P, S> {
  model: Flyd.Stream<M>;
  propose: Flyd.Stream<P>;
}

const copy = (obj: any): any => JSON.parse(JSON.stringify(obj));

function newInstance<M, P, S>(component: Component<M, P, S>): MeiosisApp<M, P, S> {
  const propose: Flyd.Stream<P> = flyd.stream<P>();

  const model: Flyd.Stream<M> = flyd.scan<P, M>(component.receive, component.initialModel, propose);

  return {
    model,
    propose
  };
}

export {
  newInstance,
};
