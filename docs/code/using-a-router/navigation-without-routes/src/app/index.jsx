import React, { Component } from "react";
import { Home } from "../home";
import { Coffee } from "../coffee";
import { Beer } from "../beer";

export const app = {
  initialState: () => ({
    pageId: "HomePage"
  }),
  actions: update => Object.assign({}, {
    navigateTo: pageId => update({ pageId })
  })
};

const componentMap = {
  "HomePage": Home,
  "CoffeePage": Coffee,
  "BeerPage": Beer
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

    const Component = componentMap[state.pageId];
    const currentTab = state.pageId;
    const isActive = tab => tab === currentTab ? "active" : "";

    return (
      <div>
        <nav className="navbar navbar-default">
          <ul className="nav navbar-nav">
            <li className={isActive("HomePage")}>
              <a href="#"
                onClick={() => actions.navigateTo("HomePage")}
              >Home</a>
            </li>
            <li className={isActive("CoffeePage")}>
              <a href="#"
                onClick={() => actions.navigateTo("CoffeePage")}
              >Coffee</a>
            </li>
            <li className={isActive("BeerPage")}>
              <a href="#"
                onClick={() => actions.navigateTo("BeerPage")}
              >Beer</a>
            </li>
            <li className="btn">
              <button className="btn btn-default"
                onClick={_evt => actions.navigateTo("HomePage")}>Home</button>
            </li>
            <li className="btn">
              <button className="btn btn-default"
                onClick={_evt => actions.navigateTo("CoffeePage")}>Coffee</button>
            </li>
            <li className="btn">
              <button className="btn btn-default"
                onClick={_evt => actions.navigateTo("BeerPage")}>Beer</button>
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
