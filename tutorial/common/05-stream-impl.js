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