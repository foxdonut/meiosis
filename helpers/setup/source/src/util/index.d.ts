/**
 * Safely gets a property path from an object. The path is an array. If any property along the path
 * is `undefined`, the function returns `undefined`.
 *
 * @param {*} object the object on which to get the property.
 * @param {Array<string>} path the property path.
 *
 * @returns {*} the property value, or `undefined` if any property along the path is `undefined`.
 */
export function get(object: any, path: Array<string>): any;

export function setMutate(object: any, path: Array<string>, value: any): any;

export function setImmutable<T>(object: T, path: Array<string>, value: any): T;
