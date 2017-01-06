import * as flyd from "flyd";

export type Stream<T> = Flyd.Stream<T>;
export type Scanner<T, R> = Flyd.Scanner<T, R>;
export type Mapper<T, R> = Flyd.Mapper<T, R>;

export interface ScannerSpec<T, R> {
  [name: string]: Scanner<T, R> | Scanner<T, R>;
}

export interface MapperSpec<T, R> {
  [name: string]: Mapper<T, R> | Mapper<T, R>;
}

export interface RunParameters<C, P> {
  initial: C;
  scanner: ScannerSpec<P, C>;
  mappers?: Array<MapperSpec<any, any>>;
  render?: any;//FIXME
}

export interface MeiosisRun<C, P> {
  (params: RunParameters<C, P>): MeiosisApp;
}

export interface MeiosisInstance<C, P> {
  propose: Stream<P>;
  run: MeiosisRun<C, P>;
}

export interface MeiosisApp {
  [key: string]: Stream<any>;
}

const getName = (value: any) => typeof value === "function" ? undefined : Object.keys(value)[0];
const getFn = (value: any) => {
  const name = getName(value);
  return name ? value[name] : value;
};

function newInstance<C, P>(): MeiosisInstance<C, P> {
  const propose: Stream<P> = flyd.stream<P>();

  const run = (params: RunParameters<C, P>): MeiosisApp => {
    if (!params.initial || !params.scanner) {
      throw new Error("Please specify initial and scanner.");
    }
    const streams: MeiosisApp = {};

    const scanner: ScannerSpec<P, C> = params.scanner;
    const name: string = getName(scanner);
    const fn: Scanner<P, C> = getFn(scanner);

    let lastStream: Stream<any> = flyd.scan(fn, params.initial, propose);
    name && (streams[name] = lastStream);

    (params.mappers || []).forEach(mapper => {
      const name: string = getName(mapper);
      const fn: Mapper<any, any> = getFn(mapper);

      lastStream = flyd.map(fn, lastStream);
      name && (streams[name] = lastStream);
    });

    const devtool: any = window && window["__MEIOSIS_TRACER_GLOBAL_HOOK__"];
    if (devtool && params.render) {
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
          window.postMessage({ type: "MEIOSIS_INITIAL_MODEL", model: params.initial }, "*");
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

export const {
  combine,
  map,
  merge,
  on,
  scan
} = flyd;
