import { Adapters } from "./adapters";
import { Config } from "./config";
import { Merger, defaultMerge } from "./merge";
import { NextUpdate } from "./nextUpdate";
import { PostRender } from "./postRender";
import { Ready } from "./ready";
import { ReceiveUpdate } from "./receiveUpdate";
import { Emitter, Listener, WireCreator, Wire, defaultWire } from "./wire";

interface Component {
  (model: any): any;
}

interface CreateComponent {
  (config: Config): Component;
}

interface Run {
  (model: any): any;
}

interface MeiosisInstance {
  createComponent: CreateComponent;
  run: Run;
}

interface Meiosis {
  (adapters: Adapters): MeiosisInstance;
}

const meiosis: Meiosis = (adapters: Adapters) => {
  let allReceiveUpdates: Array<ReceiveUpdate> = [];
  let allReadies: Array<Ready> = [];
  let allPostRenders: Array<PostRender> = [];

  const wire: WireCreator = adapters.wire || defaultWire;
  const rootWire = wire("meiosis");

  const merge: Merger = adapters.merge || defaultMerge;

  let rootModel: any = {};

  const createComponent: CreateComponent = (config: Config) => {
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
    rootModel = merge(rootModel, initialModel);

    const componentWire: Wire = wire();
    const sendUpdate: Emitter = componentWire.emit;
    const sendUpdateActions = {sendUpdate};
    const actions = config.actions ? merge(sendUpdateActions, config.actions(sendUpdate)) : sendUpdateActions;

    const receiveUpdate: ReceiveUpdate = config.receiveUpdate;
    if (receiveUpdate) {
      allReceiveUpdates.push(receiveUpdate);
    }

    const ready: Ready = config.ready;
    if (ready) {
      allReadies.push(() => ready(actions));
    }

    const postRender: PostRender = config.postRender;
    if (postRender) {
      allPostRenders.push(postRender);
    }

    componentWire.listen((update: any) => {
      allReceiveUpdates.forEach((receiveUpdate: ReceiveUpdate) => {
        rootModel = receiveUpdate(rootModel, update);
        return rootModel;
      });

      rootWire.emit(rootModel);

      if (config.nextUpdate) {
        config.nextUpdate(rootModel, update, actions);
      }
    });

    return (model: any) => config.view(model, actions);
  };

  const run = (root: Component) => {
    if (allReceiveUpdates.length === 0) {
      allReceiveUpdates.push(merge);
    }
    const renderRoot = (model: any) => {
      const rootView = root(model);
      adapters.render(rootView);
      allPostRenders.forEach((postRender: PostRender) => postRender(rootView));
    };
    rootWire.listen(renderRoot);

    rootWire.emit(rootModel);
    allReadies.forEach((ready: Function) => ready());

    return renderRoot;
  };

  const meiosisInstance: MeiosisInstance = { createComponent, run };

  return meiosisInstance;
};

export { meiosis };
