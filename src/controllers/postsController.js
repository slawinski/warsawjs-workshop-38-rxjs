const { timer, from, fromEvent, combineLatest, of, interval, onErrorResumeNext, Subject, merge } = require('rxjs')
const { map, tap, startWith, switchMap, share, catchError, retry, retryWhen, delay } = require('rxjs/operators')
const { renderPosts, renderStatus } = require('../render')

function postsController({filter$, getPosts}) {
  const error$ = new Subject()
  
  const post$ = timer(0, 5000).pipe(
    switchMap(getPosts),
    tap({
      error: err => error$.next(err),
    }),
    retryWhen(delay(1000)),
    share(),
  )
  
  const filteredPosts$ = combineLatest(post$, filter$).pipe(
    map(([posts, filter]) => filterPosts(posts, filter)),
  )
  
  const lastFetchTime$ = post$.pipe(
    map(() => new Date()),
  )
  
  const currentTime$ = timer(0, 200).pipe(
    map(() => new Date())
  )
  
  const lastFetchedStatus$$ = lastFetchTime$.pipe(
    map(lastFetchTime => currentTime$.pipe(
      map(currentTime => 
        `Last updated ${(Math.max(currentTime - lastFetchTime, 0) / 1000).toFixed()} seconds ago`
      )
    )),
  )
  
  const errorStatus$ = error$.pipe(
    map(err => `Error: ${err.message}`)
  )
  
  const status$ = merge(
    lastFetchedStatus$$,
    errorStatus$.pipe(map(x => of(x))),
  ).pipe(switchMap(x => x))

  return {
    filteredPosts$,
    status$,
  }
}

function filterPosts(posts, filter) {
  if(filter === '') return posts

  const filterLowerCased = filter.toLowerCase()
  return posts.filter(post =>
    post.title.toLowerCase().indexOf(filterLowerCased) !== -1
  )
}

module.exports = {
  postsController,
}
