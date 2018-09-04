# [Meiosis](https://meiosis.js.org) Documentation

[Table of Contents](toc.html)

## Pattern Code Snippets

This section is a reference of useful code snippets for implementing the Meiosis pattern. It
includes snippets that use vanilla JS,
[Ramda](https://ramdajs.com), and
[Lodash](https://lodash.com).
If you're interested in other nice functional programming libraries, see
[Crocks](https://evilsoft.github.io/crocks/) and
[tinyfunk](https://github.com/flintinatux/tinyfunk#readme).

- [Get and Set Functions](#code_snippets_get_set)
- [Nesting Functions](#code_snippets_nesting)
- [Meiosis Pattern Setup Code](#code_snippets_pattern_setup)

<a name="code_snippets_get_set"></a>
### Get and Set Functions

These utility functions get and set properties on an object using a path. The path is an array
of strings, indicating the properties and nested properties on the object.

If a property is not found at any point down the path, `get` returns `undefined`.

#### Vanilla

```javascript
// Using reduce, courtesy Barney Carroll (https://github.com/barneycarroll)
const get = (object, path) =>
  path.reduce((obj, key) => obj == undefined ? undefined : obj[key], object)
```

```javascript
// Using recursion
const get = (object, path) =>
  object == undefined
    ? undefined
    : path.length === 1
      ? object[path[0]]
      : get(object[path[0]], path.slice(1))
```

If a property is not found at any point down the path, `set` automatically creates an empty object
for the property.

```javascript
const set = (object, path, value) => {
  const head = path[0]
  if (path.length === 1) {
    object[head] = value
  }
  else {
    if (object[head] === undefined) {
      object[head] = {}
    }
    set(object[head], path.slice(1), value)
  }
  return object
}
```

The `updateWith` function is a combination of `set` and `get`, accepting a function `func` to
update the value.

```javascript
const updateWith = (object, path, func) =>
  set(object, path, func(get(object, path)))
```

If you are already using a functional programming library, you will most probably find functions
that it provides to perform the equivalent of `get`, `set`, and `updateWith`.

#### Ramda

- `get`: [R.path](https://ramdajs.com/docs/#path)
- `set`: [R.assocPath](https://ramdajs.com/docs/#assocPath)
- `updateWith`: [R.over](https://ramdajs.com/docs/#over) and [R.lensPath](https://ramdajs.com/docs/#lensPath), or
[R.evolve](https://ramdajs.com/docs/#evolve)

#### Lodash

- `get`: [_.get](https://lodash.com/docs#get)
- `set`: [_.set](https://lodash.com/docs#set)
- `updateWith`: [_.update](https://lodash.com/docs#update)

#### Crocks

- `get`: [propPathOr](https://evilsoft.github.io/crocks/docs/functions/helpers.html#proppathor)
- `set`: [mapProps](https://evilsoft.github.io/crocks/docs/functions/helpers.html#mapprops)
- `updateWith`: [mapProps](https://evilsoft.github.io/crocks/docs/functions/helpers.html#mapprops)

#### tinyfunk

- `get`: [path](https://github.com/flintinatux/tinyfunk#api)
- `set`: [assocPath](https://github.com/flintinatux/tinyfunk#api)
- `updateWith`: [evolve](https://github.com/flintinatux/tinyfunk#api)

<a name="code_snippets_nesting"></a>
### Nesting Functions

#### Patchinko

```javascript
const nestPatch = (object, path) => ({
  [path[0]]: path.length === 1
    ? O(object)
    : O(nestPatch(object, path.slice(1)))
})

const nestUpdate = (update, path) => patch => {
  update(patch.context ? patch : nestPatch(patch, path))
}

const nestComponent = (create, update, path) => {
  const component = create(nestUpdate(update, path))
  const result = O({}, component)
  if (component.model) {
    result.model = () => nestPatch(component.model(), path)
  }
  if (component.view) {
    result.view = model => component.view(get(model, path))
  }
  return result
}
```

#### Patchinko - With Shared Context

```javascript
const nestUpdate = (update, path) => patch => {
  update(patch.context ? patch : nestPatch(patch, path))
}
```

```javascript
if (component.view) {
  result.view = model => component.view(
    O({ context: model.context }, get(model, path)))
}
```

#### Vanilla

```javascript
const nestUpdate = (update, path) => func =>
  update(model => updateWith(model, path, func))

const nestComponent = function(create, update, path) {
  const component = create(nestUpdate(update, path))
  const result = Object.assign({}, component)
  if (component.model) {
    result.model = () => set({}, path, component.model())
  }
  if (component.view) {
    result.view = model => component.view(get(model, path)))
  }
  return result
}
```

#### Vanilla - With Shared Context

```javascript
const nestUpdate = (update, path) => func =>
  update(func.context ? func : (model => updateWith(model, path, func)))

const nestComponent = function(create, update, path) {
  const component = create(nestUpdate(update, path))
  const result = Object.assign({}, component)
  if (component.model) {
    result.model = () => set({}, path, component.model())
  }
  if (component.view) {
    result.view = model => component.view(
      Object.assign({ context: model.context }, get(model, path)))
  }
  return result
}
```

#### Ramda

```javascript
const nestUpdate = (update, path) => func =>
  update(R.over(R.lensPath(path), func))

const nestComponent = (create, update, path) => {
  const component = create(nestUpdate(update, path))
  const result = Object.assign({}, component)
  if (component.model) {
    result.model = () => R.assocPath(path, component.model(), {})
  }
  if (component.view) {
    result.view = R.compose(component.view, R.path(path))
  }
  return result
}
```

#### Lodash

```javascript
const nestUpdate = (update, path) => func =>
  update(model => _.update(model, path, func))

const nestComponent = (create, update, path) => {
  const component = create(nestUpdate(update, path))
  const result = Object.assign({}, component)
  if (component.model) {
    result.model = () => _.set({}, path, component.model())
  }
  if (component.view) {
    result.view = model => component.view(_.get(model, path)))
  }
  return result
}
```

<a name="code_snippets_pattern_setup"></a>
### Meiosis Pattern Setup Code

#### General Pattern

```javascript
const update = flyd.stream()
const app = createApp(update)
const models = flyd.scan(..., app.model(), update)

const element = document.getElementById("app")
models.map(model => { ReactDOM.render(app.view(model), element) })
```

#### Function Updates

```javascript
const models = flyd.scan((model, func) => func(model), app.model(), update)
// With Ramda:
const models = flyd.scan(R.applyTo, app.model(), update)
// With tinyfunk:
const models = flyd.scan(thrush, app.model(), update)
```

#### Function Updates - With Shared Context

```javascript
const models = flyd.scan((model, func) =>
  func.context ? func.context(model) : func(model), app.model(), update)
```

#### Patchinko Updates

```javascript
const models = flyd.scan(O, app.model(), update)
```

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.

