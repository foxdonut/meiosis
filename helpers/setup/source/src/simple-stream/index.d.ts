import { Stream, StreamLib, Scan } from "../common";

export interface SimpleStream extends StreamLib {
  stream<T>(value?: T): Stream<T>;
}

export function stream<T>(value?: T): Stream<T>;

export const scan: Scan;

declare const _default: SimpleStream;

export default _default;
