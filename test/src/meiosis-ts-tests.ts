import test, { TestContext } from "ava";
import { CreateEvents, EventType, Stream, createEvents } from "../../lib/index";
import * as flyd from "flyd";

test("create events with nested components", (t: TestContext): void => {
  const formComponent: any = {
    events: {
      emit: ["saveTodoFailure", "saveTodoStart", "saveTodoSuccess"],
      listen: ["editTodo"]
    }
  };

  const listComponent: any = {
    events: {
      emit: ["editTodo"],
      listen: ["error", "pleaseWait", "todoList", "updateTodo"]
    }
  };

  const eventStream: Stream<EventType> = flyd.stream<EventType>();
  const eventSpec: CreateEvents = {
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
  };
  const events: any = createEvents(eventSpec);

  t.plan(1);

  events.form.editTodo.map(() => t.pass());
  events.list.editTodo(true);
});

test("create events with reusable components", (t: TestContext): void => {
  const randomGif: any = {
    events: {
      emit: ["newGifSuccess"]
    }
  };

  const increment: any = {
    events: {
      listen: ["newGifSuccess"]
    }
  };

  const eventStream: Stream<EventType> = flyd.stream<EventType>();
  const eventSpec: CreateEvents = {
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
  };
  const events: any = createEvents(eventSpec);

  t.plan(2);

  events.increment.newGifSuccess.map(() => t.pass());
  events.randomGifCounter2.randomGif.newGifSuccess.map(() => t.pass());

  events.randomGifCounter2.randomGif.newGifSuccess(1);
});
