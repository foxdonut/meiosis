import { Adapters } from "./adapters";
import { Config } from "./config";
import { Merger, defaultMerge } from "./merge";
import { NextUpdate } from "./nextUpdate";
import { ReceiveUpdate } from "./receiveUpdate";
import { Emitter, Listener, WireCreator, Wire, defaultWire } from "./wire";

interface Component {
  (props: any): any;
}

interface CreateComponent {
  (config: Config): Component;
}

interface MeiosisInstance {
  createComponent: CreateComponent;
}

interface Meiosis {
  (adapters: Adapters): MeiosisInstance;
}

const meiosis = (adapters: Adapters) => {
  let allReceiveUpdates: Array<ReceiveUpdate> = [];

  const wire: WireCreator = adapters.wire || defaultWire;
  const rootWire = wire("meiosis");

  const merge: Merger = adapters.merge || defaultMerge;

  let rootModel: any = {};

  const createComponent = (config: Config) => {
    if (!config || (
      !config.actions &&
      !config.nextUpdate &&
      !config.initialModel &&
      !config.receiveUpdate &&
      !config.view
    )) {
      throw new Error("Please specify a config when calling createComponent.");
    }
    rootModel = merge(rootModel, config.initialModel || {});

    const componentWire: Wire = wire();
    const sendUpdate: Emitter = componentWire.emit;
    const sendUpdateActions = {sendUpdate};
    const actions = config.actions ? merge(sendUpdateActions, config.actions(sendUpdate)) : sendUpdateActions;

    const receiveUpdate: ReceiveUpdate = config.receiveUpdate;
    if (receiveUpdate) {
      allReceiveUpdates.push(receiveUpdate);
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
    const renderRoot = (model: any) => { adapters.render(root(model)); };
    rootWire.listen(renderRoot);

    rootWire.emit(rootModel);

    return renderRoot;
  };

  return { createComponent, run };
};

export { meiosis };
