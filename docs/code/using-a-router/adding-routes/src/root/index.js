import { PS } from "patchinko/explicit";

import { onChange } from "../util";

export const root = {
  service: (states, update) => {
    onChange(states, ["route", "next"], state => {
      update({
        route: PS({
          previous: state.route.current.id !== state.route.next.id
            && state.route.current
            || {},
          current: state.route.next
        })
      });
    });
  }
};

export { Root } from "./view";
