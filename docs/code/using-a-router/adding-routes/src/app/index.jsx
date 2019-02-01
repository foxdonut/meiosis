import React, { Component } from "react";
import { P } from "patchinko/explicit";

import { getPath, parsePath } from "../util/router";

import { Root } from "../root";
import { home } from "../home";
import { login } from "../login";
import { settings } from "../settings";
import { coffee } from "../coffee";
import { beer } from "../beer";

const initialRoute = parsePath(getPath());

export const app = {
  initialState: () => ({
    route: {},
    navigateTo: initialRoute,
    navigateAway: {}
  }),

  actions: ({ update }) => P({},
    login.actions({ update })
  ),

  computed: [
    login.computed
  ],

  services: [
    home.service,
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
