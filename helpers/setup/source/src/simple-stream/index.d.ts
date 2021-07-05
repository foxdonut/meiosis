import { Stream, StreamLibWithProperty, Scan } from "../common";

/**
 * Creates a stream.
 *
 * @template T the type of the stream's values.
 *
 * @param value the stream's initial value.
 *
 * @returns the created stream.
 */
export function stream<T>(value?: T): Stream<T>;

/**
 * Creates a new stream that starts with the initial value and, for each value arriving onto the
 * source stream, emits the result of calling the accumulator function with the latest result and
 * the source stream value.
 */
export const scan: Scan;

export const streamLib: StreamLibWithProperty;

export default streamLib;
