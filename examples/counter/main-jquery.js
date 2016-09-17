/*global meiosis, meiosisVanillaJs, $*/
(function() {
  var initialModel = { counter: 0 };

  var view = function(model) {
    return "<div><span>jQuery Counter: " + model.counter + "</span></div>" +
      "<div><button id='inc' class='btn btn-sm btn-primary'>+ 1</button>" +
      "<button id='decr' class='btn btn-sm btn-default'>- 1</button></div>";
  };

  var receive = function(model, proposal) {
    return { counter: model.counter + proposal.add };
  };

  var ready = function(propose) {
    var $root = $(document.getElementById("app"));

    $root.on("click", "button#inc", function(_evt) {
      propose({ add: 1 });
    });
    $root.on("click", "button#decr", function(_evt) {
      propose({ add: -1 });
    });
  };

  var Main = meiosis.createComponent({
    initialModel: initialModel,
    view: view,
    ready: ready,
    receive: receive
  });

  meiosis.run(meiosisVanillaJs.renderer().intoId(document, "app"), Main);
})();
