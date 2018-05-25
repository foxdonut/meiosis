/* global m, O, createLayout, createHome, createCoffee, createBeer, createBeerDetails */

const update = m.stream();
const models = m.stream.scan(O, { counter: 0 }, update);

const pages = [
  createHome,
  createCoffee,
  createBeer
].map(create => create(update));

const components = pages.concat([createBeerDetails].map(create => create(update)));

const Layout = createLayout(pages);

const createRouteResolver = Component => ({
  onmatch: Component.navigateTo,
  render: () => m(Layout, { currentTab: Component.tab }, m(Component, { model: models() }))
});

const routes = components.reduce((result, Component) => {
  Component.routes.forEach(route => {
    result[route] = createRouteResolver(Component);
  });
  return result;
}, {});

m.route(document.getElementById("app"), "/", routes);
