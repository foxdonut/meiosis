import m from "mithril";
import { ViewAttrs } from "../app/types";

export const PleaseWait: m.Component<ViewAttrs> = {
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
