(function(ref) {
  ref.nextAction = function(state) {
    return function(model, proposal, actions) {
      if (state.counting(model)) {
        if (model.counter > 0) {
          actions.decrement(model.counter);
        }
        else if (model.counter === 0) {
          actions.launch();
        }
      }
    };
  };
})(window);
