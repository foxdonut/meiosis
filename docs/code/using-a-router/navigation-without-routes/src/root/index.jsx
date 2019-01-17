import React, { Component } from "react";

import { Home } from "../home";
import { Login } from "../login";
import { Settings } from "../settings";
import { Coffee } from "../coffee";
import { Beer } from "../beer";

import { getNavigation } from "../util";

const componentMap = {
  HomePage: Home,
  LoginPage: Login,
  SettingsPage: Settings,
  CoffeePage: Coffee,
  BeerPage: Beer
};

export const root = {
  actions: ({ navigate }) => ({
    navigateTo: id => navigate(getNavigation(id))
  })
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
            <li className={isActive("HomePage")}>
              <a href="javascript://"
                onClick={() => actions.navigateTo("HomePage")}
              >Home</a>
            </li>
            <li className={isActive("LoginPage")}>
              <a href="javascript://"
                onClick={() => actions.navigateTo("LoginPage")}
              >Login</a>
            </li>
            <li className={isActive("SettingsPage")}>
              <a href="javascript://"
                onClick={() => actions.navigateTo("SettingsPage")}
              >Settings</a>
            </li>
            <li className={isActive("CoffeePage")}>
              <a href="javascript://"
                onClick={() => actions.navigateTo("CoffeePage")}
              >Coffee</a>
            </li>
            <li className={isActive("BeerPage")}>
              <a href="javascript://"
                onClick={() => actions.navigateTo("BeerPage")}
              >Beer</a>
            </li>
          </ul>
        </nav>
        {state.message ? <div>{state.message}</div> : null}
        <Component state={state} actions={actions} />
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
