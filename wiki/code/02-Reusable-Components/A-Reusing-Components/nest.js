const nestUpdate = (update, path) => func =>
  update(model => {
    model[path] = func(model[path]);
    return model;
  });

const nest = (create, update, path) => {
  const component = create(nestUpdate(update, path));
  const result = Object.assign({}, component);
  if (component.model) {
    result.model = () => ({ [path]: component.model() });
  }
  if (component.view) {
    result.view = model => component.view(model[path]);
  }
  return result;
};
