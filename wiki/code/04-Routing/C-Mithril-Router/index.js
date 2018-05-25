/* global m, O, Layout, createHome, createCoffees, createCoffee */

const update = m.stream();
const models = m.stream.scan(O, {}, update);

const render = Component => () =>
  m(Layout, { currentTab: Component.tab }, m(Component, { model: models() }));

const createRouteResolver = Component => ({
  onmatch: (args, _requestedPath) => Component.navigateTo && Component.navigateTo(args),
  render: render(Component)
});

const routes = [ createHome, createCoffees, createCoffee ]
  .map(create => create(update))
  .reduce((result, Component) => {
    result[Component.route] = createRouteResolver(Component);
    return result;
  }, {});

m.route(document.getElementById("app"), "/", routes);
