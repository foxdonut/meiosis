import { Component } from "./component";
import { Config } from "./config";
import { NextAction, NextActionFromActions } from "./nextAction";
import { PostRender } from "./postRender";
import { Ready } from "./ready";
import { Receive } from "./receive";
import { Renderer } from "./renderer";
import { Emitter, Listener, WireCreator, Wire, defaultWireCreator } from "./wire";

export interface RenderRoot<M> {
  (model: M): any;
  initialModel: M;
}

export interface Run<M, V> {
  (render: Renderer<M, V>, component: Component<M, V>): RenderRoot<M>;
}

export interface CreateComponent<M, V, P> {
  <A>(config: Config<M, V, P, A>): Component<M, V>;
}

export interface MeiosisApp<M, V, P> {
  createComponent: CreateComponent<M, V, P>;
  run: Run<M, V>;
}

const REFUSE_PROPOSAL = {};
let nextId = 1;

const copy = (obj: any): any => JSON.parse(JSON.stringify(obj));

function newInstance<M, V, P>(): MeiosisApp<M, V, P> {
  let allReceives: Array<Receive<M, P>> = [];
  let allReadies: Array<Ready<P, any>> = [];
  let allPostRenders: Array<PostRender<M>> = [];
  let allNextActions: Array<NextActionFromActions<M, P>> = [];

  const createRootWire: WireCreator<M> = defaultWireCreator();
  const createComponentWire: WireCreator<P> = defaultWireCreator();
  const rootWire: Wire<M> = createRootWire("meiosis_" + (nextId++));
  const componentWire: Wire<P> = createComponentWire();
  const propose: Emitter<P> = componentWire.emit;

  let rootModel: M = null;
  let initialModelCount = 0;

  function createComponent<A>(config: Config<M, V, P, A>): Component<M, V> {
    if (!config || (
      !config.actions &&
      !config.nextAction &&
      !config.initialModel &&
      !config.ready &&
      !config.receive &&
      !config.view &&
      !config.postRender
    )) {
      throw new Error("Please specify a config when calling createComponent.");
    }
    if (rootModel === null) {
      let startingModel: any = {};
      rootModel = startingModel;
    }
    const initialModel: any = config.initialModel;
    let initialModelError: boolean = false;

    if (typeof initialModel === "function") {
      rootModel = initialModel(rootModel);
      initialModelError = initialModelCount > 0;
    }
    else if (initialModel) {
      rootModel = initialModel;
      initialModelCount++;
      initialModelError = initialModelCount > 1;
    }
    if (initialModelError) {
      throw new Error("When more than one initialModel is used, they must all be functions.");
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

    const postRender: PostRender<M> = config.postRender;
    if (postRender) {
      allPostRenders.push(postRender);
    }

    const nextAction: NextAction<M, P, A> = config.nextAction;
    if (nextAction) {
      allNextActions.push((model: M, proposal: P) => nextAction(model, proposal, actions));
    }

    return function(model: M): V {
      return config.view ? config.view(model, actions) : undefined;
    };
  };

  const run: Run<M, V> = (render: Renderer<M, V>, rootComponent: Component<M, V>) => {
    componentWire.listen((proposal: any) => {
      let accepted = true;

      for (let i: number = 0; i < allReceives.length; i++) {
        const receive: Receive<M, P> = allReceives[i];
        const received: M = receive(rootModel, proposal);

        if (received === REFUSE_PROPOSAL) {
          accepted = false;
          break;
        }
        else {
          rootModel = received;
        }
      };

      if (accepted) {
        rootWire.emit(rootModel);
        allNextActions.forEach((nextAction: NextActionFromActions<M, P>) => nextAction(rootModel, proposal));
      }
    });

    const renderRoot_: any = (model: M) => {
      const result: any = render(model, rootComponent);
      allPostRenders.forEach((postRender: PostRender<M>) => postRender(model));
      return result;
    };
    renderRoot_.initialModel = rootModel;

    const renderRoot: RenderRoot<M> = renderRoot_;

    rootWire.listen(renderRoot);

    rootWire.emit(rootModel);
    allReadies.forEach((ready: Function) => ready());

    const devtool: any = window["__MEIOSIS_TRACER_DEVTOOLS_GLOBAL_HOOK__"];
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
          renderRoot(evt.data.model);
        }
        else if (evt.data.type === "MEIOSIS_REQUEST_INITIAL_MODEL") {
          window.postMessage({ type: "MEIOSIS_INITIAL_MODEL", model: initialModel }, "*");
          devtoolInitialized = true;

          for (let i: number = 0; i < bufferedReceives.length; i++) {
            const { model, proposal }: any = bufferedReceives[i];
            window.postMessage({ type: "MEIOSIS_RECEIVE", model, proposal }, "*");
          }
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

const instance = newInstance<any, any, any>();
const createComponent = instance.createComponent;
const run = instance.run;

export {
  newInstance,
  createComponent,
  run,
  REFUSE_PROPOSAL
};
