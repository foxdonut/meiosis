# [Meiosis](http://meiosis.js.org) Wiki

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
of strings, indicating the properties and nested properties on the object. If a property is
not found at any point down the path, `get` returns `undefined`, and `set` automatically creates
an empty object for the property.

#### Vanilla

```javascript
// Using reduce, courtesy Barney Carroll (https://github.com/barneycarroll)
const get = (object, path) =>
  path.reduce((obj, key) => obj == undefined ? undefined : obj[key], object);
```

```javascript
// Using recursion
const get = (object, path) =>
  object == undefined
    ? undefined
    : path.length === 1
      ? object[path[0]]
      : get(object[path[0]], path.slice(1));
```

```javascript
const set = (object, path, value) => {
  if (path.length === 1) {
    object[path[0]] = value;
  }
  else {
    if (object[path[0]] === undefined) {
      object[path[0]] = {};
    }
    set(object[path[0]], path.slice(1), value);
  }
  return object;
};
```

```javascript
const updateWith = (object, path, func) =>
  set(object, path, func(get(object, path)));
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
- `set`: []()
- `updateWith`: []()

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
});

const nestUpdate = (update, path) => patch => {
  update(patch.context ? patch : nestPatch(patch, path));
};
```

#### Ramda

#### Lodash

<a name="code_snippets_pattern_setup"></a>
### Meiosis Pattern Setup Code

#### Function Updates

#### Patchinko Updates

[Table of Contents](toc.html)

-----

[Meiosis](http://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.

