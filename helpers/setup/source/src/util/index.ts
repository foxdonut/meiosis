import { MeiosisCell } from '../common';

/**
 * Safely gets a property path from an object. The path is an array. If any property along the path
 * is `undefined`, the function returns `undefined`.
 *
 * @param object the object on which to get the property.
 * @param path the property path.
 *
 * @returns the property value, or `undefined` if any property along the path is `undefined`.
 */
export const get = (object: Record<string, any> | null | undefined, path: string[]): any =>
  path.reduce((obj, key) => (obj == undefined ? undefined : obj[key]), object);

/**
 * Associates a property value to a target object.
 *
 * @param prop the property name
 * @param value the property value
 * @param result the target object
 *
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
 *
 * @returns the target array with the source concatenated if the source is present, otherwise the
 * target array unchanged.
 */
export const concatIfPresent = (target: any[], source?: any[]): any[] =>
  source ? target.concat(source) : target;

// helpers to update values from input

/**
 * Represents a DOM event.
 */
export interface DomEvent {
  target: {
    value: string;
  };
}

type Updatable = {
  update: (value: any) => any;
};

type ParseFn = (value: string) => number;

const intoPath = (path: string[], value: string | number): any => ({
  [path[0]]: path.length === 1 ? value : intoPath(path.slice(1), value)
});

const toPath = (pathOrProp: string[] | string): string[] =>
  Array.isArray(pathOrProp) ? pathOrProp : [pathOrProp];

const updateParseValue =
  (parseFn: ParseFn, cell: Updatable, path: string[] | string) =>
    (evt: DomEvent) => {
      const value = parseFn(evt.target.value);
      if (!isNaN(value)) {
        cell.update(intoPath(toPath(path), value));
      }
    };

/**
 * Convenience function to update a form value. Pass the Meiosis cell and the state property (such
 * as `'firstName'`) or path (such as `['person', 'firstName']`) into which to update the value.
 * Returns a function that you can pass to a DOM handler, such as `oninput` (Mithril) or `onInput`
 * (Preact, React). For example:
 *
 * ```js
 * // Using Mithil
 * m('input[type=text]', { oninput: updateFormValue(cell, 'firstName') })
 *
 * // Using Preact/React
 * <input type="text" onInput={updateFormValue(cell, ['person', 'firstName'])}/>
 * ```
 *
 * @param cell the Meiosis cell.
 * @param path the property or path into which to update the value.
 * @param fn (optional) a function to modify the value before updating it.
 *
 * @returns a function that accepts a DOM event and updates the value on the Meiosis state.
 */
export const updateFormValue = (
  cell: MeiosisCell<any>,
  path: string[] | string,
  fn: (value: string) => any = (value) => value
) => (evt: DomEvent) => cell.update(intoPath(toPath(path), fn(evt.target.value)));
/**
 * Convenience function to update a form value with an Integer value. If the user input does not
 * return a number with `parseInt`, no state change occurs. Pass the Meiosis cell and the state
 * property (such as `'counter'`) or path (such as `['book', 'counter']`) into which to update the
 * value. Returns a function that you can pass to a DOM handler, such as `oninput` (Mithril) or
 * `onInput` (Preact, React). For example:
 *
 * ```js
 * // Using Mithil
 * m('input[type=text]', { oninput: updateFormIntValue(cell, 'counter') })
 *
 * // Using Preact/React
 * <input type="text" onInput={updateFormIntValue(cell, ['book', 'counter'])}/>
 * ```
 *
 * @param cell the Meiosis cell.
 * @param path the property or path into which to update the value.
 *
 * @returns a function that accepts a DOM event and updates the value on the Meiosis state.
 */
export const updateFormIntValue = (cell: MeiosisCell<any>, path: string[] | string) =>
  (evt: DomEvent) => updateParseValue(parseInt, cell, path)(evt);

/**
 * Convenience function to update a form value with a Float value. If the user input does not return
 * a number with `parseFloat`, no state change occurs. Pass the Meiosis cell and the state property
 * (such as `'pH'`) or path (such as `['water', 'pH']`) into which to update the value. Returns a
 * function that you can pass to a DOM handler, such as `oninput` (Mithril) or `onInput` (Preact,
 * React). For example:
 *
 * ```js
 * // Using Mithil
 * m('input[type=text]', { oninput: updateFormFloatValue(cell, 'pH') })
 *
 * // Using Preact/React
 * <input type="text" onInput={updateFormFloatValue(cell, ['water', 'pH'])}/>
 * ```
 *
 * @param cell the Meiosis cell.
 * @param path the property or path into which to update the value.
 *
 * @returns a function that accepts a DOM event and updates the value on the Meiosis state.
 */
export const updateFormFloatValue = (cell: MeiosisCell<any>, path: string[] | string) =>
  (evt: DomEvent) => updateParseValue(parseFloat, cell, path)(evt);
