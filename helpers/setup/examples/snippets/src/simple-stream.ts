import { simpleStream } from 'meiosis-setup/simple-stream';

const s1 = simpleStream.stream<number>();
const s2 = s1.map((value) => value * 10);
const s3 = simpleStream.scan((sum, next) => sum + next, 0, s1);
s3.map((value) => console.log('s3:', value));

s1(42);
console.log('s1:', s1());

s1(10);
console.log('s2:', s2());

s1(20);
