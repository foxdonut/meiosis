import React, { Component } from "react";
import { P } from "patchinko/explicit";

import { NavigateTo, RoutePage, getPath, parsePath, setPath } from "../util";

import { root, Root } from "../root";
import { home } from "../home";
import { login } from "../login";
import { settings } from "../settings";
import { coffee } from "../coffee";
import { beer } from "../beer";

// Service to keep the location bar in sync
const service = ({ state }) => {
  let path = "/" + state.route.id;
  if (state.route.values && state.route.values.id) {
    path = path + "/" + state.route.values.id;
  }
  if (getPath() !== path) {
    setPath(path);
  }
};

export const app = {
  initialState: () => ({
    route: RoutePage[parsePath(getPath()).id]({ values: null }),
    navigateTo: NavigateTo.N()
  }),

  actions: ({ update, navigate }) => P({},
    root.actions({ update, navigate }),
    login.actions({ update, navigate })
  ),

  services: [
    service,
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
