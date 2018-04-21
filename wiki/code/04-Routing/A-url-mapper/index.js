// Meiosis Setup
const update = flyd.stream();
const navigation = createNavigation(update);
const app = createApp(update, navigation);
const models = flyd.scan((model, func) => func(model),
  app.model(), update);

// Rendering
const element = document.getElementById("app");
models.map(model => ReactDOM.render(app.view(model), element));

// Router
const router = createRouter(navigation);
// Resolve initial route
router.resolveRoute();
// Route sync
models.map(router.routeSync);

// Only for using Meiosis Tracer in development.
meiosis.trace({ update, dataStreams: [ models ] });
meiosisTracer({ selector: "#tracer" });
