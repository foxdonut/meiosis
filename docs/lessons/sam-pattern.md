# [Meiosis](https://meiosis.js.org) Documentation

[Table of Contents](toc.html)

## SAM Pattern

The [SAM (State-Action-Model) Pattern](https://sam.js.org), by
[Jean-Jacques Dubray](https://www.ebpml.org/about),
is a way to structure code into these parts:

- the Model, which contains the application state
- Actions, which _present_ values to the Model. The Model accepts (or partially accepts, or
even rejects) the presented values and modifies the application state accordingly
- the State, which transforms the application state for the view to consume
- the View, which is a function of the application state
- the Next-Action-Predicate (nap), which looks at the application state and decides whether
to automatically trigger another Action.

You can find more details and explanations on the [SAM web site](https://sam.js.org).

As you can see, while not identical, Meiosis is similar to SAM:

- single source of truth (model/state)
- `update` presents patches, which are merged in with an accumulator function
- the _accepted state_, as we saw in [Services and Accepted State](services.html)
- the view is a function of the application state
- _services_, which we also saw in [Services and Accepted State](services.html),

The main difference is that in SAM, actions present _proposals_ to the Model, which can accept
or reject them. Thus you need to be able to _inspect_ proposals. In Meiosis, _patches_ are
merged into the state with `scan` and the accumulator function. So instead of inspecting
proposals, the acceptors inspect the state and return patches to make any necessary changes
and produce the accepted state.

<a name="meiosis_pattern"></a>
### [Meiosis Pattern](#meiosis_pattern)

Remember the fundamental Meiosis Pattern:

```javascript
const update = flyd.stream();
const states = flyd.scan(O, app.initialState(), update);
```

Actions send patches in the form of objects or functions to the `update` stream. Using `scan`
and an accumulator function, we produce a stream of states. We can then use the view library
of our choice, passing the current state and the actions to the view.

In [Services and Accepted State](services.html), we added `accept`
and `services`:

```javascript
const accept = state =>
  app.acceptors.reduce(
    (updatedState, acceptor) =>
      O(updatedState, acceptor(updatedState)),
    state
  );

const states = flyd.scan(O, app.initialState(), update);

states.map(state =>
  app.services.forEach(service =>
    service({ state, update, actions })
  )
);
```

Let's look at how we can use Meiosis similarly to SAM.

<a name="navigation_example"></a>
### [A Navigation Example](#navigation_example)

Say we have navigation between different pages. Clicking on a section of the navigation bar shows
the corresponding page. To navigate, we have actions that update the state to indicate the current
page. The view uses the state to render the corresponding page.

The example is below. Notice how you can go to different pages; From the _Settings_ page,
clicking on _Logout_ sends you back to _Home_; and the _Data_ page has no data to show, so it
just displays a _Loading, please wait..._ message.

@flems code/sam-pattern/navigation-example.js,app.html,public/css/spectre.css react,react-dom,flyd,patchinko 700 60

<a name="using_present"></a>
### [Using `update` as `present`](#using_present)

In SAM, actions _present_ values to the model, and the model's acceptor function decides if
and how to update the model. The `update` stream from Meiosis can be used as a `present` function
for actions.

```javascript
const update = flyd.stream();
const actions = app.actions(update);
const states = flyd.scan(P, app.initialState(), update);
```

This is just a name change, but it conveys the role of `present` in the SAM pattern.

<a name="acceptor"></a>
### [Acceptor](#acceptor)

Next, SAM has the concept of an _acceptor_ function in the model which receives the values
presented by actions and updates the model accordingly. In Meiosis, the acceptor function is the
_accumulator_ function that we use with `scan`. Right now this is Patchinko's `P` function, which
merges changes into the model. Let's separate it out into an explicit `acceptor` function:

```javascript
const acceptor = (model, proposal) => {
  return P(model, proposal);
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
  if (proposal.pageId === "SettingsPage" && !model.user) {
    return P(model, { pageId: "LoginPage" });
  }
  return P(model, proposal);
};
```

> Note that we are able to look at proposals because they are in the form of objects. We couldn't
do that if we were using functions instead. Patchinko comes in handy here to manage our model
updates.

Now our setup is:

```javascript
const acceptor = (model, proposal) => { /* ... */ };
const update = flyd.stream();
const actions = app.actions(update);
const states = flyd.scan(P, app.initialState(), update);
```

We can use the `acceptor` to guard against going to the _Settings_ page without logging in.
Below, try it out:

- Click on _Settings_: you are sent to the _Login_ page.
- Fill in the fields on the login page (anything will do) and press _Login_: you are sent
to the _Home_ page, and you now have access to the _Settings_ page.
- Notice that if you go back to the _Login_ page, whatever you typed is still there.

@flems code/sam-pattern/acceptor.js,app.html,public/css/spectre.css react,react-dom,flyd,patchinko 700 60

<a name="state"></a>
### [State](#state)

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
state: model => [
  prepareLogin,
  checkReturnTo
].reduce((x, f) => P(x, f(x)), model)
```

Now our setup is:

```javascript
const update = flyd.stream();
const actions = app.actions(update);
const states = flyd.scan(app.acceptor, app.initialState(), update)
  .map(app.state);
```

Try it out below. Now you are sent to the _Settings_ page after logging in, if you had previously
attempted to go to _Settings_. Also notice that if you go back to the `Login` page, the form is
now cleared out.

@flems code/sam-pattern/state.js,app.html,public/css/spectre.css react,react-dom,flyd,patchinko 700 60

<a name="next_action_predicate"></a>
### [Next-Action-Predicate](#next_action_predicate)

The final part of the SAM pattern is the Next-Action-Predicate (nap). This is a function that
looks at the application state and decides whether to automatically trigger another action
(the next action).

Let's use this to load the data on the _Data_ page. We want the action to complete -- navigating
to the _Data_ page and showing the _please wait_ message -- but then if there is no data in the
application state, we want to automatically trigger the action that loads the data:

```javascript
nap: actions => state => {
  if (state.pageId === "DataPage" && !state.data) {
    actions.loadData();
  }
}
```

Our setup becomes:

```javascript
const update = flyd.stream();
const actions = app.actions(update);
const states = flyd.scan(app.acceptor, app.initialState(), update)
  .map(app.state);
states.map(app.nap(actions));
```

Now if you go to the _Data_ page, you will see the _please wait_ message for a couple of seconds,
and then a message saying _The data has been loaded._ If you navigate away and then come back to
the _Data_ page, the data is still there. But if you click on _Logout_, the data is cleared out
of the application state.

Try it out:

@flems code/sam-pattern/next-action-predicate.js,app.html,public/css/spectre.css react,react-dom,flyd,patchinko 700 60

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by
[@foxdonut00](http://twitter.com/foxdonut00) /
[foxdonut](https://github.com/foxdonut)
and is released under the MIT license.
