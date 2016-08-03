(function(ref) {
  ref.display = function(state, view) {
    return function(model, actions) {
      var representation = "oops... something went wrong, the system is in an invalid state";

      if (state.ready(model)) {
        representation = view.ready(model, actions);
      }

      if (state.counting(model)) {
        representation = view.counting(model, actions);
      }

      if (state.launched(model)) {
        representation = view.launched(model);
      }

      if (state.aborted(model)) {
        representation = view.aborted(model) ;
      }

      return representation;
    };
  };
})(window);
