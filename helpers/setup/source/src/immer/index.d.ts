import { App, Meiosis, LocalPath, Local, StreamLib } from "../common";

export type ImmerPatch<S> = (state: S) => S | void;

export type Produce<S> = (state: S, patch: ImmerPatch<S>) => S;

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
  produce: Produce<S>;
  /**
   * the app, with optional properties.
   */
  app: App<S, ImmerPatch<S>, A>;
};

/**
 * Helper to setup the Meiosis pattern with [Immer](https://immerjs.github.io/immer).
 *
 * @template S the State type.
 * @template A the Actions type.
 * @param {MeiosisImmerConfig<S, A>} config the Meiosis config for use with Immer
 *
 * @returns {import("../common").Meiosis<S, ImmerPatch<S>, A>} `{ states, update, actions }`,
 * where `states` and `update` are streams, and `actions` are the created actions.
 */
export function immerSetup<S, A>({
  stream,
  produce,
  app
}: MeiosisImmerConfig<S, A>): Meiosis<S, ImmerPatch<S>, A>;

export default immerSetup;

export function nest<S1, P1, S2, P2>(
  produce: Produce<S1>
): (path: string | Array<string>, local?: LocalPath) => Local<S1, P1, S2, P2>;
