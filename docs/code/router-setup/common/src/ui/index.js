import m from "mithril";

export const PleaseWait = {
  view: ({ attrs: { state } }) => {
    return m(
      "div",
      {
        style: {
          visibility: state.route.changed ? "visible" : "hidden"
        }
      },
      m("div.simpleModal", m("div.simpleBox", m("div", "Loading, please wait...")))
    );
  }
};
