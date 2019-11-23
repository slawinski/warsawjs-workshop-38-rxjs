const { interval } = require('rxjs')
const { mapTo } = require('rxjs/operators')

const observable$$ = interval(1000).pipe(mapTo(interval(200)))





function flatten(observable$$) {
  // your implementation here
  return null
}






const flattened$ = flatten(observable$$)

flattened$.subscribe(console.log)

