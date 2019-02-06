import { onChange } from "../util";

export const root = {
  service: (states, update) => {
    onChange(states, ["routeNext"], state => {
      update({
        routePrevious: state.routeCurrent.id !== state.routeNext.id
            && state.routeCurrent
            || {},
        routeCurrent: state.routeNext
      });
    });
  }
};
