/// <reference path="../lib/flyd.d.ts" />

import * as flyd from "flyd";

export type Stream<T> = Flyd.Stream<T>;
export type Scanner<A, B> = Flyd.Scanner<A, B>;
export type Mapper<A, B> = Flyd.Mapper<A, B>;

export interface MapperSpec<A, B> {
  [name: string]: Mapper<A, B>;
}

export interface ModelChange<M> {
  (model: M): M;
}

export interface NextAction {
  (model: any): void;
}

export interface RunParameters<M> {
  initialModel: M;
  modelChanges: Stream<ModelChange<M>>;
  mappers?: Array<MapperSpec<any, any> | Mapper<any, any>>;
  nextAction?: NextAction;
  copy?: any;//FIXME
}

export interface MeiosisRun<M> {
  (params: RunParameters<M>): MeiosisApp;
}

export interface MeiosisInstance<M> {
  run: MeiosisRun<M>;
}

export interface MeiosisApp {
  [key: string]: Stream<any>;
}

interface NamedStream {
  name: string;
  stream: Stream<any>;
}

interface NamedValue {
  name: string;
  value: any;
}

export const {
  combine,
  map,
  merge,
  on,
  scan,
  stream
} = flyd;

export const mergeAll = (streams: Array<Stream<any>>) => {
  const merged = stream();
  streams.forEach(s => map(merged, s));
  return merged;
};

const getName = (value: any) => typeof value === "function" ? undefined : Object.keys(value)[0];
const getFn = (value: any) => {
  const name = getName(value);
  return name ? value[name] : value;
};

function newInstance<M>(): MeiosisInstance<M> {
  const run = (params: RunParameters<M>): MeiosisApp => {
    if (!params.initialModel || !params.modelChanges) {
      throw new Error("Please specify initialModel and modelChanges.");
    }
    const streams: MeiosisApp = {};
    const allStreams: Array<NamedStream> = [];

    let lastStream: Stream<M> = scan((model: M, modelChange: ModelChange<M>) => modelChange(model),
      params.initialModel, params.modelChanges);

    const scannerStream = lastStream;
    const scannerName = "modelChanges";
    streams[scannerName] = lastStream;
    allStreams.push({ name: scannerName, stream: lastStream });

    (params.mappers || []).forEach(mapper => {
      const mapperName: string = getName(mapper);
      const mapperFn: Mapper<any, any> = getFn(mapper);

      lastStream = map(mapperFn, lastStream);
      mapperName && (streams[mapperName] = lastStream);
      allStreams.push({ name: (mapperName || ""), stream: lastStream });
    });

    const render: Stream<any> = stream();

    /*
    if (params.nextAction) {
      let lastProposal: P = propose();

      on((value: any) => {
        const proposal: P = propose();

        render(value);
        if (proposal !== lastProposal) {
          params.nextAction(value, proposal);
        }
        lastProposal = proposal;
      }, lastStream);
    }
    else {
    */
      on(render, lastStream);
    //}

    streams["render"] = render;

    const devtool: boolean = window && window["__MEIOSIS_TRACER_GLOBAL_HOOK__"];
    if (devtool) {
      const copy: any = params.copy || ((model: M) => JSON.parse(JSON.stringify(model)));
      const bufferedValues: Array<any> = [];
      let devtoolInitialized: boolean = false;
      const sendValues: Stream<boolean> = stream(true);

      let changes: Stream<Date> = stream(new Date());
      let lastChange: Date = changes();
      on(() => changes(new Date()), params.modelChanges);

      window.addEventListener("message", evt => {
        if (evt.data.type === "MEIOSIS_RENDER_MODEL") {
          sendValues(evt.data.sendValuesBack);
          scannerStream(evt.data.model);
        }
        else if (evt.data.type === "MEIOSIS_TRACER_INIT") {
          devtoolInitialized = true;
          bufferedValues.forEach(values => window.postMessage({ type: "MEIOSIS_VALUES", values }, "*"));
        }
      });

      on(() => {
        const change: Date = changes();
        const update: boolean = change !== lastChange;
        lastChange = change;

        const values: Array<NamedValue> = allStreams.map((namedStream: NamedStream) =>
          ({ name: namedStream.name, value: copy(namedStream.stream()) }));

        if (sendValues()) {
          if (devtoolInitialized) {
            window.postMessage({ type: "MEIOSIS_VALUES", values, update }, "*");
          }
          else {
            bufferedValues.push(values);
          }
        }
      }, lastStream);
    }

    return streams;
  };

  return {
    run
  };
}

const instance = newInstance<any>();
const run = instance.run;

export {
  newInstance,
  run
};
