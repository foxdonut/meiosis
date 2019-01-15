# [Meiosis](https://meiosis.js.org) Documentation

[Table of Contents](toc.html)

## Using a Router

_More to come._

### 1) Validate navigation

```js
({ state, navigation }) => navigation
```

Based on the state and the requested navigation, accept and return navigation, or return a
different navigation (redirect)

- Either return a navigation and take it as is, or,
- return true to accept navigation, return navigation to redirect, but repeat the process in
case redirect also needs to validate

### 2) Synchronous or asynchnonous initial route / navigation

```js
({ state, navigation }) => P(data, navigation) or Promise
```

Synchronously or asynchronously determine the valid update data for navigating to this page.

### 3) Asynchronous loading

```js
({ state, navigation, update }) => { .. }
```

Asynchronously load data and call update

So in 2) we can either show "please wait" right away and load data in 3), or we can
asynchronously load data in 2) by returning a Promise, in which case the page will wait
to be shown.

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by
[@foxdonut00](http://twitter.com/foxdonut00) /
[foxdonut](https://github.com/foxdonut)
and is released under the MIT license.
