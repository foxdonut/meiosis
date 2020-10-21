import { App, Meiosis, StreamLib } from "../common";

export type MeiosisFunctionPatchesConfig<S, P, A> = {
  /**
   * The stream library. This works with `meiosis.simpleStream`, `flyd`, `m.stream`, or anything for
   * which you provide either a function or an object with a `stream` function to create a stream.
   * The function or object must also have a `scan` property. The returned stream must have a `map`
   * method.
   */
  stream: StreamLib;
  /**
   * the app, with optional properties.
   */
  app: App<S, P, A>;
};

declare function _default<S, P, A>({
  stream,
  app
}: MeiosisFunctionPatchesConfig<S, P, A>): Meiosis<S, P, A>;

export default _default;
