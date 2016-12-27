declare namespace Flyd {
  /**
   * Interface that you get back from flyd.stream().
   */
  interface Stream<T> {
    /**
     * Gets the current value of the stream.
     */
    (): T;

    /**
     * Sets a new value on the stream.
     */
    (value: T): Stream<T>;
  }

  interface Mapper<T, R> {
    (value: T): R;
  }

  interface Scanner<T, R> {
    (acc: R, next: T): R;
  }

  /**
   * Top-level flyd declarations.
   */
  interface TopLevel {
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
    combine<A, B, C>(combinator: (stream1: Stream<A>, stream2: Stream<B>) => C,
      streams: Array<Stream<any>>): Stream<C>;

    /**
     * Maps over a stream.
     */
    map<T, R>(mapper: Mapper<T, R>, stream: Stream<T>): Stream<R>;

    /**
     * Scans over a stream.
     */
    scan<T, R>(scanner: Scanner<T, R>, initial: R, stream: Stream<T>): Stream<R>;

    /**
     * Similar to map, but for doing side effects and returns an empty stream.
     */
    on<T, R>(mapper: Mapper<T, R>, stream: Stream<T>): Stream<R>;
  }
}

declare const flyd: Flyd.TopLevel;

declare module "flyd" {
  export = flyd;
}