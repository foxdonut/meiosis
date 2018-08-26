/* global R */

const nestUpdate = (update, path) => func =>
  update(R.over(R.lensPath(path), func));

// eslint-disable-next-line no-unused-vars
const nest = (create, update, path) => {
  const component = create(nestUpdate(update, path));
  const result = R.merge({}, component);
  if (component.model) {
    result.model = () => R.assocPath(path, component.model(), {});
  }
  if (component.view) {
    result.view = R.compose(component.view, R.path(path));
  }
  return result;
};
