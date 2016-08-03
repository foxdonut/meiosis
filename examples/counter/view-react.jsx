/*global window, React*/
(function(ref) {
  ref.reactView = function(model, propose) {
    var onInc = function(_evt) {
      propose({ add: 2 });
    };
    var onDecr = function(_evt) {
      propose({ add: -2 });
    };
    return (
      <div>
        <div><span>React Counter: {model.counter}</span></div>
        <div>
          <button className="btn btn-sm btn-primary" onClick={onInc}>+ 2</button>
          <span> </span>
          <button className="btn btn-sm btn-default" onClick={onDecr}>- 2</button>
        </div>
      </div>
    );
  };
})(window);
