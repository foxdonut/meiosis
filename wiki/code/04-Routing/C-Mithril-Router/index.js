/* global m, createNavigation, createApp, createRouter, meiosis, meiosisTracer */

// Meiosis Setup
const update = m.stream();
//const navigation = createNavigation(update);
//const app = createApp(update, navigation);

const models = m.stream.scan((model, func) => func(model),
  { page: pages.home, params: {}, coffees }, update);

const wrap = Component => ({
  render: () => {
    const model = models();
    return m(Layout, { model }, m(Component, { model }));
  }
});

const element = document.getElementById("app");
m.route(element, "/", {
  "/": wrap(Home),
  "/coffee": wrap(Coffee)
});

// Only for using Meiosis Tracer in development.
meiosis.trace({ update, dataStreams: [ models ] });
meiosisTracer({ selector: "#tracer" });
