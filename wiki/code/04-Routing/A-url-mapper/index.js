/* global flyd, createNavigation, createApp, createRouter, ReactDOM, meiosis, meiosisTracer */

// Meiosis Setup
const update = flyd.stream();
const models = flyd.scan((model, func) => func(model),
{}, update);

// Rendering
const element = document.getElementById("app");
const stateNavigator = createNavigation(update);
const app = createApp(update, stateNavigator);
models.map(model => ReactDOM.render(app.view(model), element));

models.map(({ url }) => {
  if (url !== undefined && stateNavigator.stateContext.url !== url) {
    var { state, data } = stateNavigator.parseLink(url);
    stateNavigator.stateContext.url = url;
    stateNavigator.stateContext.state = state;
    stateNavigator.stateContext.data = data;
    stateNavigator.historyManager.addHistory(url, false);
  }
});

// Only for using Meiosis Tracer in development.
meiosis.trace({ update, dataStreams: [ models ] });
meiosisTracer({ selector: "#tracer" });
