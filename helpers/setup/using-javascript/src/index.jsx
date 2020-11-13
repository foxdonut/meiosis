// @ts-check

import meiosis from "../../source/dist/index";
import flyd from "flyd";
import merge from "mergerino";
import produce from "immer";
import { html, render as litHtmlRender } from "lit-html";
import m from "mithril";
import Stream from "mithril/stream";
import { h, render as preactRender } from "preact";
import { useState } from "preact/hooks";
import React from "react";
import ReactDOM from "react-dom";

// common code
const initialConditions = {
  precipitations: false,
  sky: "SUNNY"
};

const convert = (value, to) => {
  return Math.round(to === "C" ? ((value - 32) / 9) * 5 : (value * 9) / 5 + 32);
};

const InitialTemperature = label => ({
  label,
  value: 22,
  units: "C"
});

const createApp = (conditions, temperature) => ({
  initial: {
    conditions: conditions.initial,
    temperature: {
      air: temperature.Initial("Air"),
      water: temperature.Initial("Water")
    }
  },
  Actions: update => ({
    conditions: conditions.Actions(update),
    temperature: temperature.Actions(update)
  })
});

// lit-html + functionPatches + simple-stream
(() => {
  const nest = meiosis.functionPatches.nest;

  const conditions = {
    initial: initialConditions,
    Actions: update => ({
      togglePrecipitations: (local, value) => {
        update(local.patch(state => ({ ...state, precipitations: value })));
      },
      changeSky: (local, value) => {
        update(local.patch(state => ({ ...state, sky: value })));
      }
    })
  };

  const skyOption = ({ state, local, actions, value, label }) => html`
    <label>
      <input
        type="radio"
        value=${value}
        .checked=${local.get(state).sky === value}
        @change=${evt => actions.conditions.changeSky(local, evt.target.value)}
      />
      ${label}
    </label>
  `;

  const Conditions = ({ state, local, actions }) => html`
    <div>
      <label>
        <input
          type="checkbox"
          .checked=${local.get(state).precipitations}
          @change=${evt => actions.conditions.togglePrecipitations(local, evt.target.checked)}
        />
        Precipitations
      </label>
      <div>
        ${skyOption({ state, local, actions, value: "SUNNY", label: "Sunny" })}
        ${skyOption({ state, local, actions, value: "CLOUDY", label: "Cloudy" })}
        ${skyOption({ state, local, actions, value: "MIX", label: "Mix of sun/clouds" })}
      </div>
    </div>
  `;

  const temperature = {
    Initial: InitialTemperature,
    Actions: update => ({
      increment: (local, amount) => {
        update(local.patch(state => ({ ...state, value: state.value + amount })));
      },
      changeUnits: local => {
        update(
          local.patch(state => {
            const value = state.value;
            const newUnits = state.units === "C" ? "F" : "C";
            const newValue = convert(value, newUnits);
            return { ...state, value: newValue, units: newUnits };
          })
        );
      }
    })
  };

  const Temperature = ({ state, local, actions }) => html`
    <div>
      ${local.get(state).label} Temperature: ${local.get(state).value}&deg;${local.get(state).units}
      <div>
        <button @click=${() => actions.temperature.increment(local, 1)}>Increment</button>
        <button @click=${() => actions.temperature.increment(local, -1)}>Decrement</button>
      </div>
      <div>
        <button @click=${() => actions.temperature.changeUnits(local)}>Change Units</button>
      </div>
    </div>
  `;

  const app = createApp(conditions, temperature);

  const App = ({ state, actions }) => html`
    <div style="display: grid; grid-template-columns: 1fr 1fr">
      <div>
        ${Conditions({ state, local: nest("conditions"), actions })}
        ${Temperature({ state, local: nest(["temperature", "air"]), actions })}
        ${Temperature({ state, local: nest(["temperature", "water"]), actions })}
      </div>
      <pre style="margin: 0">${JSON.stringify(state, null, 4)}</pre>
    </div>
  `;

  const { states, actions } = meiosis.functionPatches.setup({ stream: meiosis.simpleStream, app });

  const element = document.getElementById("litHtmlApp");
  states.map(state => litHtmlRender(App({ state, actions }), element));
})();

// mithril + mergerino + mithril-stream
(() => {
  const nest = meiosis.mergerino.nest;

  const conditions = {
    initial: initialConditions,
    Actions: update => ({
      togglePrecipitations: (local, value) => {
        update(local.patch({ precipitations: value }));
      },
      changeSky: (local, value) => {
        update(local.patch({ sky: value }));
      }
    })
  };

  const SkyOption = {
    view: ({ attrs: { state, local, actions, value, label } }) =>
      m(
        "label",
        m("input", {
          type: "radio",
          value,
          checked: local.get(state).sky === value,
          onchange: evt => actions.conditions.changeSky(local, evt.target.value)
        }),
        label
      )
  };

  const Conditions = {
    view: ({ attrs: { state, local, actions } }) =>
      m(
        "div",
        m(
          "label",
          m("input", {
            type: "checkbox",
            checked: local.get(state).precipitations,
            onchange: evt => actions.conditions.togglePrecipitations(local, evt.target.checked)
          }),
          "Precipitations"
        ),
        m(
          "div",
          m(SkyOption, { state, local, actions, value: "SUNNY", label: "Sunny" }),
          m(SkyOption, { state, local, actions, value: "CLOUDY", label: "Cloudy" }),
          m(SkyOption, { state, local, actions, value: "MIX", label: "Mix of sun/clouds" })
        )
      )
  };

  const temperature = {
    Initial: InitialTemperature,
    Actions: update => ({
      increment: (local, amount) => {
        update(local.patch({ value: x => x + amount }));
      },
      changeUnits: local => {
        update(
          local.patch(state => {
            const value = state.value;
            const newUnits = state.units === "C" ? "F" : "C";
            const newValue = convert(value, newUnits);
            return { ...state, value: newValue, units: newUnits };
          })
        );
      }
    })
  };

  const Temperature = {
    view: ({ attrs: { state, local, actions } }) =>
      m(
        "div",
        local.get(state).label,
        " Temperature: ",
        local.get(state).value,
        m.trust("&deg;"),
        local.get(state).units,
        m(
          "div",
          m("button", { onclick: () => actions.temperature.increment(local, 1) }, "Increment"),
          m("button", { onclick: () => actions.temperature.increment(local, -1) }, "Decrement")
        ),
        m(
          "div",
          m("button", { onclick: () => actions.temperature.changeUnits(local) }, "Change Units")
        )
      )
  };

  const app = createApp(conditions, temperature);

  const App = {
    view: ({ attrs: { state, actions } }) =>
      m(
        "div",
        { style: { display: "grid", gridTemplateColumns: "1fr 1fr" } },
        m(
          "div",
          m(Conditions, { state, local: nest("conditions"), actions }),
          m(Temperature, { state, local: nest(["temperature", "air"]), actions }),
          m(Temperature, { state, local: nest(["temperature", "water"]), actions })
        ),
        m("pre", { style: { margin: "0" } }, JSON.stringify(state, null, 4))
      )
  };

  const stream = {
    stream: Stream,
    scan: (acc, init, stream) => Stream.scan(acc, init, stream)
  };

  const { states, actions } = meiosis.mergerino.setup({ stream, merge, app });

  m.mount(document.getElementById("mithrilApp"), {
    view: () => m(App, { state: states(), actions })
  });

  states.map(() => m.redraw());
})();

// preact + mergerino + simple-stream
(() => {
  const nest = meiosis.mergerino.nest;

  const conditions = {
    initial: initialConditions,
    Actions: update => ({
      togglePrecipitations: (local, value) => {
        update(local.patch({ precipitations: value }));
      },
      changeSky: (local, value) => {
        update(local.patch({ sky: value }));
      }
    })
  };

  // Normally we could use JSX with the Preact.h pragma, but since we already have React in this
  // file, we'll use h here.
  const SkyOption = ({ state, local, actions, value, label }) =>
    h(
      "label",
      {},
      h("input", {
        type: "radio",
        value,
        checked: local.get(state).sky === value,
        onchange: evt => actions.conditions.changeSky(local, evt.target.value)
      }),
      label
    );

  const Conditions = ({ state, local, actions }) =>
    h(
      "div",
      {},
      h(
        "label",
        {},
        h("input", {
          type: "checkbox",
          checked: local.get(state).precipitations,
          onchange: evt => actions.conditions.togglePrecipitations(local, evt.target.checked)
        }),
        "Precipitations"
      ),
      h(
        "div",
        {},
        h(SkyOption, { state, local, actions, value: "SUNNY", label: "Sunny" }),
        h(SkyOption, { state, local, actions, value: "CLOUDY", label: "Cloudy" }),
        h(SkyOption, { state, local, actions, value: "MIX", label: "Mix of sun/clouds" })
      )
    );

  const temperature = {
    Initial: InitialTemperature,
    Actions: update => ({
      increment: (local, amount) => {
        update(local.patch({ value: x => x + amount }));
      },
      changeUnits: local => {
        update(
          local.patch(state => {
            const value = state.value;
            const newUnits = state.units === "C" ? "F" : "C";
            const newValue = convert(value, newUnits);
            return { ...state, value: newValue, units: newUnits };
          })
        );
      }
    })
  };

  const Temperature = ({ state, local, actions }) =>
    h(
      "div",
      {},
      local.get(state).label,
      " Temperature: ",
      local.get(state).value,
      h("span", { dangerouslySetInnerHTML: { __html: "&deg;" } }),
      local.get(state).units,
      h(
        "div",
        {},
        h("button", { onclick: () => actions.temperature.increment(local, 1) }, "Increment"),
        h("button", { onclick: () => actions.temperature.increment(local, -1) }, "Decrement")
      ),
      h(
        "div",
        {},
        h("button", { onclick: () => actions.temperature.changeUnits(local) }, "Change Units")
      )
    );

  const app = createApp(conditions, temperature);

  const Root = ({ state, actions }) =>
    h(
      "div",
      { style: { display: "grid", gridTemplateColumns: "1fr 1fr" } },
      h(
        "div",
        {},
        h(Conditions, { state, local: nest("conditions"), actions }),
        h(Temperature, { state, local: nest(["temperature", "air"]), actions }),
        h(Temperature, { state, local: nest(["temperature", "water"]), actions })
      ),
      h("pre", { style: { margin: "0" } }, JSON.stringify(state, null, 4))
    );

  const App = meiosis.preact.setup({ h, useState, Root });

  const { states, actions } = meiosis.mergerino.setup({ stream: meiosis.simpleStream, merge, app });

  const element = document.getElementById("preactApp");
  preactRender(h(App, { states, actions }), element);
})();

// react + immer + flyd
(() => {
  const nest = meiosis.immer.nest(produce);

  const conditions = {
    initial: initialConditions,
    Actions: update => ({
      togglePrecipitations: (local, value) => {
        update(
          local.patch(state => {
            state.precipitations = value;
          })
        );
      },
      changeSky: (local, value) => {
        update(
          local.patch(state => {
            state.sky = value;
          })
        );
      }
    })
  };

  const SkyOption = ({ state, local, actions, value, label }) => (
    <label>
      <input
        type="radio"
        value={value}
        checked={local.get(state).sky === value}
        onChange={evt => actions.conditions.changeSky(local, evt.target.value)}
      />
      {label}
    </label>
  );

  const Conditions = ({ state, local, actions }) => (
    <div>
      <label>
        <input
          type="checkbox"
          checked={local.get(state).precipitations}
          onChange={evt => actions.conditions.togglePrecipitations(local, evt.target.checked)}
        />
        Precipitations
      </label>
      <div>
        <SkyOption state={state} local={local} actions={actions} value="SUNNY" label="Sunny" />
        <SkyOption state={state} local={local} actions={actions} value="CLOUDY" label="Cloudy" />
        <SkyOption
          state={state}
          local={local}
          actions={actions}
          value="MIX"
          label="Mix of sun/clouds"
        />
      </div>
    </div>
  );

  const temperature = {
    Initial: InitialTemperature,
    Actions: update => ({
      increment: (local, amount) => {
        update(
          local.patch(state => {
            state.value += amount;
          })
        );
      },
      changeUnits: local => {
        update(
          local.patch(state => {
            const value = state.value;
            const newUnits = state.units === "C" ? "F" : "C";
            state.value = convert(value, newUnits);
            state.units = newUnits;
          })
        );
      }
    })
  };

  const Temperature = ({ state, local, actions }) => (
    <div>
      {local.get(state).label} Temperature:
      {local.get(state).value}&deg;{local.get(state).units}
      <div>
        <button onClick={() => actions.temperature.increment(local, 1)}>Increment</button>
        <button onClick={() => actions.temperature.increment(local, -1)}>Decrement</button>
      </div>
      <div>
        <button onClick={() => actions.temperature.changeUnits(local)}>Change Units</button>
      </div>
    </div>
  );

  const Root = ({ state, actions }) => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div>
        <Conditions state={state} local={nest("conditions")} actions={actions} />
        <Temperature state={state} local={nest(["temperature", "air"])} actions={actions} />
        <Temperature state={state} local={nest(["temperature", "water"])} actions={actions} />
      </div>
      <pre style={{ margin: "0" }}>{JSON.stringify(state, null, 4)}</pre>
    </div>
  );

  const app = createApp(conditions, temperature);

  const { states, update, actions } = meiosis.immer.setup({
    stream: flyd,
    produce: (s, p) => produce(s, p),
    app
  });

  const App = meiosis.react.setup({ React, Root });

  const element = document.getElementById("reactApp");
  ReactDOM.render(React.createElement(App, { states, update, actions }), element);
})();
