# [Meiosis](https://meiosis.js.org) Documentation

[Table of Contents](toc.html)

## Services

[James Forbes](https://james-forbes.com) shared his idea of _Services_. In this section, we'll
look at James' version using streams, another version using
[Barney Carroll](https://barneycarroll.com)'s
[Patchinko](https://github.com/barneycarroll/patchinko), and finally a version that uses
function patches.

James explains that while one-off actions occur after click events, user input, and so on,
services are for ongoing state synchronization. They can produce computed properties, store and
retrieve state from local storage, and trigger other actions.

### Using Streams

James' version uses streams to implement services. The structure is as follows:

```javascript
{
  initial: state => initialState,
  start: states => patches
}
```

A service has an `initial` function which produces the service's initial state. The `start`
function takes the Meiosis **stream** of states and returns a **stream** of patches. The
service emits patches onto this stream.

The application's initial state is combined with each service's initial state to produce the
final initial state:

```javascript
const services = [ /* ... */ ];

const initialState = () => {
  const state =
    { boxes: []
      , colors:
      [ "red"
        , "purple"
        , "blue"
      ]
    };
  return Object.assign({},
    state,
    services
      .map(s => s.initial(state))
      .reduce(R.merge, {})
  );
};
```

Then, every service is started by passing in the stream of states, and mapping the resulting stream
of patches onto the `update` stream:

```javascript
services.map(s => s.start(states).map(update));
```

When a service emits a patch onto its stream, it is passed on to the `update` stream.

#### Colored Boxes Example

James shared an example where you have colored boxes that you can click on to add them to a list.
The boxes are displayed one next to the other, with a description of how many boxes of each color
are in the list. You can remove a box from the list by clicking on it.

In the example, there are three services:

- `StatsService`: produces an object that indicates how many boxes of each color.
- `LocalStorageService`: stores and retrieves the box data to and from local storage. You will
notice that the box list remains even after reloading the page.
- `DescriptionService`: produces the text description of how many boxes of each color are in
the list.

Each service has an `initial` and `start` function. For example, the `StatsService` initializes
its state with `0` for every box color, and computes the number of instances of each color:

```javascript
const StatsService = {
  initial(state) {
    return state.colors
      .map(R.objOf)
      .map(K(0))
      .reduce(R.merge, {});
  },
  start(state) {
    return dropRepeats( state.map( x => x.boxes ) )
      .map( R.countBy(I) )
      .map( R.assoc("stats") );
  }
};
```

Notice the call to `dropRepeats`. This is necessary because the stream of patches produced
by the service is fed back into the Meiosis `update` stream. This in turn produces an updated
state, which triggers the service again. To avoid an infinite loop, `dropRepeats` does not
emit a value when it is the same as the previous one:

```javascript
function dropRepeats(s) {
  var ready = false;
  var d = m.stream();
  s.map(function (v) {
    if (!ready || v !== d()) {
      ready = true;
      d(v);
    }
  });
  return d;
}
```

The example uses function patches. Here is the setup for the Meiosis pattern:

```javascript
const update = m.stream();
const T = (x, f) => f(x);
const state = m.stream.scan( T, initialState(), update );
const element = document.getElementById("app");
states.map(view(update)).map(v => m.render(element, v));
```

The complete example is below.

@flems code/services/index-streams.js,app.html mithril,mithril-stream,ramda,bss 700 60

#### Flexibility

Using streams gives you the flexibility of being able to hook into them and wiring them as you
wish. Now, let's look at a slightly different approach, using Patchinko.

### Using Patchinko

An alternative to emitting patches from services is to define a service as a function that
receives the current state as a parameter and returns a patch. Then, these service functions
can be combined together with `reduce` to produce a single service function that receives
the current state and produces an updated state.

In this section, we'll use [Patchinko](https://github.com/barneycarroll/patchinko), which we
looked at in the [tutorial](http://meiosis.js.org/tutorial/05-meiosis-with-patchinko.html).

To use Patchinko, we emit patches as objects instead of functions, and we use `P`
as our accumulator:

```javascript
const states = m.stream.scan( P, initialState(), update );
```

Instead of a `start` function, we'll use a `service` function to which we'll pass the latest
state from the Meiosis `states` stream. The `service` function returns a patch:

```javascript
{
  initial: state => initialState,
  service: state => patch
}
```

Before, we took a **stream** of states and we returned a **stream** of patches; now, we just
take a state and return a patch.

We'll taking our array of services and call `service` on each one:

```javascript
services.map(s => s.service)
```

This gives us an array of functions:

```javascript
[ f1, f2, f3 ]
```

Each function `f` takes the state and returns a patch to update the model. Thus calling `f(state)`
gives us a patch. To apply the patch, we call `P(state, f(state))`. Finally, to combine the array
of functions into a single function, we can use `reduce`:

```javascript
// Top-level service function
const service = state => services
  .map(s => s.service)
  .reduce((x, f) => P(x, f(x)), state);
```

This gives us a single top-level `service` function that takes the state, calls all services,
and produces the updated state. We can just `map` this service function to our stream of
states:

```javascript
const states = m.stream.scan( P, initialState(), update )
  .map(service);
```

Finally, as before we use our `states` stream to render the view:

```javascript
states.map(view(update)).map(v => m.render(element, v));
```

You will find the complete example below.

@flems code/services/index-patchinko.js,app.html mithril,mithril-stream,ramda,bss,patchinko 700 60

#### No Worries about Infinite Loops

Note that we no longer need `dropRepeats`, because we are not feeding patches back into the
`update` stream. Instead, we have a separate `states` stream, so we don't need to worry about
creating an infinite loop.

### Using Function Patches

We can also use this approach with function patches instead of Patchinko. Remember that with
function patches, we produce functions `f(state) => updatedState` instead of object patches,
and we wire up Meiosis like this:

```javascript
const T = (x, f) => f(x);
const update = m.stream();
const states = m.stream.scan( T, initialState(), update );
```

Our services have the same structure as before, namely:

```javascript
{
  initial: state => initialState,
  service: state => patch
}
```

The only difference is that `patch` is now a function instead of an object.

Again we take the array of services and call `service` on each one:

```javascript
services.map(s => s.service)
```

This still gives us an array of functions:

```javascript
[ f1, f2, f3 ]
```

But now each function `f` takes the state and returns a **function** patch to update the model.
When we call `f(state)`, we get a function. To apply the patch, we just call the function:
`f(state)(state)`. Finally, we use `reduce` to write our top-level `service` function:

```javascript
// Top-level service function
const service = state => services
  .map(s => s.service)
  .reduce((x, f) => f(x)(x), state);
```

As before, we `map` our service function to the `states` stream, and use the `states` stream
to render the view:

```javascript
const states = m.stream.scan( T, initialState(), update )
  .map(service);
states.map(view(update)).map(v => m.render(element, v));
```

Have a look at the complete example below.

@flems code/services/index-functions.js,app.html mithril,mithril-stream,ramda,bss 700 60

### Conclusion

We can wire up services in different ways, and use them for computed properties, state
synchronization, and other purposes. Please note, however, that not everything belongs in
a service, so it's important to avoid getting carried away.

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by
[@foxdonut00](http://twitter.com/foxdonut00) /
[foxdonut](https://github.com/foxdonut)
and is released under the MIT license.
