import { cases, fold } from "static-tagged-union";
import { T } from "ducklings";

export const service = ({ state }) =>
  T(state.route)(
    fold(
      cases(["BeerBrewer", "CoffeeBrewer"])(({ id }) => ({
        brewer: { [id]: `Brewer of beverage ${id}` }
      }))
    )
  );
