import React from "react";
import { fold } from "stags";

import { Beverages } from "../beverages";
import { Beverage } from "../beverage";
import { BeveragePage } from "routing-common/src/root";

export const Coffee = ({ state, actions }) => (
  <div>
    <div>Coffee Page</div>
    {
      fold(BeveragePage)({
        Beverages: () => <Beverages state={state} actions={actions} />,
        Beverage: () => <Beverage state={state} actions={actions} />
      })(state.routeCurrent.value.child)
    }
  </div>
);
