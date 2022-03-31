/**
 * Safely gets a property path from an object. The path is an array. If any property along the path
 * is `undefined`, the function returns `undefined`.
 *
 * @param {*} object the object on which to get the property.
 * @param {Array<string>} path the property path.
 *
 * @returns {*} the property value, or `undefined` if any property along the path is `undefined`.
 */
export const get = (object: Record<string, any> | undefined, path: string[]): any =>
  path.reduce((obj, key) => (obj == undefined ? undefined : obj[key]), object);

/**
 * Associates a property value to a target object.
 *
 * @param prop the property name
 * @param value the property value
 * @param result the target object
 * @returns the target object with the associated property
 */
export const assoc = (prop: string, value: unknown, target: Record<string, any>): any => {
  target[prop] = value;
  return target;
};

/**
 * Concatenates a source array to a target array only if the source array is present.
 *
 * @param target the target array
 * @param source the source array
 * @returns the target array with the source concatenated if the source is present, otherwise the
 * target array unchanged.
 */
export const concatIfPresent = (target: any[], source?: any[]): any[] =>
  source ? target.concat(source) : target;
