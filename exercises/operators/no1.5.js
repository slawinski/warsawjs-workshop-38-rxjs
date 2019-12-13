const { timer } = require("rxjs");
const { map, filter } = require('rxjs/operators')

const numbers$ = timer(0, 200)
  .pipe(map(() => Math.round(Math.random() * 50)))

const filteredAndMapped$ = numbers$.pipe(
  filter(x => x >= 10),
  map(x => x % 10)
);

filteredAndMapped$.subscribe(console.log)