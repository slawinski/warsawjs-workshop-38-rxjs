const { of } = require('rxjs')

const numbers$ = of(1, 2, 3, 4, 5, 6)






function timesTwo(observable$) {
  return null // your solution here
}






numbersDoubled$ = numbers$.pipe(
  timesTwo
)

numbersDoubled$.subscribe(console.log)
