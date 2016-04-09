import Task from "data.task";

// broadcast : List (Signal.Address d) -> d -> a -> Task Never a
const broadcast = addresses => data => action => new Task((rej, res) => {
  addresses.forEach(address => address.next(data));
  res(action);
});

export {
  broadcast
};

