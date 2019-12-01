import { router } from "../router";

export const Brewer = ({ state, parentRoute }) => [
  "div",
  ["div", state.brewer],
  ["div", ["a", { href: router.toPath(parentRoute({ id: state.route.value.id })) }, "Close"]]
];
