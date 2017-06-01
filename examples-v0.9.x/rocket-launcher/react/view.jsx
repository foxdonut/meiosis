/*global React*/
(function(ref) {
  ref.view = {
    // State representation of the ready state
    ready: (model, actions) => {
      const onStart = function(evt) {
        evt.preventDefault();
        actions.start();
      };
      return (<div>
        <p>Counter: {model.counter}</p>
        <form>
          <input type="submit" className="btn btn-primary" value="Start" onClick={onStart}/>
        </form>
      </div>);
    },

    // State representation of the counting state
    counting: (model, actions) => {
      const onAbort = function(evt) {
        evt.preventDefault();
        actions.abort();
      };
      return (<div>
        <p>
          Count down: {model.counter} {model.even ? "(Even)" : "(Odd)"}
          {model.closeToLaunch ? " CLOSE TO LAUNCH!" : ""}
        </p>
        <form>
          <input type="submit" className="btn btn-danger" value="Abort" onClick={onAbort}/>
        </form>
      </div>);
    },

    // State representation of the aborted state
    aborted: model => (<p>Aborted at Counter: {model.counter}</p>),

    // State representation of the launched state
    launched: () => (<p>Launched</p>)
  };
})(window);
