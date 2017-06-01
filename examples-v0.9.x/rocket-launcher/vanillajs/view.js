(function(ref) {
  ref.view = {
    // State representation of the ready state
    ready: function(model) {
      return (
        "<p>Counter: "+model.counter+"</p>\n\
          <form class=\"start\">\n\
            <input type=\"submit\" class=\"btn btn-primary\" value=\"Start\">\n\
          </form>"
      );
    },

    // State representation of the counting state
    counting: function(model) {
      return (
        "<p>\n\
          Count down: "+model.counter+" "+(model.even ? "(Even)" : "(Odd)") + "\n" +
          (model.closeToLaunch ? " CLOSE TO LAUNCH!" : "") +
        "</p>\n\
        <form class=\"counting\">\n\
          <input type=\"submit\" class=\"btn btn-danger\" value=\"Abort\">\n\
        </form>"
      );
    },

    // State representation of the aborted state
    aborted: function(model) {
      return (
        "<p>Aborted at Counter: "+model.counter+"</p>\n"
      );
    },

    // State representation of the launched state
    launched: function(_model) {
      return (
        "<p>Launched</p>"
      );
    }
  };
})(window);
