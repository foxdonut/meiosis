/* global b, m, R, O */

const I = x => x;
const compose = (f, g) => (...args) => f(g(...args));

const humanList = s => xs =>
  xs.length > 1
    ? xs.slice(0, -1).join(", ") +
      " " +
      s +
      " " +
      xs.slice(-1)
    : xs.join("");

const stats = {
  accept: R.pipe(
    x => x.boxes,
    R.countBy(I),
    R.objOf("stats")
  )
};

const description = {
  accept: R.pipe(
    x => x.stats,
    R.toPairs,
    R.groupBy(R.last),
    R.map(R.map(R.head)),
    R.map(humanList("and")),
    R.toPairs,
    R.map(R.join(" ")),
    humanList("and"),
    x => x + ".",
    R.objOf("description")
  )
};

const storage = {
  Initial: () => {
    const stored = localStorage.getItem("v1");
    return stored ? JSON.parse(stored) : {};
  },

  service: ({ state }) => {
    localStorage.setItem(
      "v1",
      JSON.stringify({ boxes: state.boxes })
    );
  }
};

const app = {
  Initial: () =>
    O(
      {
        boxes: [],
        colors: ["red", "purple", "blue"]
      },
      storage.Initial()
    ),

  Actions: update => ({
    addBox: x => update({ boxes: O(xs => xs.concat(x)) }),
    removeBox: i =>
      update({
        boxes: O(xs => xs.filter((x, j) => i != j))
      })
  })
};

const App = {
  view: ({ attrs: { state, actions } }) =>
    m(
      ".app" + b.d("grid").ff("Helvetica"),
      m(
        "nav.header" +
          b
            .d("flex")
            .jc("space-between")
            .ai("center")
            .bc("steelblue")
            .c("white")
            .p("1em"),

        m("h1" + b.m(0), "Boxes"),
        state.colors.map(x =>
          m(
            "button" +
              b
                .bc(x)
                .c("white")
                .w("2em")
                .h("2em")
                .fs("2em")
                .m(0)
                .border("none"),
            { onclick: () => actions.addBox(x) },
            "+"
          )
        )
      ),
      m("p", state.description),
      m(
        "" +
          b
            .d("grid")
            .gridTemplateColumns("repeat(3, 1fr)")
            .alignItems("center")
            .justifyItems("center")
            .padding("1em")
            .gridRowGap("1em")
            .maxHeight("14em")
            .overflowY("auto"),

        state.boxes.map((x, i) =>
          m(
            "" +
              b
                .bc(x)
                .c("white")
                .w("4em")
                .h("4em"),
            { onclick: () => actions.removeBox(i) }
          )
        )
      )
    )
};

const acceptors = [stats.accept, description.accept];
const services = [storage.service];

const accept = state =>
  acceptors.reduce(
    (updatedState, acceptor) =>
      O(updatedState, acceptor(updatedState)),
    state
  );

const update = m.stream();
const actions = app.Actions(update);
const states = m.stream.scan(
  compose(
    accept,
    O
  ),
  accept(app.Initial()),
  update
);

m.mount(document.getElementById("app"), {
  view: () => m(App, { state: states(), actions })
});

states.map(state =>
  services.forEach(service => service({ state, update }))
);
