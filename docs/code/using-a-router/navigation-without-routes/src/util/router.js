import { Component } from "react";

export const parsePath = path => {
  const first = path.indexOf("/");
  const last = path.lastIndexOf("/");
  if (first === last) {
    return { id: path.substring(first + 1) };
  }
  return { id: path.substring(first + 1, last), values: { id: path.substring(last + 1) } };
};

// This is external to the app and is meant to simulate the browser's location bar.
export const getPath = () => document.getElementById("pathInput").value;
export const setPath = path => document.getElementById("pathInput").value = path;

// Keeps the location bar in sync
export class LocationBarSync extends Component {
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
