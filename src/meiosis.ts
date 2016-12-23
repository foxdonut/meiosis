import { Component } from "./component";
import { InitialModel } from "./model";
import { Context } from "./context";
import { NextAction } from "./nextAction";
import { Receive } from "./receive";
import { State } from "./state";

export interface RunConfig<M, S, V> {
  renderer: Renderer<S, V>;
  rootComponent: Component<S, V>;
  initialModel?: M;
  state?: State<M, S>;
}

export interface MeiosisInstance<M, P, S> {

}

export interface Run<M, P, S> {
  (runConfig: RunConfig<M, P, S>): MeiosisInstance<M, P, S>;
}

export interface MeiosisApp<M, P, S> {
  run: Run<M, P, S>;
}

const copy = (obj: any): any => JSON.parse(JSON.stringify(obj));

function newInstance<M, P, S>(): MeiosisApp<M, P, S> {
  let allInitialModels: Array<InitialModel<M>> = [];
  let allStates: Array<State<M, S>> = [];
  let allReceives: Array<Receive<M, P>> = [];
  let allNextActions: Array<NextAction<M, P>> = [];

  const propose: Emitter<P> = null;

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

    const hasActions: boolean = !!config.actions;
    const actions: A = hasActions ? config.actions(propose) : null;
    const actionsOrPropose: A | Emitter<P> = hasActions ? actions : propose;

    const receive: Receive<M, P> = config.receive;
    if (receive) {
      allReceives.push(receive);
    }

    const ready: Ready<P, A> = config.ready;
    if (ready) {
      allReadies.push(() => ready(actionsOrPropose));
    }

    const postRender: PostRender<S> = config.postRender;
    if (postRender) {
      allPostRenders.push(postRender);
    }

    const nextAction: NextAction<M, P, A> = config.nextAction;
    if (nextAction) {
      allNextActions.push((model: M, proposal: P) => {
        const context: Context<M, P, A> = { model, proposal };
        if (hasActions) {
          context.actions = actions;
        }
        else {
          context.propose = propose;
        }
        nextAction(context);
      });
    }

    return function(state: S): V {
      return config.view ? config.view(state, actionsOrPropose) : undefined;
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
    run
  };
}

const instance = newInstance<any, any, any, any>();
const run = instance.run;

export {
  newInstance,
  run
};
