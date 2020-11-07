import { App, Meiosis, NestFunction, StreamLib } from "../common";

export type ImmerPatch<S> = (state: S) => S | void;

export type MeiosisImmerConfig<S, A> = {
  /**
   * The stream library. This works with `meiosis.simpleStream`, `flyd`, `m.stream`, or anything for
   * which you provide either a function or an object with a `stream` function to create a stream.
   * The function or object must also have a `scan` property. The returned stream must have a `map`
   * method.
   */
  stream: StreamLib;
  /**
   * the Immer `produce` function.
   */
  produce: (state: S, patch: ImmerPatch<S>) => S;
  /**
   * the app, with optional properties.
   */
  app: App<S, ImmerPatch<S>, A>;
};

declare function _default<S, A>({
  stream,
  produce,
  app
}: MeiosisImmerConfig<S, A>): Meiosis<S, ImmerPatch<S>, A>;

export default _default;

export const nest: NestFunction;
