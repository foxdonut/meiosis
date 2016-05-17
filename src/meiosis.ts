import { Adapters } from "./adapters";
import { Config } from "./config";
import { Merger, defaultMerge } from "./merge";
import { NextUpdate } from "./nextUpdate";
import { PostRender } from "./postRender";
import { Ready } from "./ready";
import { ReceiveUpdate } from "./receiveUpdate";
import { Emitter, Listener, WireCreator, Wire, defaultWireCreator } from "./wire";

interface Component<M, V> {
  (model: M): V;
}

interface CreateComponent<M, V, U> {
  (config: Config<M, V, U>): Component<M, V>;
}

interface RenderRoot<M> {
  (model: M): void;
}

interface Run<M, V> {
  (component: Component<M, V>): RenderRoot<M>;
}

interface Meiosis<M, V, U> {
  createComponent: CreateComponent<M, V, U>;
  run: Run<M, V>;
}

const REFUSE_UPDATE = {};

function meiosis<M, V, U>(adapters: Adapters<M, V, U>): Meiosis<M, V, U> {
  let allReceiveUpdates: Array<ReceiveUpdate<M, U>> = [];
  let allReadies: Array<Ready<U>> = [];
  let allPostRenders: Array<PostRender<V>> = [];

  const createRootWire: WireCreator<M> = adapters.rootWire || defaultWireCreator();
  const createComponentWire: WireCreator<U> = adapters.componentWire || defaultWireCreator();
  const rootWire: Wire<M> = createRootWire("meiosis");

  const merge: Merger = adapters.merge || defaultMerge;

  let rootModel: M = null;

  const createComponent: CreateComponent<M, V, U> = (config: Config<M, V, U>) => {
    if (!config || (
      !config.actions &&
      !config.nextUpdate &&
      !config.initialModel &&
      !config.ready &&
      !config.receiveUpdate &&
      !config.view
    )) {
      throw new Error("Please specify a config when calling createComponent.");
    }
    const initialModel: any = config.initialModel || {};
    rootModel = (rootModel === null) ? initialModel : merge(rootModel, initialModel);

    const componentWire: Wire<U> = createComponentWire();
    const sendUpdate: Emitter<U> = componentWire.emit;
    const sendUpdateActions = {sendUpdate};
    const actions = config.actions ? merge(sendUpdateActions, config.actions(sendUpdate)) : sendUpdateActions;

    const receiveUpdate: ReceiveUpdate<M, U> = config.receiveUpdate;
    if (receiveUpdate) {
      allReceiveUpdates.push(receiveUpdate);
    }

    const ready: Ready<U> = config.ready;
    if (ready) {
      allReadies.push(() => ready(actions));
    }

    const postRender: PostRender<V> = config.postRender;
    if (postRender) {
      allPostRenders.push(postRender);
    }

    componentWire.listen((update: any) => {
      let accepted = true;

      for (let i: number = 0; i < allReceiveUpdates.length; i++) {
        const receiveUpdate: ReceiveUpdate<M, U> = allReceiveUpdates[i];
        const receivedUpdate: M = receiveUpdate(rootModel, update);

        if (receivedUpdate === REFUSE_UPDATE) {
          accepted = false;
          break;
        }
        else {
          rootModel = receivedUpdate;
        }
      };

      if (accepted) {
        rootWire.emit(rootModel);

        if (config.nextUpdate) {
          config.nextUpdate(rootModel, update, actions);
        }
      }
    });

    return (model: M) => config.view(model, actions);
  };

  const run: Run<M, V> = (root: Component<M, V>) => {
    if (allReceiveUpdates.length === 0) {
      allReceiveUpdates.push(merge);
    }
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

  const meiosisInstance: Meiosis<M, V, U> = {
    createComponent,
    run
  };

  return meiosisInstance;
};

export {
  meiosis,
  Component,
  CreateComponent,
  Meiosis,
  RenderRoot,
  REFUSE_UPDATE
};
