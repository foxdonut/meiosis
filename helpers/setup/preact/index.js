/**
 * Helper to setup the Meiosis pattern.
 *
 * @function meiosis.preact.setup
 *
 * @param {preact} preact - the Preact instance.
 * @param {preact.Component} Root - your Root component, which receives `state` and `actions`.
 *
 * @returns {preact.Component} - the top-level component to which you pass `states` and `actions`.
 */
export default ({ preact, Root }) => {
  class App extends preact.Component {
    // eslint-disable-next-line react/no-deprecated
    componentWillMount() {
      const setState = this.setState.bind(this);
      this.props.states.map(setState);
    }
    render() {
      const state = this.state;
      const { actions } = this.props;

      return preact.h(Root, { state, actions });
    }
  }
  return App;
};
