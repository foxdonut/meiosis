/* global m */
import { P, PS, S } from "patchinko/explicit.mjs"

const checkIfStateChanged = (next, prev) =>
  next.attrs.state[next.attrs.id] !== prev.attrs.state[prev.attrs.id];

const entryNumber = {
  state: () => ({
    value: ""
  }),
  actions: update => ({
    editEntryValue: id => evt => update({ [id]: PS({}, { value: evt.target.value }) })
  })
}

const EntryNumber = {
  view: ({ attrs: { state, id, actions } }) => {
    // eslint-disable-next-line no-console
    console.log("render Entry");

    return (
      m("div",
        m("span", { style: { "margin-right": "8px" } }, "Entry number:"),
        m("input[type=text][size=2]",
          { value: state[id].value, oninput: actions.editEntryValue(id) })
      )
    )
  },
  onbeforeupdate: checkIfStateChanged
}

const entryDate = {
  state: () => ({
    value: ""
  }),
  actions: update => ({
    editDateValue: id => evt => update({ [id]: PS({}, { value: evt.target.value }) })
  })
}

const EntryDate = {
  view: ({ attrs: { state, id, actions } }) => {
    // eslint-disable-next-line no-console
    console.log("render Date");

    return (
      m("div", { style: { "margin-top": "8px" } },
        m("span", { style: { "margin-right": "8px" } }, "Date:"),
        m("input[type=text][size=10]",
          { value: state[id].value, oninput: actions.editDateValue(id) })
      )
    )
  },
  onbeforeupdate: checkIfStateChanged
}

const convert = (value, to) => Math.round(
  (to === "C") ? ((value - 32) / 9 * 5) : (value * 9 / 5 + 32)
)

const temperature = {
  state: label => ({
    label,
    value: 20,
    units: "C"
  }),
  actions: update => ({
    increase: (id, amount) => evt => {
      evt.preventDefault();
      update({ [id]: PS({}, { value: S(value => value + amount) }) })
    },
    changeUnits: id => evt => {
      evt.preventDefault();
      update({ [id]: S(state => {
        const newUnits = state.units === "C" ? "F" : "C";
        const newValue = convert(state.value, newUnits);
        return P({}, state, { units: newUnits, value: newValue })
      }) })
    }
  })
}

const Temperature = {
  view: ({ attrs: { state, id, actions } }) => {
    // eslint-disable-next-line no-console
    console.log("render Temperature", state[id].label);

    return (
      m("div.row", { style: { "margin-top": "8px" } },
        m("div.col-md-3",
          m("span", state[id].label, " Temperature: ", state[id].value,
            m.trust("&deg;"), state[id].units)
        ),
        m("div.col-md-6",
          m("button.btn.btn-sm.btn-default",
            {onclick: actions.increase(id, 1)}, "Increase"),

          m("button.btn.btn-sm.btn-default",
            {onclick: actions.increase(id, -1)}, "Decrease"),

          m("button.btn.btn-sm.btn-info",
            {onclick: actions.changeUnits(id)}, "Change Units")
        )
      )
    )
  },
  onbeforeupdate: checkIfStateChanged
}

const displayTemperature = temperature => temperature.label + ": " +
  temperature.value + "\xB0" + temperature.units;

const app = {
  state: () => ({
    saved: "",
    entry: entryNumber.state(),
    date: entryDate.state(),
    air: temperature.state("Air"),
    water: temperature.state("Water")
  }),
  actions: update => P({
    save: state => evt => {
      evt.preventDefault();
      update({
        saved: " Entry #" + state.entry.value +
          " on " + state.date.value + ":" +
          " Temperatures: " +
          displayTemperature(state.air) + " " +
          displayTemperature(state.water),

        entry: PS({}, { value: "" }),
        date: PS({}, { value: "" })
      })
    }
  },
  entryNumber.actions(update),
  entryDate.actions(update),
  temperature.actions(update))
}

const App = {
  view: ({ attrs: { state, actions } }) =>
    m("form",
      m(EntryNumber, { state, id: "entry", actions }),
      m(EntryDate, { state, id: "date", actions }),
      m(Temperature, { state, id: "air", actions }),
      m(Temperature, { state, id: "water", actions }),
      m("div",
        m("button.btn.btn-primary", {onclick: actions.save(state)},
          "Save"),
        m("span", state.saved)
      )
    )
}

const update = m.stream()
const states = m.stream.scan((state, patch) => P({}, state, patch)    , app.state(), update)

const element = document.getElementById("app")
const actions = app.actions(update)

m.mount(element, { view: () => m(App, { state: states(), actions }) })
