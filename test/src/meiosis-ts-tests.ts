import test, { TestContext } from "ava";
import { CreateEvents, EventType, Stream, createEvents } from "../../lib/index";
import * as flyd from "flyd";

test("create events with nested components", (t: TestContext): void => {
});

test("create events with reusable components", (t: TestContext): void => {
  const randomGif: any = {
    events: ["newGifSuccess"]
  };

  const eventStream: Stream<EventType> = flyd.stream<EventType>();
  const eventSpec: CreateEvents = {
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
  };
  const events: any = createEvents(eventSpec);

  t.plan(2);

  events.increment.newGifSuccess.map(() => t.pass());
  events.randomGifCounter2.randomGif.newGifSuccess.map(() => t.pass());

  events.randomGifCounter2.randomGif.newGifSuccess(1);
});
