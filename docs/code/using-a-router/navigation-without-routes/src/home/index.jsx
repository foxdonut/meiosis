import React, { Component } from "react";
import { fold } from "static-sum-type";

import { NavigateTo, RoutePage, withDefaults } from "../util";

export const home = {
  // FIXME: build up a fold object for RoutePage, with defaults
  service: ({ state, update }) => {
    NavigateTo.map(navigateTo =>
      fold(RoutePage)(withDefaults({
        Home: () => update({
          route: navigateTo,
          navigateTo: NavigateTo.N()
        })
      }))(navigateTo)
    )(state.navigateTo);
  }
};

export class Home extends Component {
  render() {
    return (<div>Home Page</div>);
  }
}
