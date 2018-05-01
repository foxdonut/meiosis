/* global O */

const get = (object, path, defaultValue) =>
  object == null
    ? defaultValue
    : path.length === 1
      ? object[path[0]]
      : get(object[path[0]], path.slice(1));

const nestPatch = (object, path) => ({
  [path[0]]: path.length === 1
    ? O(object)
    : O(nestPatch(object, path.slice(1)))
});

const nestUpdate = (update, path) => patch =>
  update(nestPatch(patch, path));

// eslint-disable-next-line no-unused-vars
const nest = (create, update, path) => {
  path = Array.isArray(path) ? path : [ path ];
  const component = create(nestUpdate(update, path));
  const result = O({}, component);
  if (component.model) {
    result.model = () => nestPatch(component.model(), path);
  }
  if (component.view) {
    result.view = model => component.view(get(model, path));
  }
  return result;
};
