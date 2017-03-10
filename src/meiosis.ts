export interface Mapper<A, B> {
  (value: A): B;
}

export interface Stream<T> {
  /**
   * Gets the current value of the stream.
   */
  (): T;

  /**
   * Sets a new value on the stream.
   */
  (value: T): Stream<T>;

  /**
   * Maps over a stream.
   */
  map<T, R>(mapper: Mapper<T, R>): Stream<R>;
}

/**
 * Top-level stream library declarations.
 */
export interface StreamLibrary {
  /**
   * Creates a stream.
   */
  stream<T>(): Stream<T>;

  /**
   * Creates a stream with an initial value.
   */
  stream<T>(value: T): Stream<T>;
}

export interface StreamLibraryCombine extends StreamLibrary {
  /**
   * Combines streams.
   */
  combine<T>(combinator: (...streams: Array<Stream<any>>) => T,
    streams: Array<Stream<any>>): Stream<T>;
}

export interface Scanner<A, B> {
  (acc: A, next: B): A;
}

export interface TraceParameters<M> {
  streamLibrary: StreamLibrary;
  modelChanges: Stream<any>;
  streams: Array<Stream<any>>;
  copy?: Function;
}

export const createScan = (streamLibrary: StreamLibraryCombine) => function<A, B>(fn: Scanner<A, B>, acc: A, s: Stream<B>) {
  const result = streamLibrary.combine(s => {
    acc = fn(acc, s());
    return acc;
  }, [s]);

  if (!result()) {
    result(acc);
  }
  return result;
};

export function trace<M>(params: TraceParameters<M>): void {
  if (!params.streamLibrary || !params.modelChanges || !params.streams) {
    throw new Error("Please specify streamLibrary, modelChanges, and streams.");
  }

  const devtool: boolean = window && window["__MEIOSIS_TRACER_GLOBAL_HOOK__"];
  if (devtool) {
    const copy: any = params.copy || ((model: M) => JSON.parse(JSON.stringify(model)));
    const bufferedValues: Array<any> = [];
    let devtoolInitialized: boolean = false;
    const sendValues: Stream<boolean> = params.streamLibrary.stream(true);

    let changes: Stream<Date> = params.streamLibrary.stream(new Date());
    let lastChange: Date = changes();
    params.modelChanges.map(() => changes(new Date()));

    const firstStream = params.streams[0];
    const lastStream = params.streams[params.streams.length - 1];

    window.addEventListener("message", evt => {
      if (evt.data.type === "MEIOSIS_RENDER_MODEL") {
        sendValues(evt.data.sendValuesBack);
        params.streams[0](evt.data.model);
      }
      else if (evt.data.type === "MEIOSIS_TRACER_INIT") {
        devtoolInitialized = true;
        bufferedValues.forEach(values => window.postMessage({ type: "MEIOSIS_VALUES", values, update: true }, "*"));
      }
    });

    lastStream.map(() => {
      const change: Date = changes();
      const update: boolean = change !== lastChange;
      lastChange = change;

      const values: Array<any> = params.streams.map((stream: Stream<any>) =>
        ({ value: copy(stream()) }));

      if (sendValues() || update) {
        if (devtoolInitialized) {
          window.postMessage({ type: "MEIOSIS_VALUES", values, update }, "*");
        }
        else {
          bufferedValues.push(values);
        }
      }
    });
  }
};
