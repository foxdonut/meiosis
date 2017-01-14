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

  interface Scanner<A, B> {
    (acc: A, next: B): A;
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
     * Merges two streams.
     */
    merge<T>(stream1: Stream<T>, stream2: Stream<T>): Stream<T>;

    /**
     * Scans over a stream.
     */
    scan<A, B>(scanner: Scanner<A, B>, initial: A, stream: Stream<B>): Stream<A>;

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