import React, { Component } from "react";

import { T, fold } from "../util";
import { NavigateTo } from "../util/navigation";

export const home = {
  // FIXME: build up a fold object for RoutePage, with defaults
  service: ({ state, updateState }) => {
    T(state.navigateTo, NavigateTo.map(navigateTo =>
      T(navigateTo, fold({
        Home: () => updateState({
          route: navigateTo,
          navigateTo: NavigateTo.N()
        })
      }))
    ));
  }
};

export class Home extends Component {
  render() {
    return (<div>Home Page</div>);
  }
}
