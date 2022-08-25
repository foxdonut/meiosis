# [meiosis-setup](https://meiosis.js.org/setup) Documentation

@docs-nav-start
@nav-prev:setup-js-stream-implementation.html:Stream Implementation
@nav-setup-js-toc
@docs-nav-end

## Utilities

`meiosis-setup` provides a small set of utility functions that you may find useful in your projects.

### `get`

```js
const get = (object, path)
```

Gets a nested property using `path` (an array of properties) from an object in a safe manner. If the
object is `null` or `undefined`, or if any property along the path is `null` or `undefined`, the
function returns `undefined`.

```js
get({ duck: { color: 'yellow' } }, ['duck', 'color']) // returns 'yellow'
get({ duck: { color: 'yellow' } }, ['bird', 'color']) // returns undefined
get(null, ['bird', 'color']) // returns undefined
```

### `updateFormValue`

### `updateFormIntValue`

### `updateFormFloatValue`

@docs-nav-start
@nav-prev:setup-js-stream-implementation.html:Stream Implementation
@nav-setup-js-toc
@docs-nav-end
