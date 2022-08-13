# [meiosis-setup](https://meiosis.js.org/setup) Documentation

@docs-nav-start
@nav-prev:setup-js-installation.html:Installation
@nav-setup-js-toc
@nav-next:setup-js-initial-state.html:Initial State
@docs-nav-end

## Patches

In the Meiosis Documentation, the Meiosis pattern is setup up either with
[Function Patches](https://meiosis.js.org/docs/04-meiosis-with-function-patches.html) or
[Mergerino](https://meiosis.js.org/docs/05-meiosis-with-mergerino.html). The idea is that using
Function Patches gives you the option of having one less library dependency.

On the other hand, `meiosis-setup` takes a "ready-to-use" approach and includes Mergerino as a
dependency. Since Mergerino handles Function Patches, there is no need to choose between the two
when setting up Meiosis with `meiosis-setup`. You can use Function Patches and/or Mergerino as you
please:

```js
import { meiosisSetup } from 'meiosis-setup';

const cells = meiosisSetup();
cells().update(...); // Function Patch or Mergerino works
```

Here is an example:

> In the embedded examples, the exported global `Meiosis` is used instead of
`import { meiosisSetup } from 'meiosis-setup'` so that the code works in
[Flems](https://flems.io).

@flems {"files":"code/setup-patches.js","libs":"meiosis-setup"}

@docs-nav-start
@nav-prev:setup-js-installation.html:Installation
@nav-setup-js-toc
@nav-next:setup-js-initial-state.html:Initial State
@docs-nav-end
