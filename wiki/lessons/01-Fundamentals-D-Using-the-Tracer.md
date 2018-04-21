# Meiosis Wiki

[Table of Contents](toc.html)

## Using the Meiosis Tracer

The [Meiosis Tracer](https://github.com/foxdonut/meiosis-tracer) is a tool to observe, rewind, and replay streams
and see the results in the view. It's quite useful when developing and debugging an application.

Let's add the tracer to our [previous example](01-Fundamentals-C-Components.html).

### Tracing Streams

Up to now, we haven't needed anything from Meiosis itself as a library. To use the tracer, we'll need to import
Meiosis and call its `trace` function. That will set up communication between the streams and the UI that displays
stream values and allows us to rewind, replay, and even type in stream values directly, all the while automatically
refreshing the view so that we can see the results.

You can see the tracer below:

@flems code/01-Fundamentals/D-Using-the-Tracer/temperature.jsx,code/01-Fundamentals/D-Using-the-Tracer/index.js,app.html,app.css react,react-dom,flyd,meiosis,meiosis-tracer 800

To trace streams, we need to import the Meiosis library and call the `trace` function, passing the `update` stream
and a `dataStreams` array of streams to trace:

```javascript
meiosis.trace({ update, dataStreams: [ models ]});
```

The second thing to do is to use the Meiosis Tracer UI. We have two options to do this:

1. Import the Meiosis Tracer and add a DOM element to our page to hook up the UI, or
1. Use the
[Chrome extension](https://chrome.google.com/webstore/detail/meiosis-tracer/lcomllmppaiciocfbeefdeoplnfpnnfl)
in which case we do _not_ need to import the Meiosis Tracer, nor do we need to change our page. The extension
displays the Tracer UI in Chrome's DevTools.

### Using Meiosis Tracer

Let's start with the first option. In the HTML, we've added a `<div>` where the tracer will be displayed:

```html
<div id="tracer"></div>
```

Notice that we've given it an `id` of `tracer`. Finally, we initialize the Tracer by passing it the selector
to our `<div>`:

```javascript
meiosisTracer({ selector: "#tracer" });
```

That will display the Tracer on our page.

### Using the Chrome Extension

The second option to use the Tracer is to install the
[Chrome extension](https://chrome.google.com/webstore/detail/meiosis-tracer/lcomllmppaiciocfbeefdeoplnfpnnfl).
In that scenario, we still need to call the Meiosis `trace` function, but no other changes are needed in our
application.

When you open Chrome's DevTools, you'll see a Meiosis tab. The UI works best if you dock the DevTools on the
right side of the browser window.

### Rewind, Replay, Observe

Try entering values in the text fields of the example, increasing and decreasing the temperature, and then click
on the Save button. As you are doing this, you'll see snapshots of the model being displayed in the tracer. You'll
also notice an increase in the total number on the slider.

Next, try dragging the slider back towards the left, and then towards the right. You'll see that you are rewinding
and replaying the model snapshots, with the view showing the corresponding results.

Finally, try typing in values directly in the model textarea. As long as you have valid JSON, you should see the
view reflect the result of rendering with the model that you've entered.

This is a great way to develop and debug an application. You can see what the view looks like for a given model.
If you enter a temperature value, you'll see it in the view. If you change the temperature units from `C` to `F`,
you see in fact that the view does _not_ reflect the change. You've discovered that we are not (yet) using the
units from the model! We'll be fixing that in the next part.

### Principles / Takeaways

- The Meiosis Tracer is useful for observing, replaying, and experimenting with streams in your application.
- You can easily add the Tracer to your application, and remove it when you are done.
- If you use the Chrome DevTools Extension, it's even easier: you only need to add one line of code (`trace`).

### Up Next

Let's take a step back and summarize what we've learned by looking at the [Meiosis Goals](01-Fundamentals-E-Goals.html).

[Table of Contents](toc.html)

-----

Meiosis is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
