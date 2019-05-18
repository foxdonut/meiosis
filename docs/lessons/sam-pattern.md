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

While not identical, Meiosis is similar to SAM:

- single source of truth (model/state)
- `update` sends patches, which are merged in with the accumulator function
- the _accepted state_, as we saw in [Services and Accepted State](services.html)
- the view is a function of the application state
- _services_, which we also saw in [Services and Accepted State](services.html).

The main difference is that in SAM, actions present _proposals_ to the Model, which can accept or
reject them. Thus you need to be able to _inspect_ proposals. In Meiosis, _patches_ are merged into
the state with `scan` and the accumulator function. So instead of inspecting proposals, the
acceptors inspect the state and return patches to make any necessary changes and produce the
accepted state.

Acceptors also play the same role as SAM's State, since they can transform the state for the view to
consume.

Services are triggered when the state changes and can issue updates; they correspond to SAM's
Next-Action-Predicate.

<a name="meiosis_pattern"></a>
### [Meiosis Pattern Recap](#meiosis_pattern)

Remember the fundamental Meiosis Pattern:

```javascript
const update = flyd.stream();
const states = flyd.scan(O, app.initialState(), update);
```

Actions send patches in the form of objects or functions to the `update` stream. Using `scan` and
the accumulator function, we produce a stream of states. We can then use the view library of our
choice, passing the current state and the actions to the view.

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

<a name="navigation_example"></a>
### [A Navigation Example](#navigation_example)

Say we have navigation between different pages. Clicking on a section of the navigation bar shows
the corresponding page. To navigate, we have actions that update the state to indicate the current
page. The view uses the state to render the corresponding page.

The example is below. Notice how you can go to different pages; From the _Settings_ page, clicking
on _Logout_ sends you back to _Home_; and the _Data_ page has no data to show, so it just displays a
_Loading, please wait..._ message.

@flems code/sam-pattern/navigation-example.js,app.html,public/css/spectre.css react,react-dom,flyd,patchinko 700 60

<a name="acceptor"></a>
### [Accepted State](#acceptor)

SAM has the concept of an _acceptor_ function in the model which receives the values presented by
actions and updates the model accordingly. In Meiosis, acceptors are combined into a top-level
`accept` function that transforms the state into the _accepted_ state, preparing it for the view.

In SAM, the Model needs to be able to inspect proposals. In Meiosis, patches are applied to the
state and then passed to acceptors. Thus we don't require to have "inspectable" patches -- this
wouldn't work with function patches, for example -- because acceptors run on the state.

In the code below, an action updates the state to navigate to the Settings page. But if the user is
not logged in -- the `user` is not in the state -- the acceptor changes the state to navigate to the
Login page instead:

```javascript
const settingsCheckLogin = state => {
  if (
    state.pageId === "SettingsPage" &&
    state.user == null
  ) {
    return {
      pageId: "LoginPage",
      returnTo: "SettingsPage"
    };
  }
};

// ...

const app = {
  // ...
  acceptors: [settingsCheckLogin]
};
```

Below, try it out:

- Click on _Settings_: you are sent to the _Login_ page.
- Fill in the fields on the login page (anything will do) and press _Login_: you are sent
to the _Home_ page, and you now have access to the _Settings_ page.
- Notice that if you go back to the _Login_ page, whatever you typed is still there.

@flems code/sam-pattern/acceptor.js,app.html,public/css/spectre.css react,react-dom,flyd,patchinko 700 60

<a name="state"></a>
### [More Accepted State](#state)

The State function in SAM looks at the model and makes any changes necessary to produce application
state that is suitable for the view.

Acceptors in Meiosis perform this function as well. For example, we want to prepare a login form by
initializing the username and password to blank strings. Further, we want to clear out those values
when navigating away from the login page:

```javascript
const prepareLogin = state => {
  if (state.pageId === "LoginPage" && !state.login) {
    return { login: { username: "", password: "" } };
  } else if (state.pageId !== "LoginPage" && state.login) {
    return { login: null };
  }
};
```

As a convenience, if the user clicks on _Settings_ without logging in, we want to return to the
_Settings_ page after they have logged in, since that is where they were trying to go. We can use a
`returnTo` property to indicate this, and make sure we clear it out after using it:

```javascript
const checkReturnTo = state => {
  if (state.user && state.returnTo) {
    return { pageId: state.returnTo, returnTo: null };
  } else if (
    state.pageId !== "LoginPage" &&
    state.returnTo
  ) {
    return { returnTo: null };
  }
};
```

We only need to add these two functions to our `acceptors` array:

```javascript
const app = {
  // ...
  acceptors: [
    settingsCheckLogin,
    prepareLogin,
    checkReturnTo
  ]
};
```

Try it out below. Now you are sent to the _Settings_ page after logging in, if you had previously
attempted to go to _Settings_. Also notice that if you go back to the `Login` page, the form is now
cleared out.

@flems code/sam-pattern/state.js,app.html,public/css/spectre.css react,react-dom,flyd,patchinko 700 60

<a name="next_action_predicate"></a>
### [Next-Action-Predicate](#next_action_predicate)

The final part of the SAM pattern is the Next-Action-Predicate (nap). This is a function that looks
at the application state and decides whether to automatically trigger another action (the next
action).

Meiosis services have the same functionality. Let's use this to load the data on the _Data_ page. We
want the action to complete -- navigating to the _Data_ page and showing the _please wait_ message
-- but then if there is no data in the application state, we want to automatically trigger the
action that loads the data:

```javascript
const dataService = ({ state, actions }) => {
  if (state.pageId === "DataPage" && !state.data) {
    actions.loadData();
  }
};

const app = {
  // ...
  services: [dataService]
};
```

Now if you go to the _Data_ page, you will see the _please wait_ message for a couple of seconds,
and then a message saying _The data has been loaded._ If you navigate away and then come back to the
_Data_ page, the data is still there. But if you click on _Logout_, the data is cleared out of the
application state.

Try it out:

@flems code/sam-pattern/next-action-predicate.js,app.html,public/css/spectre.css react,react-dom,flyd,patchinko 700 60

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by
[@foxdonut00](http://twitter.com/foxdonut00) /
[foxdonut](https://github.com/foxdonut)
and is released under the MIT license.
