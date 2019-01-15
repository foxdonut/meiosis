import React, { Component } from "react";

export class Beer extends Component {
  render() {
    const { state } = this.props;

    return (
      <div>
        <p>Beer Page</p>
        <ul>
          {(state.beers || []).map(beer =>
            <li key={beer.id}>
              <a href={navigator.blankHref}
                onClick={() => null /*navigator.navigateTo("BeerDetailsPage", { id: beer.id })*/}
              >{beer.title}</a>
              {" "}
              <button className="btn btn-default btn-xs"
                onClick={() => null /*
                navigator.navigateTo("BeerDetailsPage", { id: beer.id })*/}>
                {beer.title}
              </button>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export class BeerDetails extends Component {
  render() {
    const { state } = this.props;

    return (
      <p>{state.beer}</p>
    );
  }
}
