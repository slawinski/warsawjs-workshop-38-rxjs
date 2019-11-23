const { timer } = require('rxjs')
const { scan } = require('rxjs/operators')

const price$ = timer(0, 700).pipe(
  scan((acc) => Math.round(acc + Math.random() * 60 - 30), 150),
)

price$.subscribe(console.log)
