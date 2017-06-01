/*global window*/
(function(ref) {
  ref.receive = function(state) {
    return function(model, proposal) {
      if (state.counting(model)) {
        if (model.counter === 0) {
          model.launched = proposal.launched || false;
        }
        else {
          model.aborted = proposal.aborted || false;
          if (proposal.counter !== undefined) {
            model.counter = proposal.counter;
          }
        }
      }
      else if (state.ready(model)) {
        model.started = proposal.started || false;
      }

      return model;
    };
  };
})(window);
