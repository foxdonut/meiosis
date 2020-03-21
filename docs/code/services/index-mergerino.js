/* global b, m, R, Meiosis, mergerino */
const merge = mergerino;

const I = x => x;

const humanList = s => xs =>
  xs.length > 1
    ? xs.slice(0, -1).join(", ") +
      " " +
      s +
      " " +
      xs.slice(-1)
    : xs.join("");

const stats = {
  service: ({ state }) =>
    R.applyTo(
      state,
      R.pipe(
        x => x.boxes,
        R.countBy(I),
        R.always,
        R.objOf("stats")
      )
    )
};

const description = {
  service: ({ state }) =>
    R.applyTo(
      state,
      R.pipe(
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
    )
};

const storage = {
  initial: R.applyTo(
    localStorage.getItem("v1"),
    R.ifElse(R.isNil, R.always({}), x => JSON.parse(x))
  ),

  service: ({ state }) => {
    localStorage.setItem(
      "v1",
      JSON.stringify({ boxes: state.boxes })
    );
  }
};

const app = {
  initial: merge(
    {
      boxes: [],
      colors: ["red", "purple", "blue"]
    },
    storage.initial
  ),

  Actions: update => ({
    addBox: x => update({ boxes: xs => xs.concat(x) }),
    removeBox: i =>
      update({
        boxes: xs => xs.filter((x, j) => i != j)
      })
  }),

  services: [
    stats.service,
    description.service,
    storage.service
  ]
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

const { states, actions } = Meiosis.mergerino.setup({
  stream: m.stream,
  merge,
  app
});

m.mount(document.getElementById("app"), {
  view: () => m(App, { state: states(), actions })
});
