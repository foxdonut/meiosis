import React, { Component } from "react";

import { Root } from "../root";

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
    const { actions, router } = this.props;

    return <Root state={state} actions={actions} router={router} />;
  }
}
