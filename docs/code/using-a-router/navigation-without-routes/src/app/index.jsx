import React, { Component } from "react";
import { P } from "patchinko/explicit";

import { Root } from "../root";

export const app = {
  // Returns true if navigation is value, or another navigation to redirect
  validateNavigation: ({ state, navigation }) => {
    if (state && navigation) {
      return true;
    }
    // FIXME: getNavigation("Home")
    return { route: { id: "Home" } };
  },
  // Sync or async return data for page
  // For please wait, return sync { pleaseWait } and then load async in postNavigate
  // To wait for loading to complete before going to page, return async data
  onNavigate: ({ state, navigation }) => {
    if (state && navigation) {
      return new Promise(resolve =>
        setTimeout(() => resolve(P({ async: true }, navigation)), 1000)
      );
    }
    return navigation;
  },
  // Async load data and update
  postNavigate: ({ state, navigation, update }) => {
    if (state && navigation) {
      setTimeout(() => update({ data: true }), 1000);
    }
  },
  initialState: () => {
    const navigation = { route: { id: "Home" } }; // parseUrl(getPath());
    const nav = validateNavigation(navigation);
    postNavigate({ state, navigation, update });
    return Promise.resolve({}).then(() => onNavigate({ state, navigation })
  },
  actions: update => Object.assign({}, {
    navigateTo: id => update({ route: { id } })
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
