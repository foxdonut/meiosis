# Meiosis Wiki

[Table of Contents](toc.html)

## Quick Introduction to Streams

Before we start with Meiosis, we need a basic understanding of _streams_. Now, if you have worked with
[RxJS](https://github.com/ReactiveX/rxjs) or other stream libraries and found it too complicated to work with all those
stream operators, don't worry! The use of streams in Meiosis is _minimal_ and _simple_. You only need to know two
operators (`map` and `scan`), and you only need to use them in one place: at the top-level setup code. All of the rest
of the code does _not_ depend on streams.

### A Flyd on the Wall

In Meiosis, I use [Flyd](https://github.com/paldepind/flyd) because it is just like the use of streams in Meiosis:
_minimal_ and _simple_. If you use [Mithril](https://mithril.js.org), then
[Mithril Streams](https://mithril.js.org/stream.html) work just as well. If you already know another stream library,
using it should not be a problem either. Finally, you can also write your own stream implementation with just a handful
of lines of code, as demonstrated [in the Meiosis tutorial](http://meiosis.js.org/tutorial/05-stream-mithril.html).

### Page Setup

As with all of the examples in this Wiki, we start with a `<div>` in an HTML page where our app will be rendered:

```html
<div id="app"></div>
```

Next, we'll render a number of `<div>`s within `app` to show output:

```javascript
const element = document.getElementById("app");

const total = 4;

for (let n = 1; n <= total; n++) {
  element.innerHTML = element.innerHTML +
  "<div id='stream" + n + "'>Stream " + n + " values:</div>";
}

const log = number => value => {
  const streamElement = document.getElementById("stream" + number);
  streamElement.innerHTML = streamElement.innerHTML + " " + value;
};
```

This renders `<div id='stream1'>Stream 1 values:</div>`, and the same for 2 and 3. The `log` function takes the stream
number and returns another function that, given a value, will append it to the `innerHTML` of the div. We'll be able to
see values by calling this `log` function.

### Our First Stream

With that setup out of the way, let's create our first stream:

```javascript
const stream1 = flyd.stream();
const log1 = log(1);
```

Now, `stream1` is a stream of values. We've also created `log1` for convenience so that `log1(value)` will show `value`
on our page.

To push a value onto the stream, we simply call `stream1` as a function and pass it the value:

```javascript
stream1(5);
```

To read the last value from the stream, we call `stream1` as a function but with no arguments:

```javascript
stream1()
```

If we call `log1` with that value, we will see `5`. This is the code so far:

```javascript
const stream1 = flyd.stream();
const log1 = log(1);
stream1(5);
log1(stream1()); // 5
```

If we call `stream1` again with new value, it will be the value returned by calling `stream1` with no arguments:

```javascript
stream1(8);
log1(stream1()); // 8
```

So far, so good. Now, let's look at the first of only two stream operators that we'll use, `map`.

### Using `map`

We can call `map(fn)` on a stream to get another stream of values. What this does is call `fn` every time a value is
pushed onto the stream. The result returned by `fn` is then pushed onto the resulting stream. For example:

```javascript
const stream1 = flyd.stream();
const stream2 = stream1.map(x => x * 10);
const log2 = log(2);
stream1(5);
log2(stream2()); // 50
```

Since `stream2` is the result of multiplying the values of `stream1` by 10, and `stream2()` returns the last value of
the stream, the result will be 50.

Because the function that we pass to `map()` is called every time a new value is pushed onto the stream, we can pass a
function that does something:

```javascript
const stream1 = flyd.stream();
const stream2 = stream1.map(x => x * 10);
const log2 = log(2);
stream2.map(log2);
stream1(4);
stream1(2);
```

Now that we are calling `log2` for every new value of `stream2`, we will see `40 20` in the output.

### Using `scan`

Besides `map`, the only other stream operator that we need to set up Meiosis is `scan`. If you are familiar with
`reduce`, you will recognize that `scan` is like `reduce` except that it produces each value instead of just the
final result.

The `scan` operator takes a function of 2 arguments, an initial value, and a source stream. I will refer the two
parameters passed to the function as the _accumulated_ value and the _next_ value.

When a value arrives on the source stream, the function is called with the initial value as the _accumulated_ value
and the newly arrived value as the _next_ value. The function returns a result. That result becomes the _accumulated_
value. Another value arrives on the source stream, the function is called, and so on.

In other words, with `scan` you write a function that always gets the latest result and the next value, to produce a
new latest result.

If this is not clear, hopefully a code example will help:

```javascript
const amounts = flyd.stream();
const add = (total, next) => total + next;

const stream3 = flyd.scan(add, 0, amounts);
const log3 = log(3);
stream3.map(log3);

amounts(2);
amounts(3);
amounts(4);
```

We will see `0 2 5 9` in the output.

The initial value is `0`, which we see in the output. When `2` is pushed onto the `amounts` stream, the `add` function
gets called with `(0, 2)`. Since the function returns the sum, we see `2` in the output. The next value on the stream
is `3`, so `add` is called with `(2, 3)` and we see `5` in the output. Finally, the last value on the `amounts` stream
is `4`, and `add` is invoked with `(5, 4)` to produce `9`.

### Accumulated vs next value

In the example above, both the accumulated value and the next value are numbers. It's important to understand that the
accumulated value and the next value do _not_ have to be of the same type. The function we pass to `scan` _must_ always
return a result of the _same_ type as the accumulated type, since that will be the accumulated value on the next call.
It's also expected that the values arriving on the source stream should be of the same type for every value, since
these are always passed as the _next_ type.

Again, let's look at an example to illustrate this:

```javascript
const operations = flyd.stream();

const applyOperation = (total, nextOperation) => {
  if (nextOperation.operation === "add") {
    total = total + nextOperation.value;
  }
  else if (nextOperation.operation === "sub") {
    total = total - nextOperation.value;
  }
  return total;
};

const stream4 = flyd.scan(applyOperation, 0, operations);
const log4 = log(4);
stream4.map(log4);

operations({ operation: "add", value: 4 });
operations({ operation: "sub", value: 6 });
operations({ operation: "add", value: 10 });
operations({ operation: "add", value: 5 });
```

This time, our initial and accumulated values are numbers, but the _next_ value is an object indicating an `operation`
and a `value`. Our function looks at the `operation` to determine whether it should add or subtract the value, then it
returns the total.

This time, we will see `0 4 -2 8 13` in the output.

You can see the full code example and experiment with it below.

@flems code/01-Fundamentals/A-Quick-Intro-to-Streams/index.js,app.html,app.css flyd 800

### Principles / Takeaways

- Create a stream with `flyd.stream()`.
- Call `fn` for every value of the stream with `s.map(fn)`.
- Call `fn` for latest cumulative result and next value with `flyd.scan(fn, initial, s)`.
- Result of `scan` is a stream of latest cumulative results.

### We Are Ready For Meiosis

Whew! I promise there will be a lot less theory from here on out. I just needed to make sure that we looked at streams,
`map`, and `scan`, because we will use them to [set up Meiosis](01-Fundamentals-B-Meiosis-Setup.html).

[Table of Contents](toc.html)

-----

Meiosis is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
