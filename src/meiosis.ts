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

export interface NestComponent<N, P, T> {
  component: Component<N, P, T>;
  path: string;
}

function nestComponent<M, N, P, S, T>(params: NestComponent<N, P, T>): Component<M, P, S> {
  const component: Component<N, P, T> = params.component;
  const path: string = params.path;

  const nested: Component<M, P, S> = {
    receive: component.receive && ((model: M, proposal: P) => {
      const subModel: N = objectPath.get<M, N>(model, path);

      if (subModel) {
        component.receive(subModel, proposal);
      }
      return model;
    }),
    nextAction: component.nextAction && ((model: M, proposal: P) => {
      const subModel: N = objectPath.get<M, N>(model, path);

      if (subModel) {
        component.nextAction(subModel, proposal);
      }
    }),
    state: component.state && ((model: M, state: S) => {
      const subModel: N = objectPath.get<M, N>(model, path);
      const subState: T = objectPath.get<S, T>(state, path);

      if (subModel && subState) {
        objectPath.set<S, T>(state, path, component.state(subModel, subState));
      }
      return state;
    })
  };
  return nested;
}

export interface ComponentContainer<M, P, S> {
  component: Component<M, P, S>;
  getComponentIds: (model: M) => Array<string>;
  getComponentById: (id: string) => Component<M, P, S>;
}

function componentContainer<M, P, S>(params: ComponentContainer<M, P, S>): Component<M, P, S> {
  const container: Component<M, P, S> = {
    receive: (model: M, proposal: P) => {
      params.component.receive && params.component.receive(model, proposal);
      params.getComponentIds(model).forEach(id => {
        const child: Component<M, P, S> = params.getComponentById(id);
        child.receive && child.receive(model, proposal);
      });
      return model;
    },
    state: (model: M, state: S) => {
      params.component.state && params.component.state(model, state);
      params.getComponentIds(model).forEach(id => {
        const child: Component<M, P, S> = params.getComponentById(id);
        child.state && child.state(model, state);
      });
      return state;
    },
    nextAction: (model: M, proposal: P) => {
      params.component.nextAction && params.component.nextAction(model, proposal);
      params.getComponentIds(model).forEach(id => {
        const child: Component<M, P, S> = params.getComponentById(id);
        child.nextAction && child.nextAction(model, proposal);
      });
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
