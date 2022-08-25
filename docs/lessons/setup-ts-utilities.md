# [meiosis-setup](https://meiosis.js.org/setup) Documentation

@docs-nav-start
@nav-prev:setup-ts-stream-implementation.html:Stream Implementation
@nav-setup-ts-toc
@docs-nav-end

## Utilities

### `get`

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

### `updateFormValue`

### `updateFormIntValue`

### `updateFormFloatValue`

@docs-nav-start
@nav-prev:setup-ts-stream-implementation.html:Stream Implementation
@nav-setup-ts-toc
@docs-nav-end
