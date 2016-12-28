import * as flyd from "flyd";
import * as objectPath from "object-path";
import { Component } from "./component";
import { InitialModel } from "./initialModel";
import { Receive } from "./receive";
import { ComponentState, State } from "./state";
import { NextAction } from "./nextAction";

type Stream<T> = Flyd.Stream<T>;

export interface RunParameters<M, P, S> {
  initialModel: M;
  components: Array<Component<M, P, S>>;
}

export interface MeiosisRun<M, P, S> {
  (params: RunParameters<M, P, S>): MeiosisApp<M, P, S>;
}

export interface MeiosisInstance<M, P, S> {
  propose: Flyd.Stream<P>;
  run: MeiosisRun<M, P, S>;
}

export interface MeiosisApp<M, P, S> {
  model: Flyd.Stream<M>;
  stateFn: State<M, S>;
  state: Flyd.Stream<S>;
}

const copy = (obj: any): any => JSON.parse(JSON.stringify(obj));
const prop = (property: string) => (value: any) => value[property];
const identity = <T>(value: T) => value;

function newInstance<M, P, S>(): MeiosisInstance<M, P, S> {
  const propose: Stream<P> = flyd.stream<P>();

  const run = (params: RunParameters<M, P, S>): MeiosisApp<M, P, S> => {
    if (!params.initialModel || !params.components) {
      throw new Error("Please specify initialModel and components.");
    }
    const getComponentFunctions = <M, P, S>(property: string, components: Array<Component<M, P, S>>) =>
      components.map(prop(property)).filter(identity);

    const addAllComponents = <M, P, S>(components: Array<Component<M, P, S>>, list: Array<Component<M, P, S>>) => {
      const children: Array<Component<M, P, S>> = list || [];
      children.forEach(child => {
        components.push(child);
        addAllComponents(components, child.components);
      });
    };

    const components: Array<Component<M, P, S>> = [];
    addAllComponents(components, params.components);

    const initialModels: Array<InitialModel<M>> = getComponentFunctions("initialModel", components);
    const initialModel: M = initialModels.reduce((model, fn) => fn(model), params.initialModel);

    const receives: Array<Receive<M, P>> = getComponentFunctions("receive", components);
    const receive: Receive<M, P> = (model: M, proposal: P) =>
      receives.reduce((model, fn) => fn(model, proposal), model);

    const model: Stream<M> = flyd.scan<P, M>(receive, initialModel, propose);

    const states: Array<ComponentState<M, S>> = getComponentFunctions("state", components);
    const stateFn: State<M, S> = (model: M) =>
      states.reduce((state, fn) => fn(model, state), copy(model));

    const state: Stream<S> = flyd.map<M, S>(stateFn, model);

    const nexts: Array<NextAction<M, P>> = getComponentFunctions("nextAction", components);
    const nextAction: NextAction<M, P> = (model: M, proposal: P) => nexts.forEach(fn => fn(model, proposal));

    flyd.on(model => propose() && nextAction(model, propose()), model);

    return {
      model,
      stateFn,
      state
    };
  };

  return {
    propose,
    run
  };
}

export interface NestComponent {
  component: Component<any, any, any>;
  path: string;
}

function nestComponent(params: NestComponent): Component<any, any, any> {
  const component: Component<any, any, any> = params.component;
  const path: string = params.path;

  const nested: Component<any, any, any> = {
    initialModel: component.initialModel,
    components: component.components,
    receive: component.receive && ((model: any, proposal: any) => {
      const subModel: any = objectPath.get(model, path);

      if (subModel) {
        component.receive(subModel, proposal);
      }
      return model;
    }),
    nextAction: component.nextAction && ((model: any, proposal: any) => {
      const subModel: any = objectPath.get(model, path);

      if (subModel) {
        component.nextAction(subModel, proposal);
      }
    }),
    state: component.state && ((model: any, state: any) => {
      const subModel: any = objectPath.get(model, path);
      const subState: any = objectPath.get(state, path);

      if (subModel && subState) {
        objectPath.set(state, path, component.state(subModel, subState));
      }
      return state;
    })
  };
  return nested;
}

export interface ComponentContainer<M, P, S> {
  component: Component<M, P, S>;
  getComponents: (model: M) => Array<Component<M, P, S>>;
}

function componentContainer<M, P, S>(params: ComponentContainer<M, P, S>): Component<M, P, S> {
  const container: Component<M, P, S> = {
    initialModel: params.component.initialModel,
    components: params.component.components,
    receive: (model: M, proposal: P) => {
      params.component.receive && params.component.receive(model, proposal);
      params.getComponents(model).forEach((child: Component<M, P, S>) => child.receive && child.receive(model, proposal));
      return model;
    },
    state: (model: M, state: S) => {
      params.component.state && params.component.state(model, state);
      params.getComponents(model).forEach((child: Component<M, P, S>) => child.state && child.state(model, state));
      return state;
    },
    nextAction: (model: M, proposal: P) => {
      params.component.nextAction && params.component.nextAction(model, proposal);
      params.getComponents(model).forEach((child: Component<M, P, S>) => child.nextAction && child.nextAction(model, proposal));
    }
  };
  return container;
}

const instance = newInstance<any, any, any>();
const propose = instance.propose;
const run = instance.run;

export {
  Stream,
  newInstance,
  propose,
  run,
  nestComponent,
  componentContainer
};

export const { combine, map, merge, on, scan } = flyd;
