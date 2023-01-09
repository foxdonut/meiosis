# [meiosis-router](https://meiosis.js.org/router) Documentation

@docs-nav-start
@nav-prev:router-state.html:Using Route State
@nav-router-toc
@docs-nav-end

## Examples

The code repository for `meiosis-router` includes examples for both Hash Mode and History Mode.

To try out these examples, first clone the repository and set up the projects by using the commands
below:

```
git clone https://github.com/foxdonut/meiosis
cd meiosis/helpers/router/examples
cd hash-mode
npm ci
cd ../history-mode
npm ci
cd ..
```

Then you can experiment with the Hash Mode and History Mode examples.

For the Hash Mode example:

```
cd hash-mode
```

For the History Mode example:

```
cd history-mode
```

In both cases, to start the example, use:

```
npm start
```

You can then access the example in your browser with this URL: `http://localhost:9000`.

If you would like to experiment with the code, you can auto-load your changes. Open a separate
terminal window, use `cd` to navigate to the example's directory (`hash-mode` or `history-mode`),
and run the following command:

```
npm run watch
```

This will recompile the project when you save your changes. Reload the page in your browser to see
the results of your changes.

### Hash Mode

This example uses `meiosis-router` in hash mode and demonstrates the following:

- Displaying different tabs according to the route
- Clearing out data when leaving a tab
- Asking the user to confirm before leaving a tab has unsaved data
- Forbidding access to a tab if the user is not logged in
- Loading data needed for a tab on each entry
- Loading data needed for a tab only on first entry
- Filtering data using query parameters.

### History Mode

This example is the same example as the Nested Components example from `meiosis-setup` (see the
example at the bottom of the
[Nested Components documentation](https://meiosis.js.org/docs/setup-ts-nested-components.html)),
except that it uses routing in History Mode for tab navigation.

To use History Mode, you need to provide server-side support to respond to requests with different
URLs. This is because although the router handles URL changes without sending a request back to the
server, there is always the possibility that the user reloads the page or accesses a URL directly.

The example includes a bare-bones server so that the above works correctly. That part of the example
**should not** be considered for a real-world application. The server is for demonstration purposes
only, to show the router working in History Mode.

@docs-nav-start
@nav-prev:router-state.html:Using Route State
@nav-router-toc
@docs-nav-end
