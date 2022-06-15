/*global flyd*/

// 1. Create an update stream.
const update = flyd.stream();

// 2. Create a timesTen stream that is the result of multiplying
// by ten each value from the update stream.
const timesTen = update.map((value) => value * 10);

// 3. Create a plusTwo stream that is the result of adding two
// to each value from the timesTen stream.
const plusTwo = timesTen.map((value) => value + 2);

// 4. Map a function to the plusTwo stream that outputs each
// value using console.log.
plusTwo.map((value) => {
  console.log(value);
});

// 5. Verify that everything is working by calling update(1) and
// update(2) and/ seeing 12 and 22 on the console log.
update(1);
update(2);
