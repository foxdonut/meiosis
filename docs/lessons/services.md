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
  start: state$ => patch$
}
```

A service has an `initial` function which produces the service's initial state. The `start`
function takes the Meiosis stream of states and returns a stream of patches. The service emits
patches on this stream.

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
  return {
    ...state,
    ...services
      .map(s => s.initial(state))
      .reduce(R.merge, {})
  };
};

const update = m.stream();
const T = (x,f) => f(x);
const state = m.stream.scan( T, initialState(), update );
const element = document.getElementById("app");
states.map(view(update)).map(v => m.render(element, v));
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

The complete example is below.

@flems code/services/index-streams.js,app.html mithril,mithril-stream,ramda,bss 700 60

Using streams gives you the flexibility of being able to hook into them and wiring them as you
wish. Now, let's look at a slightly different approach, using Patchinko.

### Using Patchinko

An alternative to using functions for patches is using
[Patchinko](https://github.com/barneycarroll/patchinko), which we looked at in
[this section of the tutorial](http://meiosis.js.org/tutorial/05-meiosis-with-patchinko.html).

To use Patchinko, we emit patches as objects instead of functions, and we use `P`
as our accumulator:

```javascript
const states = m.stream.scan( P, initialState(), update );
```

Our services also return objects instead of functions to indicate patches. Now, when we
call `state` on our services:

```javascript
services
  .map(s => s.state)
```

We still have an array of functions:

```javascript
[ f1, f2, f3 ]
```

But each function returns an object to update the model. To apply the patch, we need to call
`P(state, f(state))`:

```javascript
services
  .map(s => s.state)
  .map(f => state => P(state, f(state)))
```

Again, this gives us an array of functions ready to be called with the model, and we can combine
them as before into a single function, by applying `pipe`:

```javascript
const states = m.stream.scan( P, initialState(), update ).map(
  R.apply(
    R.pipe,
    services
      .map(s => s.state)
      .map(f => state => O(state, f(state)))
  )
);
```

Finally, as before we use our `states` stream to render the view:

```javascript
states.map(view(update)).map(v => m.render(element, v));
```

You will find the complete example below.

@flems code/services/index-patchinko.js,app.html mithril,mithril-stream,ramda,bss,patchinko 700 60

Note that we no longer need `dropRepeats`, because we are not feeding patches back into the
`update` stream. Instead, we have a separate `states` stream, so we don't need to worry about
creating an infinite loop.

### Using Function Patches

Instead of a `start` function, we'll use a `state` function to which we'll pass the latest state
from the Meiosis `states` stream. The `state` function returns a patch as a function:

```javascript
{
  initial: state => state,
  state: state => action
}
```

Before, we took a _stream of states_ and we returned a _stream of actions_; now, we have a function
that just takes a state and returns an action, which is a function patch.

To wire up our services, we'll create a `states` stream.

First, we'll taking our array of services and call the `state` function on each one:

```javascript
services
  .map(s => s.state)
```

This gives us an array of functions:

```
[ f1, f2, f3 ]
```

Each of these functions takes a state and returns a patch, which itself is a function of
the state. So, we need to pass the state to each function, and call the result again with the
state:

```javascript
f1(state)(state)
```

This is actually called the `W` combinator, or _duplication_
combinator<sup>[1](https://gist.github.com/Avaq/1f0636ec5c8d6aed2e45)</sup>

```javascript
// W combinator, "duplication"
const W = f => x => f(x)(x);
```

Now we have:

```javascript
services
  .map(s => s.state)
  .map(W)
```

This gives us an array of functions ready to be called with the state. To combine them all into
a single function, we need to apply `pipe`:

```javascript
const states = m.stream.scan( T, initialState(), update ).map(
  R.apply(
    R.pipe,
    services
      .map(s => s.state)
      .map(W)
  )
);
```

Finally, we use our `states` stream to render the view:

```javascript
states.map(view(update)).map(v => m.render(element, v));
```

Have a look at the complete example below.

@flems code/services/index-functions.js,app.html mithril,mithril-stream,ramda,bss 700 60

### Conclusion

We can wire up services in different ways, and use them for computed properties, state
synchronization, and other purposes. Please note, however, that not everything belongs in a service,
so it's important to avoid getting carried away.

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by
[@foxdonut00](http://twitter.com/foxdonut00) /
[foxdonut](https://github.com/foxdonut)
and is released under the MIT license.
