export type Map = <T, U>(fn: (value: T) => U) => Stream<U>;

export interface Stream<T> {
  (value?: T): T;
  map<U>(fn: (value: T) => U): Stream<U>;
}

export type StreamConstructor = <T>(value?: T) => Stream<T>;
export type Scan = <T, U>(acc: (result: U, next: T) => U, init: U, stream: Stream<T>) => Stream<U>;

interface StreamScan {
  scan: Scan;
}

interface StreamLibWithFunction extends StreamScan {
  <T>(value?: T): Stream<T>;
}

interface StreamLibWithProperty extends StreamScan {
  stream?<T>(value?: T): Stream<T>;
}

/**
 * Stream library. This works with `meiosis.simpleStream`, `flyd`, `m.stream`, or anything for
 * which you provide either a function or an object with a `stream` function to create a stream. The
 * function or object must also have a `scan` property. The returned stream must have a `map`
 * method.
 */
export type StreamLib = StreamLibWithFunction | StreamLibWithProperty;

export type Accumulator<S, P> = (state: S, patch: P) => S;
export type Combine<P> = (patches: P[]) => P | P[];
export type Service<S, P> = (state: S) => P;
export type Effect<S> = (state: S) => void;
export type ActionConstructor<S, P, A> = (update: Stream<P>, states?: Stream<S>) => A;
export type EffectConstructor<S, P, A> = (update: Stream<P>, actions?: A) => Effect<S>[];

/**
 * Application object.
 */
export type App<S, P, A> = {
  /**
   * an object that represents the initial state.
   * If not specified, the initial state will be `{}`.
   */
  initial?: S;
  /**
   * an array of service functions, each of which
   * should be `state => patch?`.
   */
  services?: Service<S, P>[];
  /**
   * a function that creates actions, of the form
   * `update => actions`.
   */
  Actions?: ActionConstructor<S, P, A>;
  /**
   * a function that creates effects, of the form
   * `(update, actions) => [effects]`, which each effect is `state => void` and calls `update`
   * and/or `actions`.
   */
  Effects?: EffectConstructor<S, P, A>;
};

export type MeiosisConfig<S, P, A> = {
  /**
   * the stream library. This works with `meiosis.simpleStream`, `flyd`, `m.stream`, or anything for
   * which you provide either a function or an object with a `stream` function to create a stream.
   * The function or object must also have a `scan` property. The returned stream must have a `map`
   * method.
   */
  stream: StreamLib;
  /**
   * the accumulator function.
   */
  accumulator: Accumulator<S, P>;
  /**
   * the function that combines an array of patches into one patch.
   */
  combine: Combine<P>;
  /**
   * the app, with optional properties.
   */
  app: App<S, P, A>;
};

export type Meiosis<S, P, A> = {
  states: Stream<S>;
  update: Stream<P>;
  actions: A;
};

declare function _default<S, P, A>({
  stream,
  accumulator,
  combine,
  app
}: MeiosisConfig<S, P, A>): Meiosis<S, P, A>;

export default _default;

export interface LocalPath {
  path: Array<string>;
}

type NestPatchFunction<P2, P1> = (patch: P2) => P1;

export interface LocalPatch<P1, P2> {
  patch: NestPatchFunction<P2, P1>;
}

export interface Local<S1, P1, S2, P2> extends LocalPath, LocalPatch<P1, P2> {
  get: (state: S1) => S2;
}

type NestFunction<S1, P1, S2, P2> = (
  path: string | Array<string>,
  local?: LocalPath
) => Local<S1, P1, S2, P2>;

declare function Nest<S1, P1, S2, P2>(
  createNestPatchFunction: (path: Array<string>) => NestPatchFunction<P2, P1>
): NestFunction<S1, P1, S2, P2>;

export { Nest };
