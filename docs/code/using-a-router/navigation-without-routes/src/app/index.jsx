import React, { Component } from "react";
import { P } from "patchinko/explicit";

import { getNavigation } from "../util";

import { Root } from "../root";
import { login } from "../login";
import { settings } from "../settings";
import { coffee } from "../coffee";

const defaultValidateNavigation = () => true;
const defaultOnNavigate = () => ({});

const validateNavigation = {
  SettingsPage: settings.validateNavigation
};

const onNavigate = {
  LoginPage: login.onNavigate,
  CoffeePage: coffee.onNavigate
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
  onNavigate: ({ state, navigation }) =>
    Promise.resolve()
      .then(() => (onNavigate[navigation.route.id] || defaultOnNavigate)({ state, navigation }))
      .then(data => P({}, navigation, data)),
  /*
    if (state && navigation) {
      return new Promise(resolve =>
        setTimeout(() => resolve(P({ async: true }, navigation)), 1000)
      );
    }
    return navigation;
  },
  */
  // Async load data and update
  postNavigate: ({ state, navigation, update }) => {
    if (state && navigation) {
      setTimeout(() => update({ data: true }), 1000);
    }
  },
  initialState: () => {
    const navigation = getNavigation("HomePage"); // parseUrl(getPath());
    //const nav = validateNavigation(navigation);
    //postNavigate({ state, navigation, update });
    //return Promise.resolve({}).then(() => onNavigate({ state, navigation }))
    return navigation;
  },
  actions: ({ navigate }) => Object.assign({}, {
    navigateTo: id => navigate(getNavigation(id))
  })
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
