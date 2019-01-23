import React, { Component } from "react";

import { get } from "../util";
import { LocationBarSync } from "../util/router";

import { Home } from "../home";
import { Login } from "../login";
import { Settings } from "../settings";
import { Coffee } from "../coffee";
import { Beer } from "../beer";

const componentMap = {
  Home,
  Login,
  Settings,
  Coffee,
  Beer
};

export const root = {
  actions: ({ update }) => ({
    navigateTo: (id, value) => update({ navigateTo: { id, values: { id: value } } })
  }),
  service: ({ state, update }) => {
    const result = {};

    // Navigate To => route
    if (state.navigateTo.id) {
      result.route = state.navigateTo;
      result.navigateTo = {};
    }

    // Just a computed value for a scenario where we want to avoid infinite loops
    result.usernameLength = (get(state, ["login", "username"]) || "").length;

    // Navigate Away - call update because we want other services to see this
    if (state.navigateTo.id !== state.route.id && state.navigateAway.id !== state.route.id) {
      result.navigateAway = state.route;
    }

    return result;
  }
};

export class Root extends Component {
  render() {
    const { state, actions } = this.props;

    const componentId = state.route.id;
    const Component = componentMap[componentId];
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
