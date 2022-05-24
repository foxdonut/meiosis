# meiosis-setup

# Caution: Work In Progress - Not Yet Released!

Helper library to set up the Meiosis pattern for you. Please make sure to first read the
documentation on the [Meiosis pattern](https://meiosis.js.org/docs/toc.html).

## Features

- Works with function patches and [Mergerino](#setup-with-mergerino)
- Includes a simple stream implementation, or you can use [Flyd](https://github.com/paldepind/flyd)
or [Mithril Stream](https://mithril.js.org/stream.html)
- Sets up Services and Nested Components
- Provides [TypeScript](https://www.typescriptlang.org/) support

## Installation

Using Node.js:

```
npm i meiosis-setup
```

Then you can import using:

```js
import meiosisSetup from 'meiosis-setup/functionPatches';

// or

import meiosisSetup from 'meiosis-setup/mergerino';

// then

const cells = meiosisSetup();
```

With a script tag:

```html
<script src="http://unpkg.com/meiosis-setup"></script>
```

Then use the `Meiosis` global variable:

```js
const cells = Meiosis.functionPatches.setup();

// or

const cells = Meiosis.mergerino.setup();
```

## Documentation

Please see [`meiosis-setup` Documentation](https://meiosis.js.org/docs/setup-toc.html).

## Credits

Many thanks to the following people for your contributions, feedback, and suggestions. They are much
appreciated!

- [James Forbes](https://james-forbes.com)
- [Scotty Simpson](https://github.com/CreaturesInUnitards)
- [Daniel Loomer](https://github.com/fuzetsu)
- [Erik Vullings](https://github.com/erikvullings)
- [Barney Carroll](https://github.com/barneycarroll)
- [Stephan Thon](https://github.com/smuemd)
- [Constantin Angheloiu](https://github.com/cmnstmntmn)

----

_meiosis-setup is developed by [foxdonut](https://github.com/foxdonut)
([@foxdonut00](http://twitter.com/foxdonut00)) and is released under the MIT license._
