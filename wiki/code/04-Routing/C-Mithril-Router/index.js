/* global m, createNavigation, createApp, createRouter, meiosis, meiosisTracer */

// Meiosis Setup
const update = m.stream();
//const navigation = createNavigation(update);
//const app = createApp(update, navigation);

const models = m.stream.scan((model, func) => func(model),
  { page: Home.page, params: {}, coffees }, update);

const wrap = Component => ({
  onmatch: (args, requestedPath) => {
    update(model => {
      model.page = Component.page;
      return model;
    })
  },
  render: () => {
    const model = models();
    return m(Layout, { model }, m(Component, { model }));
  }
});

const element = document.getElementById("app");
m.route(element, "/", {
  "/": wrap(Home),
  "/coffee": wrap(Coffee),
  "/coffee/:id": wrap(Coffee)
});

// Only for using Meiosis Tracer in development.
meiosis.trace({ update, dataStreams: [ models ] });
meiosisTracer({ selector: "#tracer" });
models.map(m.redraw);
