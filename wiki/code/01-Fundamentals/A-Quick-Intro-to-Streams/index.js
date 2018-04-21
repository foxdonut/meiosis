/*global flyd*/

const element = document.getElementById("app");

const total = 3;

for (let n = 1; n <= total; n++) {
  element.innerHTML = element.innerHTML +
  "<div id='stream" + n + "'>Stream " + n + " values:</div>";
}

const log = number => value => {
  const streamElement = document.getElementById("stream" + number);
  streamElement.innerHTML = streamElement.innerHTML + " " + value;
};

const stream1 = flyd.stream();
stream1.map(log(1));
stream1(5);
stream1("2 pancakes");
log(1)(stream1());


const amounts = flyd.stream();
const add = (total, next) => total + next;

const stream2 = flyd.scan(add, 0, amounts);
stream2.map(log(2));

amounts(2);
amounts(3);
amounts(4);

const operations = flyd.stream();

const applyOperation = (total, nextOperation) => {
  if (nextOperation.operation === "add") {
    total = total + nextOperation.value;
  }
  else if (nextOperation.operation === "sub") {
    total = total - nextOperation.value;
  }
  return total;
};

const stream3 = flyd.scan(applyOperation, 0, operations);
stream3.map(log(3));

operations({ operation: "add", value: 4 });
operations({ operation: "sub", value: 6 });
operations({ operation: "add", value: 10 });
operations({ operation: "add", value: 5 });
