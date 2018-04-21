const nestUpdate = (update, path) => func =>
  update(_.update(path, func));

const nest = (create, update, path) => {
  const component = create(nestUpdate(update, path));
  const result = _.merge({}, component);
  if (component.model) {
    result.model = () => _.set(path, component.model(), {});
  }
  if (component.view) {
    result.view = _.flowRight([component.view, _.get(path)]);
  }
  return result;
};
