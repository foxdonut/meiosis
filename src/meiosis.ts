import { Adapters } from "./adapters";
import { Config } from "./config";
import { Merger, defaultMerge } from "./merge";
import { NextAction, NextActionFromActions } from "./nextAction";
import { PostRender } from "./postRender";
import { Ready } from "./ready";
import { Receive } from "./receive";
import { Emitter, Listener, WireCreator, Wire, defaultWireCreator } from "./wire";

export interface Component<M, V> {
  (model: M): V;
}

export interface CreateComponent<M, V, P> {
  (config: Config<M, V, P>): Component<M, V>;
}

export interface RenderRoot<M> {
  (model: M): void;
}

export interface Run<M, V> {
  (component: Component<M, V>): RenderRoot<M>;
}

export interface Meiosis<M, V, P> {
  createComponent: CreateComponent<M, V, P>;
  run: Run<M, V>;
}

const REFUSE_PROPOSAL = {};

function init<M, V, P>(adapters: Adapters<M, V, P>): Meiosis<M, V, P> {
  let allReceives: Array<Receive<M, P>> = [];
  let allReadies: Array<Ready<P>> = [];
  let allPostRenders: Array<PostRender<V>> = [];
  let allNextActions: Array<NextActionFromActions<M, P>> = [];

  const createRootWire: WireCreator<M> = adapters.rootWire || defaultWireCreator();
  const createComponentWire: WireCreator<P> = adapters.componentWire || defaultWireCreator();
  const rootWire: Wire<M> = createRootWire("meiosis");
  const componentWire: Wire<P> = createComponentWire();
  const propose: Emitter<P> = componentWire.emit;

  const merge: Merger = adapters.merge || defaultMerge;

  let rootModel: M = null;

  const createComponent: CreateComponent<M, V, P> = (config: Config<M, V, P>) => {
    if (!config || (
      !config.actions &&
      !config.nextAction &&
      !config.initialModel &&
      !config.ready &&
      !config.receive &&
      !config.view
    )) {
      throw new Error("Please specify a config when calling createComponent.");
    }
    const initialModel: any = config.initialModel || {};
    rootModel = (rootModel === null) ? initialModel : merge(rootModel, initialModel);

    const actions = config.actions ? config.actions(propose) : propose;

    const receive: Receive<M, P> = config.receive;
    if (receive) {
      allReceives.push(receive);
    }

    const ready: Ready<P> = config.ready;
    if (ready) {
      allReadies.push(() => ready(actions));
    }

    const postRender: PostRender<V> = config.postRender;
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

  const run: Run<M, V> = (root: Component<M, V>) => {
    if (allReceives.length === 0) {
      allReceives.push(merge);
    }

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

    const renderRoot: RenderRoot<M> = (model: M) => {
      const rootView: V = root(model);
      adapters.render(rootView);
      allPostRenders.forEach((postRender: PostRender<V>) => postRender(rootView));
    };
    rootWire.listen(renderRoot);

    rootWire.emit(rootModel);
    allReadies.forEach((ready: Function) => ready());

    return renderRoot;
  };

  const meiosisInstance: Meiosis<M, V, P> = {
    createComponent,
    run
  };

  return meiosisInstance;
};

export {
  init,
  REFUSE_PROPOSAL
};
