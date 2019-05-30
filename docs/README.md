# Meiosis Documentation Examples

You can run the examples directly on the pages of the Documentation, edit the code and see the results.

You can also run the examples locally:

```
git clone https://github.com/foxdonut/meiosis
cd meiosis/docs
npm i
npm start
```

Then open [http://localhost:9000](http://localhost:9000). Edit the source code under the `code`
directory and refresh the page in your browser to see your changes.

For "full" examples such as the [routing](https://github.com/foxdonut/meiosis/tree/master/docs)
examples, you also need to `cd` to the example's directory and build the example:

```
cd code/routing-full/adding-a-router
npm i
npm start
```

You can also use `npm run watch` to automatically rebuild the example when you make changes.
