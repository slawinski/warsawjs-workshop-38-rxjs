const { timer } = require("rxjs");
const { map } = require('rxjs/operators')

const posts$ = timer(0, 1000).pipe(
  map(() => [...new Array(Math.round(Math.random() * 10))].map((_, i) => i))
)

function loadComments(id) {
  return [...new Array(Math.round(Math.random() * 3))].map((_, i) => `Comment ${i} for post id - ${id}`)
}

function composePost(post) {
  return {
    id: post,
    comment: loadComments(post)
  }
}

function getPost(posts) {
  return posts.map((post)=> composePost(post))
}

const postsWithComments$ = posts$.pipe(
  map((item)=>{
      return getPost(item)
  })
)

postsWithComments$.subscribe(console.log)
