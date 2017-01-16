/// <reference path="../lib/flyd.d.ts" />

import * as flyd from "flyd";

export type Stream<T> = Flyd.Stream<T>;
export type Scanner<M, P> = Flyd.Scanner<M, P>;
export type Mapper<A, B> = Flyd.Mapper<A, B>;

export interface ScannerSpec<M, P> {
  [name: string]: Scanner<M, P> | Scanner<M, P>;
}

export interface MapperSpec<A, B> {
  [name: string]: Mapper<A, B> | Mapper<A, B>;
}

export interface RunParameters<M, P> {
  initialModel: M;
  scanner: ScannerSpec<M, P>;
  mappers?: Array<MapperSpec<any, any>>;
  nextAction?: Function;
  copy?: any;//FIXME
}

export interface MeiosisRun<M, P> {
  (params: RunParameters<M, P>): MeiosisApp;
}

export interface MeiosisInstance<M, P> {
  propose: Stream<P>;
  run: MeiosisRun<M, P>;
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

const getName = (value: any) => typeof value === "function" ? undefined : Object.keys(value)[0];
const getFn = (value: any) => {
  const name = getName(value);
  return name ? value[name] : value;
};

function newInstance<M, P>(): MeiosisInstance<M, P> {
  const propose: Stream<P> = stream<P>();

  const run = (params: RunParameters<M, P>): MeiosisApp => {
    if (!params.initialModel || !params.scanner) {
      throw new Error("Please specify initialModel and scanner.");
    }
    const streams: MeiosisApp = {};
    const allStreams: Array<NamedStream> = [];

    const scanner: ScannerSpec<M, P> = params.scanner;
    const scannerName: string = getName(scanner);
    const scannerFn: Scanner<M, P> = getFn(scanner);

    let lastStream: Stream<any> = scan(scannerFn, params.initialModel, propose);
    const scannerStream = lastStream;
    scannerName && (streams[scannerName] = lastStream);
    allStreams.push({ name: (scannerName || ""), stream: lastStream });

    (params.mappers || []).forEach(mapper => {
      const mapperName: string = getName(mapper);
      const mapperFn: Mapper<any, any> = getFn(mapper);

      lastStream = map(mapperFn, lastStream);
      mapperName && (streams[mapperName] = lastStream);
      allStreams.push({ name: (mapperName || ""), stream: lastStream });
    });

    if (params.nextAction) {
      const rendered: Stream<any> = stream();
      let lastProposal: P = propose();

      on((value: any) => {
        const proposal: P = propose();

        if (proposal !== lastProposal) {
          params.nextAction(value);
        }
        lastProposal = proposal;
      }, rendered);

      streams["rendered"] = rendered;
    }

    const devtool: boolean = !!window;
    if (devtool) {
      const copy: any = params.copy || ((model: M) => JSON.parse(JSON.stringify(model)));
      const bufferedValues: Array<any> = [];
      let devtoolInitialized: boolean = false;
      let devLastProposal: P = propose();
      const sendValues: Stream<boolean> = stream(true);

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
        const proposal: P = propose();
        const update: boolean = proposal !== devLastProposal;
        devLastProposal = proposal;

        const values: Array<NamedValue> = allStreams.map((namedStream: NamedStream) =>
          ({ name: namedStream.name, value: copy(namedStream.stream()) }));
        values.unshift({ name: "proposal", value: proposal });

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
    propose,
    run
  };
}

const instance = newInstance<any, any>();
const propose = instance.propose;
const run = instance.run;

export {
  newInstance,
  propose,
  run
};
