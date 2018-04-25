// https://reactjs.org/docs/render-props.html
import React from "react";

class Duck extends React.Component {
  render() {
    const pointer = this.props.pointer;
    return (
      <span style={{ position: "absolute", left: pointer.x, top: pointer.y }}>
        DUCK
      </span>
    );
  }
}

class Pointer extends React.Component {
  constructor(props) {
    super(props);
    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.state = { x: 10, y: 210 };
  }

  handlePointerMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div
        style={{ height: "100px", border: "1px solid red" }}
        onMouseMove={this.handlePointerMove}
      >
        {/*
          Instead of providing a static representation of what <Pointer> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

export class PointerTracker extends React.Component {
  render() {
    return (
      <div>
        <Pointer render={pointer => <Duck pointer={pointer} />} />
      </div>
    );
  }
}

