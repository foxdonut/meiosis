import { routing } from "./routing";

export const service = state => {
  const url = routing.getUrl(state.route.id, state.route.values);
  if (document.location.hash !== url) {
    window.history.pushState({}, "", url);
  }
};
