import React, { Component } from "react";
import { fold } from "stags";

import { Home } from "../home";
import { Login } from "../login";
import { Settings } from "../settings";
import { Coffee } from "../coffee";
import { Beer } from "../beer";

import { RoutePage, getNavigation, getPath, setPath } from "../util";

const componentMap = fold(RoutePage)({
  Home: () => Home,
  Login: () => Login,
  Settings: () => Settings,
  Coffee: () => Coffee,
  Beer: () => Beer
});

export const root = {
  actions: ({ update }) => ({
    navigateTo: (id, value) => update(getNavigation({ id, values: { id: value } }))
  })
};

// Keeps the location bar in sync
class LocationBarSync extends Component {
  render() {
    const { state } = this.props;

    let path = "/" + state.route.case;
    if (state.route.value && state.route.value.id) {
      path = path + "/" + state.route.value.id;
    }
    if (getPath() !== path) {
      setPath(path);
    }

    return null;
  }
}

export class Root extends Component {
  render() {
    const { state, actions } = this.props;

    const componentId = state.route.case;
    const Component = componentMap(state.route);
    const isActive = tab => tab === componentId ? "active" : "";

    return (
      <div>
        <nav className="navbar navbar-default">
          <ul className="nav navbar-nav">
            <li className={isActive("Home")}>
              <a href="javascript://"
                onClick={() => actions.navigateTo("Home")}
              >Home</a>
            </li>
            <li className={isActive("Login")}>
              <a href="javascript://"
                onClick={() => actions.navigateTo("Login")}
              >Login</a>
            </li>
            <li className={isActive("Settings")}>
              <a href="javascript://"
                onClick={() => actions.navigateTo("Settings")}
              >Settings</a>
            </li>
            <li className={isActive("Coffee")}>
              <a href="javascript://"
                onClick={() => actions.navigateTo("Coffee")}
              >Coffee</a>
            </li>
            <li className={isActive("Beer")}>
              <a href="javascript://"
                onClick={() => actions.navigateTo("Beer")}
              >Beer</a>
            </li>
          </ul>
        </nav>
        <Component state={state} actions={actions} />
        <LocationBarSync state={state} />
        {/* Show or hide the Please Wait modal. See public/css/style.css */}
        <div style={{visibility: state.pleaseWait ? "visible" : "hidden"}}>
          <div className="modal">
            <div className="box">
              <p>Loading, please wait...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
