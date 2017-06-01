/*global window*/
(function(ref) {
  ref.actions = function(propose) {
    return {
      start: function() {
        propose({ started: true });
      },
      decrement: function(counter) {
        setTimeout(function() {
          propose({ counter: counter - 1 });
        }, 1000);
      },
      launch: function() {
        propose({ launched: true });
      },
      abort: function() {
        propose({ aborted: true });
      }
    };
  };
})(window);
