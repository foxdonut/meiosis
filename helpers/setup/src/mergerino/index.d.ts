import { App, Meiosis, StreamLib } from "../common";

export type MeiosisMergerinoConfig<S, A> = {
  /**
   * The stream library. This works with `meiosis.simpleStream`, `flyd`, `m.stream`, or anything for
   * which you provide either a function or an object with a `stream` function to create a stream.
   * The function or object must also have a `scan` property. The returned stream must have a `map`
   * method.
   */
  stream: StreamLib;
  /**
   * The Mergerino `merge` function.
   */
  merge: (state: S, patch: any) => S;
  /**
   * The app, with optional properties.
   */
  app: App<S, any, A>;
};

declare function _default<S, A>({
  stream,
  merge,
  app
}: MeiosisMergerinoConfig<S, A>): Meiosis<S, any, A>;

export default _default;
