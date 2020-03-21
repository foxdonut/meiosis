/**
 * Helper to setup the Meiosis pattern with [Preact](https://preactjs.com/).
 *
 * @function meiosis.preact.setup
 *
 * @param {preact.h} h - the Preact h function.
 * @param {preact.Component} Component - the Preact Component class.
 * @param {preact.Component} Root - your Root component, which receives `state`, `update`, and
 * `actions`.
 *
 * @returns {preact.Component} - the top-level component to which you pass `states`, and either
 * `update`, `actions`, or both.
 */
export default ({ h, Component, Root }) => {
  class App extends Component {
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
      const { update, actions } = this.props;

      return h(Root, { state, update, actions });
    }
  }
  return App;
};
