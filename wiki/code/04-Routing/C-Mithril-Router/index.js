/* global m, O, createLayout, createHome, createCoffee, meiosis, meiosisTracer */

const update = m.stream();
const models = m.stream.scan(O, {}, update);

const componentCreators = [ createHome, createCoffee ];
const components = componentCreators.map(create => create(update));
const defaultComponent = components[0];
const Layout = createLayout(components);

/*
const wrap = Component => ({
  //onmatch: (args, _requestedPath) => Component.navigateTo(args),
  onmatch: (args, _requestedPath) => {
    return Component.navigateTo(args);
  },
  render: () => {
    const model = models();
    return m(Layout, { model }, m(Component, { model }));
  }
});
*/

const componentMap = components.reduce((result, component) => {
  result[component.page.id] = component;
  return result;
}, {});

const render = {
  render: () => {
    const model = models();
    const Component = componentMap[(model.page.id || defaultComponent.page.id)] || defaultComponent;
    return m(Layout, { model }, m(Component, { model }));
  }
};

const wrap = Component => O({
  //onmatch: (args, _requestedPath) => Component.navigateTo(args),
  onmatch: (args, _requestedPath) => {
    return Component.navigateTo(args);
  },
}, render);

const routes = components.reduce((result, Component) => {
  result[Component.route] = wrap(Component);
  return result;
}, {});

const routeMap = components.reduce((result, Component) => {
  result[Component.page.id] = Component.href;
  return result;
}, {});

const routeSync = model => {
  if (Object.keys(model).length > 0) {
    const path = (model.page && (routeMap[model.page.id] || defaultComponent.href) || defaultComponent.href)();
    if (document.location.hash.substring(2) !== path) {
      //m.route.set(path);
      window.history.pushState({}, "", "#!" + path);
    }
  }
};
models.map(routeSync);

const element = document.getElementById("app");
m.route(element, "/", routes);

// Only for using Meiosis Tracer in development.
meiosis.trace({ update, dataStreams: [ models ], toUpdate: state => state });
meiosisTracer({ selector: "#tracer" });
models.map(m.redraw);
