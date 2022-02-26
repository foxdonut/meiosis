/**
 * Safely gets a property path from an object. The path is an array. If any property along the path
 * is `undefined`, the function returns `undefined`.
 *
 * @param {*} object the object on which to get the property.
 * @param {Array<string>} path the property path.
 *
 * @returns {*} the property value, or `undefined` if any property along the path is `undefined`.
 */
export const get = (object: Record<string, any>, path: string[]): any =>
  path.reduce((obj, key) => (obj == undefined ? undefined : obj[key]), object);
