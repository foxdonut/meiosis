import { run } from "stags";

import { Route, otherRoutes } from "../routes";
import { router } from "../router";
import { TeaDetails } from "../teaDetails";
import { K } from "../util";

export const Tea = ({ state, actions }) => [
  "div",
  ["div", "Tea Page"],
  [
    ".row",
    [
      ".col-md-6",
      state.teas.map(tea => [
        "div",
        { key: tea.id },
        [
          "a",
          {
            href: router.toPath(Route.of.TeaDetails({ id: tea.id }))
          },
          tea.title
        ]
      ])
    ],
    run(
      state.route,
      Route.fold({
        ...otherRoutes(K(null)),
        TeaDetails: ({ id }) => [".col-md-6", TeaDetails({ state, id, actions })]
      })
    )
  ]
];
