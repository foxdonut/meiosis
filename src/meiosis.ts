import { Adapters } from "./adapters";
import { Config } from "./config";
import { Merger, defaultMerge } from "./merge";
import { Receiver } from "./receivers";
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
  let allReceivers: Array<Receiver> = [];

  const wire: WireCreator = adapters.wire || defaultWire;
  const rootWire = wire("meiosis");

  const merge: Merger = adapters.merge || defaultMerge;

  let rootModel: any = {};

  const createComponent = (config: Config) => {
    if (!config || !config.view) {
      throw new Error("At a minimum, you need to specify a view to create a component.");
    }
    rootModel = merge(rootModel, config.initialModel || {});

    const componentWire: Wire = wire();
    const next: Emitter = componentWire.emit;
    const nextAction = {next};
    const actions = config.actions ? merge(nextAction, config.actions(next)) : nextAction;

    const receivers: Array<Receiver> = config.receivers;
    if (receivers && Array === receivers.constructor) {
      Array.prototype.push.apply(allReceivers, receivers);
    }

    componentWire.listen(update => {
      const updateTr: any = config.transform ? config.transform(rootModel, update) : update;

      allReceivers.forEach((receiver: Receiver) => {
        rootModel = receiver(rootModel, updateTr);
        return rootModel;
      });

      rootWire.emit(rootModel);

      if (config.chain) {
        config.chain(update, actions);
      }
    });

    return (props: any) => { props.actions = actions; return config.view(props); };
  };

  const run = (root: Component) => {
    if (allReceivers.length === 0) {
      allReceivers.push(merge);
    }
    const renderRoot = (model: any) => { adapters.render(root({ model })); };
    rootWire.listen(renderRoot);

    rootWire.emit(rootModel);

    return renderRoot;
  };

  return { createComponent, run };
};

export { meiosis };
