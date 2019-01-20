import React, { Component } from "react";

import { fold } from "../util";
import { NavigateTo } from "../util/navigation";

export const home = {
  // FIXME: build up a fold object for RoutePage, with defaults
  service: ({ state, updateState }) => {
    NavigateTo.map(navigateTo =>
      fold({
        Home: () => updateState({
          route: navigateTo,
          navigateTo: NavigateTo.N()
        })
      })(navigateTo)
    )(state.navigateTo);
  }
};

export class Home extends Component {
  render() {
    return (<div>Home Page</div>);
  }
}
