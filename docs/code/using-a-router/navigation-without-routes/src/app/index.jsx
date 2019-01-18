import React, { Component } from "react";
import { P } from "patchinko/explicit";

import { get, getNavigation, getPath, parsePath, setPath } from "../util";

import { root, Root } from "../root";
import { login } from "../login";
import { settings } from "../settings";
import { coffee } from "../coffee";
import { beer } from "../beer";

const navigationDefaults = {
  validate: () => true,
  before: () => ({}),
  after: () => null,
  leave: () => ({})
};

const navigationConfig = [
  root,
  login,
  settings,
  coffee,
  beer
].reduce((result, next) => P(result, next.navigation), {});

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
  initialState: ({ update }) => {
    const state = {};
    const navigation = app.navigation.validate({ state, navigation: getNavigation(parsePath(getPath())) });
    const result = app.navigation.before({ state, navigation });
    app.navigation.after({ state, navigation, update });
    return result;
  },

  actions: ({ update, navigate }) => P({},
    root.actions({ update, navigate }),
    login.actions({ update, navigate })
  ),

  service: state => [
    service
  ].reduce((x, f) => P(x, f(x)), state),

  navigation: {
    // Returns true if navigation is value, or another navigation to redirect
    validate: ({ state, navigation }) => {
      const fn = get(navigationConfig, [navigation.route.id, "validate"])
        || navigationDefaults.validate;
      const result = fn({ state, navigation });
      if (result === true) {
        return navigation;
      }
      return app.navigation.validate({ state, navigation: result });
    },

    // Sync or async return data for page
    // For please wait, return sync { pleaseWait } and then load async in postNavigate
    // To wait for loading to complete before going to page, return async data
    before: ({ state, navigation }) =>
      Promise.resolve()
        .then(() => (
          get(navigationConfig, [navigation.route.id, "before"]) || navigationDefaults.before
        )({ state, navigation }))
        .then(data => Object.assign({}, navigation, data)),

    // Async load data and update
    after: ({ state, navigation, update }) => (
      get(navigationConfig, [navigation.route.id, "after"]) || navigationDefaults.after
    )({ state, navigation, update }),

    leave: ({ state, navigation }) =>
      Promise.resolve()
        .then(() => (
          get(navigationConfig, [navigation.route.id, "leave"]) || navigationDefaults.leave
        )({ state, navigation }))
  }
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
