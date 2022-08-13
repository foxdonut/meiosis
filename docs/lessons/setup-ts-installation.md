# [meiosis-setup](https://meiosis.js.org/setup) Documentation

@docs-nav-start
@nav-empty
@nav-setup-ts-toc
@nav-next:setup-ts-patches.html:Patches
@docs-nav-end

## Installation

For use with TypeScript, install `meiosis-setup` using `npm`:

```
npm i meiosis-setup
```

Then you can import it and use it with this code:

```js
import { meiosisSetup } from 'meiosis-setup';

interface State {
  // your application state type
}

const cells = meiosisSetup<State>();
```

The setup gives you a stream of cells as explained in the
[Meiosis documentation](06-cells.html).

@docs-nav-start
@nav-empty
@nav-setup-ts-toc
@nav-next:setup-ts-patches.html:Patches
@docs-nav-end
