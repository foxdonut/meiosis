# [meiosis-setup](https://meiosis.js.org/setup) Documentation

@docs-nav-start
@nav-empty
@nav-setup-toc
@nav-next:setup-patches.html:Patches
@docs-nav-end

## Installation

You can install `meiosis-setup`:

- Using Node.js, or,
- Using an HTML `<script>` tag.

In both cases, the setup will give you a stream of cells as explained in the
[Meiosis documentation](toc.html).

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

> Note: we are using JavaScript code, but we will also see how to use Meiosis with TypeScript code
> in the [TypeScript Support section](setup-typescript-support.html).

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

@docs-nav-start
@nav-empty
@nav-setup-toc
@nav-next:setup-patches.html:Patches
@docs-nav-end
