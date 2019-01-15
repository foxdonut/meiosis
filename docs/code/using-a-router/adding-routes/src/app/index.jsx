import React, { Component } from "react";
import { P } from "patchinko/explicit";

import { routing } from "./routing";
import { service } from "./service";

import { Home } from "../home";
import { Coffee } from "../coffee";
import { Beer } from "../beer";

export const app = {
  initialState: () => ({
    route: routing.parseUrl(document.location.hash.substring(1) || "/")
  }),
  actions: (_update, navigate) => Object.assign({}, {
    navigateTo: (id, values) => navigate({ route: { id, values } })
  }),
  routing,
  service: state => [
    service
  ].reduce((x, f) => P(x, f(x)), state)
};

const componentMap = {
  "Home": Home,
  "Coffee": Coffee,
  "Beer": Beer
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

    const Component = componentMap[state.route.id];
    const currentTab = state.route.id;
    const isActive = tab => tab === currentTab ? "active" : "";

    return (
      <div>
        <nav className="navbar navbar-default">
          <ul className="nav navbar-nav">
            <li className={isActive("Home")}>
              <a href="#/">Home</a>
            </li>
            <li className={isActive("Coffee")}>
              <a href="#/coffee">Coffee</a>
            </li>
            <li className={isActive("Beer")}>
              <a href="#/beer">Beer</a>
            </li>
            <li className="btn">
              <button className="btn btn-default"
                onClick={_evt => actions.navigateTo("Home")}>Home</button>
            </li>
            <li className="btn">
              <button className="btn btn-default"
                onClick={_evt => actions.navigateTo("Coffee")}>Coffee</button>
            </li>
            <li className="btn">
              <button className="btn btn-default"
                onClick={_evt => actions.navigateTo("Beer")}>Beer</button>
            </li>
          </ul>
        </nav>
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
