/* global m, mergerino */
const [stream, scan] = [m.stream, m.stream.scan];
const accumulator = mergerino;

const app = {
  initial: {
    page: "Home"
  },

  Actions: update => ({
    loadData: () =>
      setTimeout(
        () =>
          update({
            data: ["One", "Two"]
          }),
        1500
      )
  }),

  services: [
    state => {
      if (state.page === "Login") {
        if (!state.login) {
          return { login: { username: "", password: "" } };
        }
      } else if (state.login) {
        return { login: undefined };
      }
    },
    state => {
      if (state.page === "Data") {
        if (!state.data) {
          return { data: "loading" };
        }
      } else if (state.data) {
        return { data: undefined };
      }
    }
  ],

  Effects: (_update, actions) => [
    state => {
      if (state.data === "loading") {
        actions.loadData();
      }
    }
  ]
};

const update = stream();

const runServices = startingState =>
  app.services.reduce(
    (state, service) => accumulator(state, service(state)),
    startingState
  );

const states = scan(
  (state, patch) => runServices(accumulator(state, patch)),
  runServices(app.initial),
  update
);

const actions = app.Actions(update, states);
const effects = app.Effects(update, actions);

states.map(state =>
  effects.forEach(effect => effect(state))
);

const App = {
  view: ({ attrs: { state, update } }) => [
    m(
      "div",
      m(
        "a",
        {
          href: "#",
          onclick: evt => {
            evt.preventDefault();
            update({ page: "Home" });
          }
        },
        "Home"
      ),
      m("span", " | "),
      m(
        "a",
        {
          href: "#",
          onclick: evt => {
            evt.preventDefault();
            update({ page: "Login" });
          }
        },
        "Login"
      ),
      m("span", " | "),
      m(
        "a",
        {
          href: "#",
          onclick: evt => {
            evt.preventDefault();
            update({ page: "Data" });
          }
        },
        "Data"
      )
    ),
    state.page === "Home"
      ? m("h4", "Home page")
      : state.page === "Login"
      ? [
          m("h4", "Login page"),
          m(
            "div",
            m("span", "Username:"),
            m("input[type=text]", {
              value: state.login.username,
              oninput: evt =>
                update({
                  login: { username: evt.target.value }
                })
            })
          ),
          m(
            "div",
            m("span", "Password:"),
            m("input[type=password]", {
              value: state.login.password,
              oninput: evt =>
                update({
                  login: { password: evt.target.value }
                })
            })
          )
        ]
      : state.page === "Data"
      ? [
          m("h4", "Data page"),
          state.data === "loading"
            ? m("div", "Loading, please wait...")
            : m("ul", state.data.map(item => m("li", item)))
        ]
      : null
  ]
};

m.mount(document.getElementById("app"), {
  view: () => m(App, { state: states(), update, actions })
});

states.map(() => m.redraw());
