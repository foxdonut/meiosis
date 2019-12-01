import { router } from "../router";
import { Route } from "../routes";

export const TeaDetails = ({ state, id }) => [
  "div",
  ["div", state.tea[id]],
  ["div", ["a", { href: router.toPath(Route.of.Tea()) }, "Close"]]
];
