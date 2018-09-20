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

As you can see, the basis of Meiosis is similar to SAM, but SAM goes further with
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

We can also have actions send **objects** to the `update` stream. The section on
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

Let's look at an example. Say we have navigation between different pages. Clicking on a section
of the navigation bar shows the corresponding page. To navigate, we have actions that update
the model to indicate the current page. The view uses the model to render the corresponding page.

The example is below. Notice how you can go to different pages; _Logout_ sends you back to _Home_;
and the _Data_ page has no data to show, so it displays a _Loading, please wait..._ message.

@flems code/05-Techniques-and-Strategies/E-SAM-Pattern/example-01.js,app.html,public/css/spectre.css react,react-dom,flyd,seview,patchinko 700 60

Let's see how we can apply the SAM pattern.

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

This is just a name change, but it conveys the role of `present` in the SAM pattern.

## Acceptor

Next, SAM has the concept of an _acceptor_ function in the model which receives the values
presented by actions and updates the model accordingly. In Meiosis, the acceptor function is the
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
do that if we were using functions instead. Patchinko comes in handy here to manage our model
updates.

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

We can use the `acceptor` to guard against going to the _Settings_ page without logging in.
Below, try it out:

- Click on _Settings_: you are sent to the _Login_ page.
- Fill in the fields on the login page (anything will do) and press _Login_: you are sent
to the _Home_ page, and you now have access to the _Settings_ page.
- Notice that if you go back to the _Login_ page, whatever you typed is still there.

@flems code/05-Techniques-and-Strategies/E-SAM-Pattern/example-02.js,app.html,public/css/spectre.css react,react-dom,flyd,seview,patchinko 700 60

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

As a convenience, if the user clicks on _Settings_ without logging in, we want to return to
the _Settings_ page after they have logged in, since that is where they were trying to go.
We can use a `returnTo` property to indicate this, and make sure we clear it out after
using it:

```javascript
const checkReturnTo = model => {
  if (model.user && model.returnTo) {
    return { pageId: model.returnTo, returnTo: O };
  }
  else if (model.pageId !== LoginPage && model.returnTo) {
    return { returnTo: O };
  }
};
```

These two functions, `prepareLogin` and `checkReturnTo`, are State functions. They look at the
model, and decide whether to return changes that will produce the application state. We can
combine them into a `state` function:

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

Try it out below. Now you are sent to the _Settings_ page after logging in, if you had previously
attempted to go to _Settings_. Also notice that if you go back to the `Login` page, the form is
now cleared out.

@flems code/05-Techniques-and-Strategies/E-SAM-Pattern/example-03.js,app.html,public/css/spectre.css react,react-dom,flyd,seview,patchinko 700 60

## Next-Action-Predicate

The final part of the SAM pattern is the Next-Action-Predicate (nap). This is a function that
looks at the application state and decides whether to automatically trigger another action
(the next action).

Let's use this to load the data on the _Data_ page. We want the action to complete -- navigating
to the _Data_ page and showing the _please wait_ message -- but then if there is no data in the
application state, we want to automatically trigger the action that loads the data:

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

Now if you go to the _Data_ page, you will see the _please wait_ message for a couple of seconds,
and then a message saying _The data has been loaded._ If you navigate away and then come back to
the _Data_ page, the data is still there. But if you click on _Logout_, the data is cleared out
of the application state.

Try it out:

@flems code/05-Techniques-and-Strategies/E-SAM-Pattern/example-04.js,app.html,public/css/spectre.css react,react-dom,flyd,seview,patchinko 700 60

With `present`, `acceptor`, `state`, and `nap`, we have used Meiosis as a foundation and
implemented SAM.

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
