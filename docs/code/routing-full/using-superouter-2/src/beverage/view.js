import { router } from "../router";
import { Brewer } from "../brewer";

export const Beverage = ({ state, actions, single, parentRoute, beverageRoute, brewerRoute }) => [
  ".row",
  [
    ".col-md-6",
    ["div", state[single]],
    ["div", ["a", { href: router.toPath(parentRoute()) }, "Back to list"]],
    !state.brewer && [
      "div",
      ["a", { href: router.toPath(brewerRoute({ id: state.route.value.id })) }, "Brewer"]
    ]
  ],
  state.brewer && [".col-md-6", Brewer({ state, actions, parentRoute: beverageRoute })]
];
