// @ts-check

import meiosis from "../../source/dist/index";
import flyd from "flyd";
import merge from "mergerino";
import produce from "immer";
import { html, render as litHtmlRender } from "lit-html";
import m from "mithril";
import Stream from "mithril/stream";
import meiosisReact from "../../react/dist";
import meiosisPreact from "../../preact/dist";
import { h, render as preactRender } from "preact";
import { useState } from "preact/hooks";
import React from "react";
import ReactDOM from "react-dom";

// common code
const convert = (value, to) => {
  return Math.round(to === "C" ? ((value - 32) / 9) * 5 : (value * 9) / 5 + 32);
};

const temperature = {
  Initial: label => ({
    label,
    value: 22,
    units: "C"
  })
};

const app = {
  initial: {
    conditions: {
      precipitations: false,
      sky: "SUNNY"
    },
    temperature: {
      air: temperature.Initial("Air"),
      water: temperature.Initial("Water")
    }
  }
};

// lit-html + functionPatches + simple-stream
(() => {
  const nest = meiosis.functionPatches.nest;

  const conditionsActions = {
    togglePrecipitations: (context, value) => {
      context.update(state => ({ ...state, precipitations: value }));
    },
    changeSky: (context, value) => {
      context.update(state => ({ ...state, sky: value }));
    }
  };

  const skyOption = ({ context, value, label }) => html`
    <label>
      <input
        type="radio"
        value=${value}
        .checked=${context.getState().sky === value}
        @change=${evt => conditionsActions.changeSky(context, evt.target.value)}
      />
      ${label}
    </label>
  `;

  const Conditions = context => html`
    <div>
      <label>
        <input
          type="checkbox"
          .checked=${context.getState().precipitations}
          @change=${evt => conditionsActions.togglePrecipitations(context, evt.target.checked)}
        />
        Precipitations
      </label>
      <div>
        ${skyOption({ context, value: "SUNNY", label: "Sunny" })}
        ${skyOption({ context, value: "CLOUDY", label: "Cloudy" })}
        ${skyOption({ context, value: "MIX", label: "Mix of sun/clouds" })}
      </div>
    </div>
  `;

  const temperatureActions = {
    increment: (context, amount) => {
      context.update(state => ({ ...state, value: state.value + amount }));
    },
    changeUnits: context => {
      context.update(state => {
        const value = state.value;
        const newUnits = state.units === "C" ? "F" : "C";
        const newValue = convert(value, newUnits);
        return { ...state, value: newValue, units: newUnits };
      });
    }
  };

  const Temperature = context => html`
    <div>
      ${context.getState().label} Temperature:
      ${context.getState().value}&deg;${context.getState().units}
      <div>
        <button @click=${() => temperatureActions.increment(context, 1)}>Increment</button>
        <button @click=${() => temperatureActions.increment(context, -1)}>Decrement</button>
      </div>
      <div>
        <button @click=${() => temperatureActions.changeUnits(context)}>Change Units</button>
      </div>
    </div>
  `;

  const App = context => html`
    <div style="display: grid; grid-template-columns: 1fr 1fr">
      <div>
        ${Conditions(nest(context, "conditions"))}
        ${Temperature(nest(nest(context, "temperature"), "air"))}
        ${Temperature(nest(nest(context, "temperature"), "water"))}
      </div>
      <pre style="margin: 0">${JSON.stringify(context.getState(), null, 4)}</pre>
    </div>
  `;

  const context = meiosis.functionPatches.meiosisOne({ stream: meiosis.simpleStream, app });

  const element = document.getElementById("litHtmlApp");
  context.getState.map(() => litHtmlRender(App(context), element));
})();

// mithril + mergerino + mithril-stream
(() => {
  const nest = meiosis.mergerino.nest;

  const conditionsActions = {
    togglePrecipitations: (context, value) => {
      context.update({ precipitations: value });
    },
    changeSky: (context, value) => {
      context.update({ sky: value });
    }
  };

  const SkyOption = {
    view: ({ attrs: { context, value, label } }) =>
      m(
        "label",
        m("input", {
          type: "radio",
          value,
          checked: context.getState().sky === value,
          onchange: evt => conditionsActions.changeSky(context, evt.target.value)
        }),
        label
      )
  };

  const Conditions = {
    view: ({ attrs: { context } }) =>
      m(
        "div",
        m(
          "label",
          m("input", {
            type: "checkbox",
            checked: context.getState().precipitations,
            onchange: evt => conditionsActions.togglePrecipitations(context, evt.target.checked)
          }),
          "Precipitations"
        ),
        m(
          "div",
          m(SkyOption, { context, value: "SUNNY", label: "Sunny" }),
          m(SkyOption, { context, value: "CLOUDY", label: "Cloudy" }),
          m(SkyOption, { context, value: "MIX", label: "Mix of sun/clouds" })
        )
      )
  };

  const temperatureActions = {
    increment: (context, amount) => {
      context.update({ value: x => x + amount });
    },
    changeUnits: context => {
      context.update(state => {
        const value = state.value;
        const newUnits = state.units === "C" ? "F" : "C";
        const newValue = convert(value, newUnits);
        return { ...state, value: newValue, units: newUnits };
      });
    }
  };

  const Temperature = {
    view: ({ attrs: { context } }) =>
      m(
        "div",
        context.getState().label,
        " Temperature: ",
        context.getState().value,
        m.trust("&deg;"),
        context.getState().units,
        m(
          "div",
          m("button", { onclick: () => temperatureActions.increment(context, 1) }, "Increment"),
          m("button", { onclick: () => temperatureActions.increment(context, -1) }, "Decrement")
        ),
        m(
          "div",
          m("button", { onclick: () => temperatureActions.changeUnits(context) }, "Change Units")
        )
      )
  };

  const App = {
    view: ({ attrs: { context } }) =>
      m(
        "div",
        { style: { display: "grid", gridTemplateColumns: "1fr 1fr" } },
        m(
          "div",
          m(Conditions, { context: nest(context, "conditions") }),
          m(Temperature, { context: nest(nest(context, "temperature"), "air") }),
          m(Temperature, { context: nest(nest(context, "temperature"), "water") })
        ),
        m("pre", { style: { margin: "0" } }, JSON.stringify(context.getState(), null, 4))
      )
  };

  const stream = {
    stream: Stream,
    scan: (acc, init, stream) => Stream.scan(acc, init, stream)
  };

  const context = meiosis.mergerino.meiosisOne({ stream, merge, app });

  m.mount(document.getElementById("mithrilApp"), {
    view: () => m(App, { context })
  });

  context.getState.map(() => m.redraw());
})();

// preact + mergerino + simple-stream
(() => {
  const nest = meiosis.mergerino.nest;

  const conditionsActions = {
    togglePrecipitations: (context, value) => {
      context.update({ precipitations: value });
    },
    changeSky: (context, value) => {
      context.update({ sky: value });
    }
  };

  // Normally we could use JSX with the Preact.h pragma, but since we already have React in this
  // file, we'll use h here.
  const SkyOption = ({ context, value, label }) =>
    h(
      "label",
      {},
      h("input", {
        type: "radio",
        value,
        checked: context.getState().sky === value,
        onchange: evt => conditionsActions.changeSky(context, evt.target.value)
      }),
      label
    );

  const Conditions = ({ context }) =>
    h(
      "div",
      {},
      h(
        "label",
        {},
        h("input", {
          type: "checkbox",
          checked: context.getState().precipitations,
          onchange: evt => conditionsActions.togglePrecipitations(context, evt.target.checked)
        }),
        "Precipitations"
      ),
      h(
        "div",
        {},
        h(SkyOption, { context, value: "SUNNY", label: "Sunny" }),
        h(SkyOption, { context, value: "CLOUDY", label: "Cloudy" }),
        h(SkyOption, { context, value: "MIX", label: "Mix of sun/clouds" })
      )
    );

  const temperatureActions = {
    increment: (context, amount) => {
      context.update({ value: x => x + amount });
    },
    changeUnits: context => {
      context.update(state => {
        const value = state.value;
        const newUnits = state.units === "C" ? "F" : "C";
        const newValue = convert(value, newUnits);
        return { ...state, value: newValue, units: newUnits };
      });
    }
  };

  const Temperature = ({ context }) =>
    h(
      "div",
      {},
      context.getState().label,
      " Temperature: ",
      context.getState().value,
      h("span", { dangerouslySetInnerHTML: { __html: "&deg;" } }),
      context.getState().units,
      h(
        "div",
        {},
        h("button", { onclick: () => temperatureActions.increment(context, 1) }, "Increment"),
        h("button", { onclick: () => temperatureActions.increment(context, -1) }, "Decrement")
      ),
      h(
        "div",
        {},
        h("button", { onclick: () => temperatureActions.changeUnits(context) }, "Change Units")
      )
    );

  const Root = ({ context }) =>
    h(
      "div",
      { style: { display: "grid", gridTemplateColumns: "1fr 1fr" } },
      h(
        "div",
        {},
        h(Conditions, { context: nest(context, "conditions") }),
        h(Temperature, { context: nest(nest(context, "temperature"), "air") }),
        h(Temperature, { context: nest(nest(context, "temperature"), "water") })
      ),
      h("pre", { style: { margin: "0" } }, JSON.stringify(context.getState(), null, 4))
    );

  const App = meiosisPreact({ h, useState, Root });

  const context = meiosis.mergerino.meiosisOne({ stream: meiosis.simpleStream, merge, app });

  const element = document.getElementById("preactApp");
  preactRender(h(App, { states: context.getState, context }), element);
})();

// react + immer + flyd
(() => {
  const nest = meiosis.immer.nest(produce);

  const conditionsActions = {
    togglePrecipitations: (context, value) => {
      context.update(state => {
        state.precipitations = value;
      });
    },
    changeSky: (context, value) => {
      context.update(state => {
        state.sky = value;
      });
    }
  };

  const SkyOption = ({ context, value, label }) => (
    <label>
      <input
        type="radio"
        value={value}
        checked={context.getState().sky === value}
        onChange={evt => conditionsActions.changeSky(context, evt.target.value)}
      />
      {label}
    </label>
  );

  const Conditions = ({ context }) => (
    <div>
      <label>
        <input
          type="checkbox"
          checked={context.getState().precipitations}
          onChange={evt => conditionsActions.togglePrecipitations(context, evt.target.checked)}
        />
        Precipitations
      </label>
      <div>
        <SkyOption context={context} value="SUNNY" label="Sunny" />
        <SkyOption context={context} value="CLOUDY" label="Cloudy" />
        <SkyOption context={context} value="MIX" label="Mix of sun/clouds" />
      </div>
    </div>
  );

  const temperatureActions = {
    increment: (context, amount) => {
      context.update(state => {
        state.value += amount;
      });
    },
    changeUnits: context => {
      context.update(state => {
        const value = state.value;
        const newUnits = state.units === "C" ? "F" : "C";
        const newValue = convert(value, newUnits);
        state.value = newValue;
        state.units = newUnits;
      });
    }
  };

  const Temperature = ({ context }) => (
    <div>
      {context.getState().label} Temperature:
      {context.getState().value}&deg;{context.getState().units}
      <div>
        <button onClick={() => temperatureActions.increment(context, 1)}>Increment</button>
        <button onClick={() => temperatureActions.increment(context, -1)}>Decrement</button>
      </div>
      <div>
        <button onClick={() => temperatureActions.changeUnits(context)}>Change Units</button>
      </div>
    </div>
  );

  const Root = ({ context }) => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div>
        <Conditions context={nest(context, "conditions")} />
        <Temperature context={nest(nest(context, "temperature"), "air")} />
        <Temperature context={nest(nest(context, "temperature"), "water")} />
      </div>
      <pre style={{ margin: "0" }}>{JSON.stringify(context.getState(), null, 4)}</pre>
    </div>
  );

  const stream = {
    stream: flyd.stream,
    scan: (acc, init, stream) => flyd.scan(acc, init, stream)
  };

  const context = meiosis.immer.meiosisOne({
    stream,
    produce: (s, p) => produce(s, p),
    app
  });

  const App = meiosisReact({ React, Root });

  const element = document.getElementById("reactApp");
  ReactDOM.render(React.createElement(App, { states: context.getState, context }), element);
})();
