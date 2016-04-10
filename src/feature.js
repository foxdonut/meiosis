/*
Config action model =
  { inputs : List (action$)
  , initialModel : [ model, Task action ]
  , update : action -> model -> [ model, Task action ]
  , view : Address action -> model -> Html
  }

Feature =
  { view$ : Html$
  , taskRunner : (Task Never ())$
  }
*/
import { BehaviorSubject } from "rx";
import Task from "data.task";
//import { Future } from "ramda-fantasy";

const createFeature = config => {
  // action$ : Subject<Action>
  const action$ = new BehaviorSubject(null);

  // mergedAction$ : Observable<Action>
  let mergedAction$ = action$;

  (config.inputs || []).forEach(input$ => {
    mergedAction$ = mergedAction$.merge(input$);
  });

  // update : [ Model, Task Action ] -> Action -> [ Model, Task Action ]
  const update = (modelAndTask, action) => action ?
    config.update(action)(modelAndTask[0]) : modelAndTask;

  // modelAndTask$ : Observable<[Model, Task Action]>
  const modelAndTask$ = mergedAction$.scan(update, config.initialModel).shareReplay(1);

  // model$ : Observable<Model>
  const model$ = modelAndTask$.map(modelAndTask => modelAndTask[0]);

  // view$ : Observable<Html>
  const view$ = model$.map(config.view(action$));

  // sendAction : Action -> Task Never ()
  const sendAction = action => new Task((rej, res) => res(action$.onNext(action)));
  //const sendAction = action => Future((rej, res) => res(action$.next(action)));

  // task$ : Observable<Task Never ()>
  const task$ = modelAndTask$.map(modelAndTask =>
    !!modelAndTask[1] ? modelAndTask[1].chain(sendAction) : Task.of(null));

  const result = {
    view$,
    task$
  };

  return result;
};

const identity = x => x;
const taskRunner = task => task.fork(identity, identity);

export { createFeature, taskRunner };
