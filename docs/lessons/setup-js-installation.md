# [meiosis-setup](https://meiosis.js.org/setup) Documentation

@docs-nav-start
@nav-empty
@nav-setup-js-toc
@nav-next:setup-js-patches.html:Patches
@docs-nav-end

## Installation

You can install `meiosis-setup`:

- Using npm, or,
- Using an HTML `<script>` tag.

### Using npm

Install `meiosis-setup` with `npm`:

```
npm i meiosis-setup
```

Then you can import it and use it with this code:

```js
import { meiosisSetup } from 'meiosis-setup';

const cells = meiosisSetup();
```

### Using an HTML `<script>` tag

Load `meiosis-setup` by adding a `<script>` tag to your HTML page:

```html
<script src="https://unpkg.com/meiosis-setup/meiosis-setup.js"></script>
```

Or load the minimized version:

```html
<script src="https://unpkg.com/meiosis-setup/meiosis-setup.min.js"></script>
```

Then use the `Meiosis` global variable:

```js
const cells = Meiosis.setup();
```

In both cases, the setup gives you a stream of cells as explained in the
[Meiosis documentation](06-cells.html).

@docs-nav-start
@nav-empty
@nav-setup-js-toc
@nav-next:setup-js-patches.html:Patches
@docs-nav-end
