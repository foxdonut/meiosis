/*global riot*/
(function(ref) {
  ref.riotView = function(actions) {
    riot.tag("counter", "<div>" +
      "<div><span>Riot Counter: { store.counter }</span></div>" +
      "<div>" +
      "<button class=\"btn btn-sm btn-primary\" onclick=\"{ actions.onInc }\"> + 3</button>" +
      "<button class=\"btn btn-sm btn-default\" onclick=\"{ actions.onDecr }\"> - 3</button>" +
      "</div>" +
      "</div>"
    , function() {
      this.actions = actions;
    });
  };
})(window);
