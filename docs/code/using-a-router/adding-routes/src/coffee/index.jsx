import React, { Component } from "react";

export class Coffee extends Component {
  render() {
    const { state } = this.props;

    return (
      <div>
        <p>Coffee Page</p>
        <ul>
          {(state.coffees || []).map(coffee =>
            <li key={coffee.id}>
              <a href="#"
                onClick={() => null /*navigator.navigateTo(CoffeePage, { id: coffee.id })*/}
              >{coffee.title}</a>
              <button className="btn btn-default btn-xs"
                onClick={() => null /*
                navigator.navigateTo(CoffeePage, { id: coffee.id })*/}>
                {coffee.title}
              </button>
            </li>
          )}
        </ul>
        {state.coffee}
      </div>
    );
  }
}
