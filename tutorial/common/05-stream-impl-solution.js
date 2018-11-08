var stream = function() {
  var mapFunctions = [];
  var createdStream = function(value) {
    for (var i in mapFunctions) {
      mapFunctions[i](value);
    }
  };
  createdStream.map = function(mapFunction) {
    var newStream = stream();

    mapFunctions.push(function(value) {
      newStream(mapFunction(value));
    });

    return newStream;
  };
  return createdStream;
};

// 1. Create an update stream.
var update = stream();

// 2. Create a timesTen stream that is the result of multiplying by ten each
// value from the update stream.
var timesTen = update.map(function(value) {
  return value * 10;
});

// 3. Create a plusTwo stream that is the result of adding two to each value
// from the timesTen stream.
var plusTwo = timesTen.map(function(value) {
  return value + 2;
});

// 4. Map a function to the plusTwo stream that outputs each value using
// console.log.
plusTwo.map(function(value) {
  console.log(value);
});

// 5. Verify that everything is working by calling update(1) and update(2) and
// seeing 12 and 22 on the console log.
update(1);
update(2);
