/**
 * Helper to setup the Meiosis pattern.
 *
 * @function meiosis.react.setup
 *
 * @param {React} React - the React instance.
 * @param {React.Component} Root -  your Root component, which receives `state` and `actions`.
 *
 * @returns {React.Component} - the top-level component to which you pass `states` and `actions`.
 */
export default ({ React, Root }) => {
  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = props.states();
      this.skippedFirst = false;
    }
    componentDidMount() {
      const setState = this.setState.bind(this);
      this.props.states.map(state => {
        if (this.skippedFirst) {
          setState(state);
        } else {
          this.skippedFirst = true;
        }
      });
    }
    render() {
      const state = this.state;
      const { actions } = this.props;

      return React.createElement(Root, { state, actions });
    }
  }
  return App;
};
