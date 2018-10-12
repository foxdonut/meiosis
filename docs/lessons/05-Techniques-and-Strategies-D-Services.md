# [Meiosis](https://meiosis.js.org) Documentation

[Table of Contents](toc.html)

## Services

[James Forbes](https://james-forbes.com) shared his idea of _Services_. In this section, we'll
look at James' version using streams, another version using functions, and finally a version that
uses [Barney Carroll](https://barneycarroll.com)'s
[Patchinko](https://github.com/barneycarroll/patchinko).

James explains that while one-off actions occur after click events, user input, and so on,
services are for ongoing state synchronization. They can produce computed properties, store and
retrieve state from local storage, and trigger other actions.

### Using Streams

James' version uses streams to implement services. The structure is as follows:

```javascript
{
  initial: model => model,
  start: model$ => action$
}
```

A service has an `initial` function which produces the service's initial model. The `start`
function takes the Meiosis stream of models and returns a stream of actions. The service emits
model updates (actions) on this stream.

The application's initial model is combined with each service's initial model to produce the
final initial model for the Meiosis stream of models:

```javascript
const initialModel = () => {
  const model =
    {  boxes: []
      , colors:
      [ "red"
        , "purple"
        , "blue"
      ],
    };
  return {
    ...model,
    ...services
      .map(s => s.initial(model))
      .reduce(R.merge, {})
  };
};

const models = m.stream.scan( T, initialModel(), update );
const element = document.getElementById("app");
models.map(view(update)).map(v => m.render(element, v));
```

Then, every service is started by passing in the stream of models, and mapping the result onto the
`update` stream:

```javascript
services.map(s => s.start(models).map(update));
```

When a service emits a model update onto its stream, it is passed on to the `update` stream.

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
its model with `0` for every box color, and computes the number of instances of each color:

```javascript
const StatsService = {
  initial(model) {
    return model.colors
      .map(R.objOf)
      .map(K(0))
      .reduce(R.merge, {});
  },
  start(model) {
    return dropRepeats( model.map( x => x.boxes ) )
      .map( R.countBy(I) )
      .map( R.assoc("stats") );
  }
};
```

Notice the call to `dropRepeats`. This is necessary because the stream of model updates produced
by the service is fed back into the Meiosis `update` stream. This in turn produces an updated
model, which triggers the service again. To avoid an infinite loop, `dropRepeats` does not
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

@flems code/05-Techniques-and-Strategies/D-Services/index-streams.js,app.html mithril,mithril-stream,ramda,bss 700 60

Using streams gives you the flexibility of being able to hook into them and wiring them as you
wish. Now, let's look at a slightly different approach, using functions.

### Using Functions

Instead of a `start` function, we'll use a `state` function to which we'll pass the latest model
from the Meiosis `models` stream. The `state` function returns a model update (action):

```javascript
{
  initial: model => model,
  state: model => action
}
```

Before, we took a _stream of models_ and we returned a _stream of actions_; now, we have a function
that just takes a model and returns an action, which is a model update.

To wire up our services, we'll create a `states` stream from the `models` stream.

First, we'll taking our array of services and call the `state` function on each one:

```javascript
services
  .map(s => s.state)
```

This gives us an array of functions:

```
[ f1, f2, f3 ]
```

Each of these functions takes a model and returns a model update, which itself is a function of
the model. So, we need to pass the model to each function, and call the result again with the
model:

```javascript
f1(model)(model)
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

This gives us an array of functions ready to be called with the model. To combine them all into
a single function, we need to apply `pipe`:

```javascript
const states = models.map(
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

Have a look at the example below.

@flems code/05-Techniques-and-Strategies/D-Services/index-functions.js,app.html mithril,mithril-stream,ramda,bss 700 60

Note that we no longer need `dropRepeats`, because we are not feeding actions back into the
`update` stream. Instead, we have a separate `states` stream derived from `models`, so we
don't need to worry about creating an infinite loop.

### Using Patchinko

An alternative to using functions for model updates is using
[Patchinko](https://github.com/barneycarroll/patchinko), which we looked at in
[this section](03-Model-and-Nesting-C-Patchinko.html).

To use Patchinko, we emit model updates (actions) as objects instead of functions, and we use `O`
as our accumulator:

```javascript
const models = m.stream.scan( O, initialModel(), update );
```

Our services also return objects instead of functions to indicate model updates. Now, when we
call `state` on our services:

```javascript
services
  .map(s => s.state)
```

We still have an array of functions:

```javascript
[ f1, f2, f3 ]
```

But each function returns an object to update the model. To apply the update, we need to call
`O(model, f(model))`:

```javascript
services
  .map(s => s.state)
  .map(f => model => O(model, f(model)))
```

Again, this gives us an array of functions ready to be called with the model, and we can combine
them as before into a single function, by applying `pipe`:

```javascript
const states = models.map(
  R.apply(
    R.pipe,
    services
      .map(s => s.state)
      .map(f => model => O(model, f(model)))
  )
);
```

Finally, as before we use our `states` stream to render the view:

```javascript
states.map(view(update)).map(v => m.render(element, v));
```

You will find the complete example below.

@flems code/05-Techniques-and-Strategies/D-Services/index-patchinko.js,app.html mithril,mithril-stream,ramda,bss,patchinko 700 60

### Conclusion

We can wire up services in different ways, and use them for computed properties, state
synchronization, and other purposes. Please note, however, that not everything belongs in a service,
so it's important to be careful not to get carried away.

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) /
[foxdonut](https://github.com/foxdonut) and is released under the MIT license.
