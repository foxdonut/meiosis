import React, { Component } from "react";
import { P } from "patchinko/explicit";

import { getNavigation } from "../util";

import { root, Root } from "../root";
import { login } from "../login";
import { settings } from "../settings";
import { coffee } from "../coffee";
import { beer } from "../beer";

const defaultValidateNavigation = () => true;
const defaultOnNavigateTo = () => ({});
const defaultOnNavigateAway = () => ({});
const defaultPostNavigate = () => null;

const validateNavigation = {
  SettingsPage: settings.validateNavigation
};

const onNavigateTo = {
  LoginPage: login.onNavigateTo,
  CoffeePage: coffee.onNavigateTo,
  BeerPage: beer.onNavigateTo
};

const onNavigateAway = {
  LoginPage: login.onNavigateAway
};

const postNavigate = {
  BeerPage: beer.postNavigate
};

// This is external to the app and is meant to simulate the browser's location bar.
const getPath = () => document.getElementById("pathInput").value;
const setPath = path => document.getElementById("pathInput").value = path;

const service = state => {
  const path = "/" + state.route.id;
  if (getPath() !== path) {
    setPath(path);
  }
};

export const app = {
  // Returns true if navigation is value, or another navigation to redirect
  validateNavigation: ({ state, navigation }) => {
    const fn = (validateNavigation[navigation.route.id] || defaultValidateNavigation);
    const result = fn({ state, navigation });
    if (result === true) {
      return navigation;
    }
    return app.validateNavigation({ state, navigation: result });
  },

  // Sync or async return data for page
  // For please wait, return sync { pleaseWait } and then load async in postNavigate
  // To wait for loading to complete before going to page, return async data
  onNavigateTo: ({ state, navigation }) =>
    Promise.resolve()
      .then(() => (onNavigateTo[navigation.route.id] || defaultOnNavigateTo)({ state, navigation }))
      .then(data => Object.assign({}, navigation, data)),

  // Async load data and update
  postNavigate: ({ state, navigation, update }) =>
    (postNavigate[navigation.route.id] || defaultPostNavigate)({ state, navigation, update }),

  onNavigateAway: ({ state, navigation }) =>
    Promise.resolve()
      .then(() => (onNavigateAway[navigation.route.id] || defaultOnNavigateAway)({ state, navigation })),

  initialState: () => {
    const navigation = getNavigation("HomePage"); // parseUrl(getPath());
    //const nav = validateNavigation(navigation);
    //postNavigate({ state, navigation, update });
    //return Promise.resolve({}).then(() => onNavigateTo({ state, navigation }))
    return navigation;
  },

  actions: ({ update, navigate }) => P({},
    root.actions({ update, navigate }),
    login.actions({ update, navigate })
  ),

  service: state => [
    service
  ].reduce((x, f) => P(x, f(x)), state)
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
