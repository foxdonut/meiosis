import React, { Component } from "react";
import { P } from "patchinko/explicit";

import { getPath, parsePath } from "../util/router";

import { root, Root } from "../root";
import { login } from "../login";
import { settings } from "../settings";
import { coffee } from "../coffee";
import { beer } from "../beer";

export const app = {
  initialState: () => ({
    route: parsePath(getPath()),
    navigateTo: {},
    navigateAway: {}
  }),

  actions: ({ update, navigate }) => P({},
    root.actions({ update, navigate }),
    login.actions({ update, navigate })
  ),

  services: [
    root.service,
    login.service,
    settings.service,
    coffee.service,
    beer.service
  ]
};

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = props.states();
  }

  componentDidMount() {
    this.props.states.map(state => {
      this.setState(state);
    });
  }

  render() {
    const state = this.state;
    const { actions } = this.props;

    return (<Root state={state} actions={actions} />);
  }
}
