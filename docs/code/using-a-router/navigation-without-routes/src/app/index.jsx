import React, { Component } from "react";
import { P } from "patchinko/explicit";

import { getNavigation, getPath, parsePath, setPath } from "../util";

import { root, Root } from "../root";
import { login } from "../login";
import { settings } from "../settings";
import { coffee } from "../coffee";
import { beer } from "../beer";

const onNavigateDefault = x => x;

const onNavigateConfig = [
  root,
  login,
  settings,
  coffee,
  beer
].reduce((result, next) => P(result, next.onNavigate), {});

// Service to keep the location bar in sync
const service = state => {
  let path = "/" + state.route.id;
  if (state.route.values && state.route.values.id) {
    path = path + "/" + state.route.values.id;
  }
  if (getPath() !== path) {
    setPath(path);
  }
};

export const app = {
  initialState: () => {
    const state = {};
    return app.onNavigate({ state, navigation: getNavigation(parsePath(getPath())) });
  },

  actions: ({ update, navigate }) => P({},
    root.actions({ update, navigate }),
    login.actions({ update, navigate })
  ),

  service: state => [
    service
  ].reduce((x, f) => P(x, f(x)), state),

  onNavigate: ({ state, navigation }) =>
    // Sync or async return data for page
    // For please wait, return sync { pleaseWait } and then load async in postNavigate
    // To wait for loading to complete before going to page, return async data
    (onNavigateConfig[navigation.route.id] || onNavigateDefault)({ state, navigation })
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
