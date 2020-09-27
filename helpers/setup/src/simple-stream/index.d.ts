import { Stream, StreamLib } from "../common";

export interface SimpleStream extends StreamLib {
  stream<T>(value?: T): Stream<T>;
}

declare const _default: SimpleStream;

export default _default;
