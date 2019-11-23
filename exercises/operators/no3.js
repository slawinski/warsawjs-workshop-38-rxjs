const { timer } = require('rxjs');
const { map } = require('rxjs/operators')

const posts$ = timer(0, 1000).pipe(
  map(() => [...new Array(Math.round(Math.random() * 10))].map((_, i) => i))
)

function loadComments(id) {
  return new Promise(resolve => {
    const data = [...new Array(Math.round(Math.random() * 3))].map((_, i) => `Comment ${i} for post id - ${id}`)
    setTimeout(() => resolve(data), 100)
  })
}






const postsWithComments$ = null // your solution here






postsWithComments$.subscribe(console.log)
