import { Component } from "./component";
import { Config, InitialModel } from "./config";
import { NextAction, NextActionFromActions } from "./nextAction";
import { PostRender } from "./postRender";
import { Ready } from "./ready";
import { Receive } from "./receive";
import { Renderer } from "./renderer";
import { State } from "./state";
import { Emitter, Listener, WireCreator, Wire, defaultWireCreator } from "./wire";

export interface RenderRoot<M, S> {
  (state: S): any;
  initialModel: M;
  state: State<M, S>;
}

export interface RunConfig<M, S, V> {
  renderer: Renderer<S, V>;
  rootComponent: Component<S, V>;
  initialModel?: M;
  state?: State<M, S>;
}

export interface Run<M, S, V> {
  (runConfig: RunConfig<M, S, V>): RenderRoot<M, S>;
}

export interface CreateComponent<M, S, V, P> {
  <A>(config: Config<M, S, V, P, A>): Component<S, V>;
}

export interface MeiosisApp<M, S, V, P> {
  createComponent: CreateComponent<M, S, V, P>;
  run: Run<M, S, V>;
}

let nextId = 1;

const copy = (obj: any): any => JSON.parse(JSON.stringify(obj));

function newInstance<M, S, V, P>(): MeiosisApp<M, S, V, P> {
  let allInitialModels: Array<InitialModel<M>> = [];
  let allStates: Array<State<M, S>> = [];
  let allReceives: Array<Receive<M, P>> = [];
  let allReadies: Array<Ready<P, any>> = [];
  let allPostRenders: Array<PostRender<S>> = [];
  let allNextActions: Array<NextActionFromActions<M, P>> = [];

  const createRootWire: WireCreator<M> = defaultWireCreator();
  const createComponentWire: WireCreator<P> = defaultWireCreator();
  const rootWire: Wire<M> = createRootWire("meiosis_" + (nextId++));
  const componentWire: Wire<P> = createComponentWire();
  const propose: Emitter<P> = componentWire.emit;

  function createComponent<A>(config: Config<M, S, V, P, A>): Component<S, V> {
    if (!config || (
      !config.actions &&
      !config.nextAction &&
      !config.initialModel &&
      !config.ready &&
      !config.receive &&
      !config.state &&
      !config.view &&
      !config.postRender
    )) {
      throw new Error("Please specify a config when calling createComponent.");
    }
    const initialModel: InitialModel<M> = config.initialModel;

    if (initialModel) {
      if (typeof initialModel !== "function") {
        throw new Error("initialModel in createComponent must be a function. You can pass the root initialModel object to the run function.");
      }
      allInitialModels.push(initialModel);
    }

    const state: State<M, S> = config.state;
    if (state) {
      allStates.push(state);
    }

    const actions: A | Emitter<P> = config.actions ? config.actions(propose) : propose;

    const receive: Receive<M, P> = config.receive;
    if (receive) {
      allReceives.push(receive);
    }

    const ready: Ready<P, A> = config.ready;
    if (ready) {
      allReadies.push(() => ready(actions));
    }

    const postRender: PostRender<S> = config.postRender;
    if (postRender) {
      allPostRenders.push(postRender);
    }

    const nextAction: NextAction<M, P, A> = config.nextAction;
    if (nextAction) {
      allNextActions.push((model: M, proposal: P) => nextAction(model, proposal, actions));
    }

    return function(state: S): V {
      return config.view ? config.view(state, actions) : undefined;
    };
  };

  const run: Run<M, S, V> = (runConfig: RunConfig<M, S, V>): RenderRoot<M, S> => {
    let rootModel: any = runConfig.initialModel || {};
    allInitialModels.forEach((initialModel: Function) => rootModel = initialModel(rootModel));

    let rootState: State<any, any> = runConfig.state || ( (model: M) => model );
    allStates.forEach((stateFunction: State<M, S>) => {
      const prevState = rootState;
      rootState = (model: M, state: S): S => stateFunction(model, prevState(model))
    });

    componentWire.listen((proposal: any) => {
      for (let i: number = 0; i < allReceives.length; i++) {
        const receive: Receive<M, P> = allReceives[i];
        const received: M = receive(rootModel, proposal);

        rootModel = received;
      };

      rootWire.emit(rootModel);
      allNextActions.forEach((nextAction: NextActionFromActions<M, P>) => nextAction(rootModel, proposal));
    });

    const renderRoot_: any = (state: S) => {
      const result: any = runConfig.renderer(state, runConfig.rootComponent);
      allPostRenders.forEach((postRender: PostRender<S>) => postRender(state));
      return result;
    };
    renderRoot_.initialModel = rootModel;
    renderRoot_.state = rootState;

    const renderRoot: RenderRoot<M, S> = renderRoot_;

    rootWire.listen((model: M) => renderRoot(rootState(model)));

    rootWire.emit(rootModel);
    allReadies.forEach((ready: Function) => ready());

    const devtool: any = window && window["__MEIOSIS_TRACER_DEVTOOLS_GLOBAL_HOOK__"];
    if (devtool) {
      const initialModel = copy(rootModel);
      const bufferedReceives: Array<any> = [];
      let devtoolInitialized: boolean = false;

      createComponent({
        receive: (model: any, proposal: any) => {
          if (devtoolInitialized) {
            window.postMessage({ type: "MEIOSIS_RECEIVE", model, proposal }, "*");
          }
          else {
            bufferedReceives.push({model: copy(model), proposal});
          }
          return model;
        }
      });
      window.addEventListener("message", evt => {
        if (evt.data.type === "MEIOSIS_RENDER_ROOT") {
          renderRoot(evt.data.state);
        }
        else if (evt.data.type === "MEIOSIS_REQUEST_INITIAL_MODEL") {
          window.postMessage({ type: "MEIOSIS_INITIAL_MODEL", model: initialModel }, "*");
          devtoolInitialized = true;

          for (let i: number = 0; i < bufferedReceives.length; i++) {
            const { model, proposal }: any = bufferedReceives[i];
            window.postMessage({ type: "MEIOSIS_RECEIVE", model, proposal }, "*");
          }
        }
        else if (evt.data.type === "MEIOSIS_REQUEST_STATE") {
          const state: S = renderRoot.state(evt.data.model);
          const ts: string = evt.data.ts;
          window.postMessage({ type: "MEIOSIS_STATE", state, ts }, "*");
        }
      });
    }

    return renderRoot;
  };

  return {
    createComponent,
    run
  };
}

const instance = newInstance<any, any, any, any>();
const createComponent = instance.createComponent;
const run = instance.run;

export {
  newInstance,
  createComponent,
  run
};
