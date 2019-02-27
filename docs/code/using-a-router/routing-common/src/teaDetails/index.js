import { foldCase } from "stags";

import { Route, TeaDetailsPage } from "../root";
import { onChange } from "../util";

export const teas = [
  { id: "c1", title: "Tea 1", description: "Description of Tea 1" },
  { id: "c2", title: "Tea 2", description: "Description of Tea 2" }
];

const teaMap = teas.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

export const teaDetails = {
  service: (states, update) => {
    onChange(states, ["routeCurrent"], state => {
      foldCase(Route.Tea({ details: null }))(
        null,
        ({ details }) => {
          TeaDetailsPage.bifold(
            () => null,
            ({ id }) => {
              const tea = teaMap[id].description;
              update({ tea });
            }
          )(details);
        }
      )(state.routeCurrent);
    });
  }
};
