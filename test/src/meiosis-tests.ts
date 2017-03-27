import test from "ava";
import { createEvents } from "../../lib/index";
import * as flyd from "flyd";

test("create events with nested components", t => {
  const formComponent = {
    events: {
      emit: ["saveStart", "saveSuccess"],
      listen: ["edit"]
    }
  };

  const listComponent = {
    events: {
      emit: ["edit"],
      listen: ["pleaseWait", "saveSuccess"]
    }
  };

  const eventStream = flyd.stream();
  // This was the old way, use it to make sure the tests work.
  const events = createEvents({
    eventStream,
    emit: {
      form: [
        "saveTodoFailure",
        "saveTodoStart",
        "saveTodoSuccess",
      ],
      list: [
        "editTodo"
      ]
    },
    listen: {
      form: [
        "editTodo"
      ],
      list: [
        "error",
        "pleaseWait",
        "todoList",
        "updateTodo"
      ]
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
    events: ["newGifSuccess"]
  };

  const eventStream = flyd.stream();
  const events = createEvents({
    eventStream,
    emit: {
      randomGif: randomGif.events,
      randomGifCounter1: {
        randomGif: randomGif.events
      },
      randomGifCounter2: {
        randomGif: randomGif.events
      }
    },
    listen: {
      increment: randomGif.events
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
