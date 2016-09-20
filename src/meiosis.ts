import { Adapters } from "./adapters";
import { Component } from "./component";
import { Config } from "./config";
import { NextAction, NextActionFromActions } from "./nextAction";
import { PostRender } from "./postRender";
import { Ready } from "./ready";
import { Receive } from "./receive";
import { Renderer } from "./renderer";
import { Setup } from "./setup";
import { Emitter, Listener, WireCreator, Wire, defaultWireCreator } from "./wire";

export interface CreateComponent<M, V, P> {
  (config: Config<M, V, P>): Component<M, V>;
}

export interface RenderRoot<M> {
  (model: M): any;
  initialModel: M;
}

export interface Run<M, V, P> {
  (render: Renderer<M, V, P>, component: Component<M, V>): RenderRoot<M>;
}

export interface MeiosisApp<M, V, P> {
  createComponent: CreateComponent<M, V, P>;
  run: Run<M, V, P>;
}

const REFUSE_PROPOSAL = {};
let nextId = 1;

function init<M, V, P>(adapters?: Adapters<M, V, P>): MeiosisApp<M, V, P> {
  let allReceives: Array<Receive<M, P>> = [];
  let allReadies: Array<Ready<P>> = [];
  let allPostRenders: Array<PostRender<M>> = [];
  let allNextActions: Array<NextActionFromActions<M, P>> = [];

  const createRootWire: WireCreator<M> = (adapters && adapters.rootWire) || defaultWireCreator();
  const createComponentWire: WireCreator<P> = (adapters && adapters.componentWire) || defaultWireCreator();
  const rootWire: Wire<M> = createRootWire("meiosis_" + (nextId++));
  const componentWire: Wire<P> = createComponentWire();
  const propose: Emitter<P> = componentWire.emit;

  let rootModel: M = null;
  let initialModelCount = 0;

  const createComponent: CreateComponent<M, V, P> = (config: Config<M, V, P>) => {
    if (!config || (
      !config.actions &&
      !config.nextAction &&
      !config.initialModel &&
      !config.ready &&
      !config.receive &&
      !config.view &&
      !config.postRender &&
      !config.setup
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

    const actions = config.actions ? config.actions(propose) : propose;

    const setup: Setup<P> = config.setup;
    if (setup) {
      setup(actions);
    }

    const receive: Receive<M, P> = config.receive;
    if (receive) {
      allReceives.push(receive);
    }

    const ready: Ready<P> = config.ready;
    if (ready) {
      allReadies.push(() => ready(actions));
    }

    const postRender: PostRender<M> = config.postRender;
    if (postRender) {
      allPostRenders.push(postRender);
    }

    const nextAction: NextAction<M, P> = config.nextAction;
    if (nextAction) {
      allNextActions.push((model: M, proposal: P) => nextAction(model, proposal, actions));
    }

    return function(model: M): V {
      return config.view ? config.view(model, actions) : undefined;
    };
  };

  const run: Run<M, V, P> = (render: Renderer<M, V, P>, rootComponent: Component<M, V>) => {
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
      const result: any = render(model, rootComponent, propose);
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
      devtool.setup(createComponent, renderRoot);
    }

    return renderRoot;
  };

  return {
    createComponent,
    run
  };
}

const instance = init<any, any, any>();
const createComponent = instance.createComponent;
const run = instance.run;

export {
  init,
  createComponent,
  run,
  REFUSE_PROPOSAL
};
