export interface Mapper<A, B> {
  (value: A): B;
}

export interface Stream<T> {
  /**
   * Gets the current value of the stream.
   */
  (): T;

  /**
   * Sets a new value on the stream.
   */
  (value: T): Stream<T>;

  /**
   * Maps over a stream.
   */
  map<T, R>(mapper: Mapper<T, R>): Stream<R>;
}

export interface Scanner<A, B> {
  (acc: A, next: B): A;
}

export interface TraceParameters<M> {
  modelChanges: Stream<any>;
  dataStreams: Array<Stream<any>>;
  otherStreams?: Array<Stream<any>>;
  copy?: Function;
}

export interface EventType {
  type: string;
  data: any;
}

export interface CreateEvents {
  eventStream: Stream<EventType>;
  events: any;
  connect?: any;
}

export function applyModelChange<M>(model: M, modelChange: Function) {
  return modelChange(model);
}

const createEventsFor = (eventStream: Stream<EventType>, events: any, top: any) => {
  createEventFor(eventStream, events, top, top, "");
  return top;
};

const createEventFor = (eventStream: Stream<EventType>, section: any,
    top: any, created: any, prefix: string) =>
{
  Object.keys(section).forEach(key => {
    if (section[key].length) {
      let emit: boolean = null;

      if (key === "emit") {
        emit = true;
      }
      else if (key === "listen") {
        emit = false;
      }
      else {
        throw new Error("key for events must be 'emit' or 'listen'.");
      }

      section[key].forEach((eventName: string) => {
        const type = prefix + eventName;

        let fn: any = null;

        if (emit) {
          fn = (data: any) => eventStream({ type, data });

          fn.map = (callback: Function) => eventStream.map((event: EventType) => {
            if (event.type === type) {
              callback(event.data);
            }
          });
        }
        else {
          fn = (data: any) => fn.callback && fn.callback(data);
          fn.map = (callback: Function) => fn.callback = callback;
        }

        created[eventName] = fn;
        top[type] = fn;
      });
    }
    else {
      created[key] = {};
      createEventFor(eventStream, section[key], top, created[key], prefix + key + ".");
    }
  });

  return created;
};

export const createEvents = (params: CreateEvents) => {
  const createdEvents = createEventsFor(params.eventStream, params.events, {});

  if (params.connect) {
    Object.keys(params.connect).forEach(type =>
      params.connect[type].forEach((listener: string) =>
        createdEvents[type].map((data: any) => createdEvents[listener](data))
      )
    );
  }

  return createdEvents;
};

export function isMeiosisTracerOn(): boolean {
  return window && window["__MEIOSIS_TRACER_GLOBAL_HOOK__"];
}

export function trace<M>(params: TraceParameters<M>): void {
  if (!params.modelChanges || !params.dataStreams) {
    throw new Error("Please specify streamLibrary, modelChanges, and dataStreams.");
  }

  /*
  Any change to lastStream automatically re-renders the view.

  "Live" changes are changes to the modelChanges stream.

  Keep track of the date of the last live change with the liveChange date.

  1. Live change
  - update the liveChange date
  - since liveChange !== lastChange, update=true
  - set lastChange = liveChange
  - send values to tracer with update=true. This will add to the tracer's history
    and increase the slider max.

  2. Time-travel change
  - receive MEIOSIS_RENDER_MODEL with sendValuesBack=false
  - send the data to the first stream, which then goes thru all streams
  - the view automatically re-renders
  - since liveChange === lastChange, update=false
  - don't send anything back to the tracer.

  3. Typing in model textarea
  - receive MEIOSIS_RENDER_MODEL with sendValuesBack=true. The tracer needs to be
    sent the computed values from the other streams.
  - send the data to the first stream, which then goes thru all streams
  - the view automatically re-renders
  - since liveChange === lastChange, update=false
  - since sendValuesBack=true, send the values to the tracer. But, update=false so
    this will not add to the tracer's history.

  4. Changes in otherStreams
  - initially send the ids of the streams
  - send new values with ids
  */

  if (isMeiosisTracerOn()) {
    const copy: any = params.copy || ((model: M) => JSON.parse(JSON.stringify(model)));
    const bufferedValues: Array<any> = [];
    const bufferedStreamValues: Array<any> = [];
    let devtoolInitialized: boolean = false;
    let sendValues: boolean = true;

    let liveChange: Date = new Date();
    let lastChange: Date = liveChange;
    params.modelChanges.map(() => liveChange = new Date());

    const lastStream = params.dataStreams[params.dataStreams.length - 1];

    let otherStreamIds: Array<string> = [];
    let otherStreamsById: any = {};

    if (params.otherStreams && params.otherStreams.length) {
      params.otherStreams.forEach(otherStream => {
        const streamId: string = "stream_" + new Date().getTime();
        otherStreamIds.push(streamId);
        otherStreamsById[streamId] = otherStream;

        otherStream.map(value => {
          const data: any = { type: "MEIOSIS_STREAM_VALUE", value, streamId };

          if (devtoolInitialized) {
            window.postMessage(data, "*");
          }
          else {
            bufferedStreamValues.push(data);
          }
        });
      });
    }

    window.addEventListener("message", evt => {
      if (evt.data.type === "MEIOSIS_RENDER_MODEL") {
        sendValues = evt.data.sendValuesBack;
        params.dataStreams[0](evt.data.model);
      }
      else if (evt.data.type === "MEIOSIS_TRACER_INIT") {
        devtoolInitialized = true;

        if (otherStreamIds.length > 0) {
          window.postMessage({ type: "MEIOSIS_STREAM_IDS", streamIds: otherStreamIds }, "*");
        }
        bufferedValues.forEach(values => window.postMessage({ type: "MEIOSIS_VALUES", values, update: true }, "*"));
        bufferedStreamValues.forEach(data => window.postMessage(data, "*"));
      }
      else if (evt.data.type === "MEIOSIS_TRIGGER_STREAM_VALUE") {
        const streamId: string = evt.data.streamId;
        const value: any = evt.data.value;

        otherStreamsById[streamId](value);
      }
    });

    lastStream.map(() => {
      const update: boolean = liveChange !== lastChange;
      lastChange = liveChange;

      if (sendValues || update) {
        const values: Array<any> = params.dataStreams.map((stream: Stream<any>) =>
          ({ value: copy(stream()) }));

        if (devtoolInitialized) {
          window.postMessage({ type: "MEIOSIS_VALUES", values, update }, "*");
        }
        else {
          bufferedValues.push(values);
        }
      }
    });
  }
};
