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

  /**
   * Combines streams.
   */
  combine<T>(combinator: (...streams: Array<Stream<any>>) => T,
    streams: Array<Stream<any>>): Stream<T>;
}
  /**
   * Maps over a stream.
   */
  //map<T, R>(mapper: Mapper<T, R>, stream: Stream<T>): Stream<R>;

  /**
   * Merges two streams.
   */
  //merge<T>(stream1: Stream<T>, stream2: Stream<T>): Stream<T>;

  /**
   * Scans over a stream.
   */
  //scan<A, B>(scanner: Scanner<A, B>, initial: A, stream: Stream<B>): Stream<A>;

  /**
   * Similar to map, but for doing side effects and returns an empty stream.
   */
  //on<T, R>(mapper: Mapper<T, R>, stream: Stream<T>): Stream<R>;

export interface Scanner<A, B> {
  (acc: A, next: B): A;
}

export interface RunParameters<M> {
  streams: Array<Stream<any>>;
  streamLibrary: StreamLibrary;
  copy?: any;//FIXME
}

export const createMergeAll = (streamLibrary: StreamLibrary) => (streams: Array<Stream<any>>) => {
  const merged = streamLibrary.stream();
  streams.forEach(s => s.map(merged));
  return merged;
};

export const createScan = (lib: StreamLibrary) => function<A, B>(fn: Scanner<A, B>, acc: A, s: Stream<B>) {
  const result = lib.combine(s => {
    acc = fn(acc, s());
    return acc;
  }, [s]);

  if (!result()) {
    result(acc);
  }
  return result;
};

/*
export function trace<M>(params: RunParameters<M>): void {
  if (!params.streams) {
    throw new Error("Please specify streams.");
  }

  const devtool: boolean = window && window["__MEIOSIS_TRACER_GLOBAL_HOOK__"];
  if (devtool) {
    const copy: any = params.copy || ((model: M) => JSON.parse(JSON.stringify(model)));
    const bufferedValues: Array<any> = [];
    let devtoolInitialized: boolean = false;
    const sendValues: Stream<boolean> = params.streamLibrary.stream(true);

    let changes: Stream<Date> = params.streamLibrary.stream(new Date());
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

      const values: Array<NamedValue> = streams.map((namedStream: NamedStream) =>
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
};
*/
