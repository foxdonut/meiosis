import * as flyd from "flyd";
import { Component } from "./component";
import { Receive } from "./receive";
import { ComponentState, State } from "./state";
import { NextAction } from "./nextAction";

type Stream<T> = Flyd.Stream<T>;

export interface InstanceParameters<M> {
  initialModel: M;
}

export interface MeiosisApp<M, P, S> {
  propose: Flyd.Stream<P>;
  components: Flyd.Stream<Array<Component<M, P, S>>>;
  model: Flyd.Stream<M>;
  stateFn: Flyd.Stream<State<M, S>>;
  state: Flyd.Stream<S>;
}

const copy = (obj: any): any => JSON.parse(JSON.stringify(obj));
const prop = (property: string) => (value: any) => value[property];
const identity = <T>(value: T) => value;

const getComponentFunctions = <M, P, S>(property: string) => (components: Array<Component<M, P, S>>) =>
  components.map(prop(property)).filter(identity);

function newInstance<M, P, S>(params: InstanceParameters<M>): MeiosisApp<M, P, S> {
  const propose: Stream<P> = flyd.stream<P>();
  const components: Stream<Array<Component<M, P, S>>> = flyd.stream<Array<Component<M, P, S>>>([]);

  const receives = flyd.map(getComponentFunctions("receive"), components);
  const receive = flyd.map(fns => (model: M, proposal: P) =>
    fns.reduce((model, fn) => fn(model, proposal), model), receives);

  const model: Stream<M> = flyd.scan<P, M>((model: M, proposal: P) =>
    receive()(model, proposal), params.initialModel, propose);

  const states: Stream<Array<State<M, S>>> = flyd.map<Array<Component<M, P, S>>, Array<State<M, S>>>(
    getComponentFunctions("state"), components);

  const stateFn: Stream<State<M, S>> = flyd.map<Array<ComponentState<M, S>>, State<M, S>>(fns => (model: M) =>
    fns.reduce((state, fn) => fn(model, state), JSON.parse(JSON.stringify(model))), states);

  const state: Stream<S> = flyd.combine<M, State<M, S>, S>(
    (model: Stream<M>, stateFn: Stream<State<M, S>>) => stateFn()(model()),
    [model, stateFn]);

  const nexts: Stream<Array<NextAction<M, P>>> = flyd.map<Array<Component<M, P, S>>, Array<NextAction<M, P>>>(
    getComponentFunctions("nextAction"), components);

  const nextAction: Stream<NextAction<M, P>> = flyd.map<Array<NextAction<M, P>>, NextAction<M, P>>(
    fns => (model: M, proposal: P) => fns.forEach(fn => fn(model, proposal)), nexts);

  flyd.on(model => propose() && nextAction()(model, propose()), model);

  return {
    propose,
    components,
    model,
    stateFn,
    state
  };
}

export {
  newInstance,
};
