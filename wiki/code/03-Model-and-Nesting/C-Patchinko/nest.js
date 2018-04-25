const I = value => value;

const nestUpdate = (update, path, wrap) => patch =>
  update(wrap({ [path]: patch }));

const nest = (create, update, path, wrap) => {
  wrap = wrap || I;
  const component = create(nestUpdate(update, path, wrap));
  const result = P({}, component);
  if (component.model) {
    result.model = () => ({ [path]: component.model() });
  }
  if (component.view) {
    result.view = model => component.view(model[path]);
  }
  return result;
};
