# [Meiosis](https://meiosis.js.org) Documentation

[Table of Contents](toc.html)

## SAM Pattern

The SAM (State-Action-Model) Pattern is a way to structure code into these parts:

- the Model, which contains the application state
- Actions, which _present_ values to the Model. The Model accepts (or partially accepts, or
even rejects) the presented values and modifies the application state accordingly
- the State, which transforms the application state for the view to consume
- the View, which is a function of the application state
- the Next-Action-Predicate (nap), which looks at the application state and decides whether
to automatically trigger another Action.

You can find more details and explanations on the [SAM web site](http://sam.js.org).

As you can see, SAM is essentially similar to the basis of Meiosis, but goes further with
the concept of _presenting_ values and _accepting_ or _rejecting_ them; the State function
to produce the application state for the View; and the Next-Action-Predicate.

Let's see how we can use the Meiosis pattern as a foundation and augment it to add these
concepts of the SAM pattern.

## Meiosis Pattern

Remember the fundamental Meiosis Pattern:

```javascript
const update = flyd.stream();
const app = createApp(update);
const models = flyd.scan((model, f) => f(model), app.initialModel(), update);
const element = document.getElementById("app");
models.map(model => { ReactDOM.render(app.view(model), element); });
```

Actions send functions to the `update` stream, which update the model. Using `scan`, we produce
a stream of models, from which we call the `view` function and render the result using the view
library of our choice.

We can also have actions send objects to the `update` stream. The section on
[Patchinko](03-Model-and-Nesting-C-Patchinko.html) shows how we can use the
[overloaded O function](https://github.com/barneycarroll/patchinko#overloaded) as our
accumulator for the `scan`:

```javascript
const update = flyd.stream();
const app = createApp(update);
const models = flyd.scan(O, app.initialModel(), update); // Use O as the accumulator
const element = document.getElementById("app");
models.map(model => { ReactDOM.render(app.view(model), element); });
```

## Using `update` as `present`

In SAM, actions _present_ values to the model, and the model's acceptor function decides if
and how to update the model. The `update` stream from Meiosis can be used as a `present` function
for actions.

```javascript
const present = flyd.stream();
const actions = createActions(present);
const app = createApp(actions);
const models = flyd.scan(O, app.initialModel(), present);
const element = document.getElementById("app");
models.map(model => { ReactDOM.render(app.view(model), element); });
```

## Acceptor

SAM has the concept of an _acceptor_ function in the model which receives the values presented
by actions and updates the model accordingly. In Meiosis, the acceptor function is the
_accumulator_ function that we use with `scan`. Right now this is Patchinko's `O` function, which
merges changes into the model. Let's separate it out into an explicit `acceptor` function:

```javascript
const acceptor = (model, proposal) => {
  return O(model, proposal);
};
```

The values presented by actions are _proposals_. The acceptor function gets the latest model and
the proposal, and decides how to update the model.

Because we are using objects as proposals, the acceptor function can examine the proposal and
conditionally refuse, partially accept, or otherwise change how the model gets updated. In the
example below, the action presents a value to navigate to a Settings page. But if the user is
not logged in -- the `user` is not in the model -- the acceptor navigates to the Login page
instead:

```javascript
const acceptor = (model, proposal) => {
  if (proposal.pageId === SettingsPage && !model.user) {
    return O(model, { pageId: LoginPage });
  }
  return O(model, proposal);
};
```

> Note that we are able to look at proposals because they are in the form of objects. We couldn't
do that if we were using functions instead. We can still have a SAM-like pattern with functions;
we'll come back to this later.

Now our setup is:

```javascript
const acceptor = (model, proposal) => { /* ... */ };
const present = flyd.stream();
const actions = createActions(present);
const app = createApp(actions);
const models = flyd.scan(acceptor, app.initialModel(), present);
const element = document.getElementById("app");
models.map(model => { ReactDOM.render(app.view(model), element); });
```

## State

The State function looks at the model and makes any changes necessary to produce application
state that is suitable for the view.

For example, say we want to prepare a login form by initializing the username and password
to blank strings. Further, we want to clear out those values when navigating away from the
login page:

```javascript
const prepareLogin = model => {
  if (model.pageId === LoginPage && !model.login) {
    return { login: { username: "", password: "" } };
  }
  else if (model.pageId !== LoginPage && model.login) {
    return { login: null };
  }
};
```

```javascript
const other = model => {
  if (...) {
    return { ... };
  }
};
```

```javascript
const state = model => [
  prepareLogin,
  other,
  ...
].reduce((x, f) => O(x, f(x)), model);
```

Now our setup is:

```javascript
const acceptor = (model, proposal) => { /* ... */ };
const present = flyd.stream();
const actions = createActions(present);
const app = createApp(actions);
const models = flyd.scan(acceptor, app.initialModel(), present);
const states = models.map(state);
const element = document.getElementById("app");
states.map(state => { ReactDOM.render(app.view(state), element); });
```

## Next-Action-Predicate

```javascript
const createNap = actions => state => {
  if (state.pageId === DataPage && !state.data) {
    actions.loadData();
  }
};
```

Our setup becomes:

```javascript
const acceptor = (model, proposal) => { /* ... */ };
const present = flyd.stream();
const actions = createActions(present);
const app = createApp(actions);
const models = flyd.scan(acceptor, app.initialModel(), present);
const states = models.map(state);
const element = document.getElementById("app");
states.map(state => { ReactDOM.render(app.view(state), element); });
const nap = createNap(actions);
states.map(nap);
```

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
