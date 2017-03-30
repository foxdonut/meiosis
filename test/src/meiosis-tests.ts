import test from "ava";
import { createEvents } from "../../lib/index";
import * as flyd from "flyd";

test("create events with nested components", t => {
  const formComponent = {
    events: {
      emit: ["saveTodoFailure", "saveTodoStart", "saveTodoSuccess"],
      listen: ["editTodo"]
    }
  };

  const listComponent = {
    events: {
      emit: ["editTodo"],
      listen: ["error", "pleaseWait", "todoList", "updateTodo"]
    }
  };

  const eventStream = flyd.stream();
  const events = createEvents({
    eventStream,
    events: {
      form: formComponent.events,
      list: listComponent.events
    },
    connect: {
      "form.saveTodoFailure": ["list.error"],
      "form.saveTodoStart": ["list.pleaseWait"],
      "form.saveTodoSuccess": ["list.updateTodo"],
      "list.editTodo": ["form.editTodo"]
    }
  });

  t.plan(1);

  events.form.editTodo.map(() => t.pass());
  events.list.editTodo(true);
});

test("create events with reusable components", t => {
  const randomGif = {
    events: {
      emit: ["newGifSuccess"]
    }
  };

  const increment = {
    events: {
      listen: ["newGifSuccess"]
    }
  };

  const eventStream = flyd.stream();
  const events = createEvents({
    eventStream,
    events: {
      randomGif: randomGif.events,
      randomGifCounter1: {
        randomGif: randomGif.events,
      },
      randomGifCounter2: {
        randomGif: randomGif.events,
      },
      increment: increment.events
    },
    connect: {
      "randomGif.newGifSuccess": ["increment.newGifSuccess"],
      "randomGifCounter2.randomGif.newGifSuccess": ["increment.newGifSuccess"]
    }
  });

  t.plan(2);

  events.increment.newGifSuccess.map(() => t.pass());
  events.randomGifCounter2.randomGif.newGifSuccess.map(() => t.pass());

  events.randomGifCounter2.randomGif.newGifSuccess(1);
});

test("create events at the root", t => {
  const eventStream = flyd.stream();
  const events = createEvents({
    eventStream,
    events: {
      emit: ["send"],
      listen: ["receive"]
    },
    connect: {
      "send": ["receive"]
    }
  });

  t.plan(1);

  events.receive.map(() => t.pass());

  events.send(true);
});

test("create events with single string connect", t => {
  const eventStream = flyd.stream();
  const events = createEvents({
    eventStream,
    events: {
      emit: ["send"],
      listen: ["receive"]
    },
    connect: {
      "send": "receive"
    }
  });

  t.plan(1);

  events.receive.map(() => t.pass());

  events.send(true);
});

test("create events with '*.something' connect, many to one", t => {
  const eventStream = flyd.stream();
  const events = createEvents({
    eventStream,
    events: {
      form: {
        emit: ["routeChange"]
      },
      list: {
        emit: ["routeChange"]
      },
      router: {
        listen: ["onRouteChange"]
      }
    },
    connect: {
      "*.routeChange": "router.onRouteChange"
    }
  });

  t.plan(2);

  events.router.onRouteChange.map(() => t.pass());

  events.form.routeChange(true);
  events.list.routeChange(true);
});

test("create events with '*.something' connect, many to many", t => {
  const eventStream = flyd.stream();
  const events = createEvents({
    eventStream,
    events: {
      form: {
        emit: ["routeChange"]
      },
      list: {
        emit: ["routeChange"]
      },
      router: {
        listen: ["onRouteChange"]
      },
      another: {
        listen: ["onRouteChange"]
      }
    },
    connect: {
      "*.routeChange": "*.onRouteChange"
    }
  });

  t.plan(4);

  events.router.onRouteChange.map(() => t.pass());
  events.another.onRouteChange.map(() => t.pass());

  events.form.routeChange(true);
  events.list.routeChange(true);
});
