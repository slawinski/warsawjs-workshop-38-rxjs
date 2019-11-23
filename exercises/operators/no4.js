const { timer } = require("rxjs");
const { scan } = require('rxjs/operators')

const names = ['Tom', 'Bob', 'Alice', 'Peter']

const posts$ = timer(0, 1000).pipe(
  scan(acc => [...acc, {
    id: Math.round(Math.random() * 10),
    author: names[Math.round(Math.random() * 3.9)]
  }], [])
)

