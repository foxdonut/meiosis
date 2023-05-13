# [meiosis-setup](https://meiosis.js.org/setup) Documentation

@docs-nav-start
@nav-prev:setup-ts-stream-implementation.html:Stream Implementation
@nav-setup-ts-toc
@docs-nav-end

## Utilities

`meiosis-setup` provides a small set of utility functions that you may find useful in your projects.

### get

```ts
const get = (object: Record<string, any> | null | undefined, path: string[]): any
```

Gets a nested property using `path` from an object in a safe manner. If the object is `null` or
`undefined`, or if any property along the path is `null` or `undefined`, the function returns
`undefined`.

```ts
get({ duck: { color: 'yellow' } }, ['duck', 'color']) // returns 'yellow'
get({ duck: { color: 'yellow' } }, ['bird', 'color']) // returns undefined
get(null, ['bird', 'color']) // returns undefined
```

### updateFormValue

```ts
const updateFormValue = (
  cell: MeiosisCell<any>,
  path: string[] | string,
  fn: (value: string) => any = (value) => value
)
```

Convenience function to update a form value. Pass the Meiosis cell and the state property (such as
`'firstName'`) or path (such as `['person', 'firstName']`) into which to update the value. Returns a
function that you can pass to a DOM handler, such as `oninput` (Mithril) or `onInput` (Preact,
React). For example:

```ts
// Using Mithil
m('input[type=text]', { oninput: updateFormValue(cell, 'firstName') })
m('input[type=text]', { oninput: updateFormValue(cell, ['person', 'firstName']) })

// Using Preact/React
<input type="text" onInput={updateFormValue(cell, 'firstName')}/>
<input type="text" onInput={updateFormValue(cell, ['person', 'firstName'])}/>
```

Optionally, you can pass a function to change the value before it is updated in the state. For
example:

```js
updateFormValue(cell, 'firstName', value => value.toUpperCase())
```

In the example above, if the user types `Fred` then the state will contain `{ firstName: 'FRED' }`.

### updateFormIntValue

Similar to `updateFormValue`, but parses the input using `parseInt` and only updates the state if
the result is valid.

```ts
// Using Mithil
m('input[type=text]', { oninput: updateFormIntValue(cell, 'quantity') })
m('input[type=text]', { oninput: updateFormIntValue(cell, ['item', 'quantity']) })

// Using Preact/React
<input type="text" onInput={updateFormIntValue(cell, 'quantity')}/>
<input type="text" onInput={updateFormIntValue(cell, ['item', 'quantity'])}/>
```

### updateFormFloatValue

Similar to `updateFormValue`, but parses the input using `parseFloat` and only updates the state if
the result is valid.

```ts
// Using Mithil
m('input[type=text]', { oninput: updateFormFloatValue(cell, 'salary') })
m('input[type=text]', { oninput: updateFormFloatValue(cell, ['person', 'salary']) })

// Using Preact/React
<input type="text" onInput={updateFormFloatValue(cell, 'salary')}/>
<input type="text" onInput={updateFormFloatValue(cell, ['person', 'salary'])}/>
```

@docs-nav-start
@nav-prev:setup-ts-stream-implementation.html:Stream Implementation
@nav-setup-ts-toc
@docs-nav-end
