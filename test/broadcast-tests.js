import { expect } from "chai";
import { Subject } from "rxjs/Subject";
import { identity } from "ramda";
import Type from "union-type";

import { broadcast } from "../src/index";

describe("library/broadcast", function() {
  const Action = Type({
    NoOp: []
  });

  const data = "data";

  it("broadcasts to a list of listeners", function(done) {
    const listeners = [
      new Subject(),
      new Subject()
    ];

    let count = 0;

    listeners.forEach(listener => {
      listener.subscribe((received) => {
        expect(received).to.equal(data);

        count++;

        if (count >= 2) {
          done();
        }
      });
    });

    broadcast(listeners)(data)(Action.NoOp()).fork(identity, identity);
  });

  it("dispatches an action", function(done) {
    const listener = new Subject();

    let count = 0;

    const verifyDone = function() {
      count++;

      if (count >= 2) {
        done();
      }
    };

    listener.subscribe((received) => {
      expect(received).to.equal(data);
      verifyDone();
    });

    const resolve = result => {
      expect(result).to.deep.equal(Action.NoOp());
      verifyDone();
    };

    broadcast([listener])(data)(Action.NoOp()).fork(identity, resolve);
  });
});
