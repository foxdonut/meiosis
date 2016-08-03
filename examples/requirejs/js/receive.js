/*global define*/
define([], function() {
  return function(model, proposal) {
    return { counter: model.counter + proposal.add };
  };
});
