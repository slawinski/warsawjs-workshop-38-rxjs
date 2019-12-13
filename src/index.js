require('./index.css')

const { getPosts } = require('./api')
const { renderPosts, renderStatus } = require('./ui')
const { timer , fromEvent, combineLatest, Subject, of, merge} = require('rxjs')
const { map, switchMap, tap, startWith, share, retryWhen, delay } = require('rxjs/operators')

const error$ = new Subject()

const post$ = timer(0, 5000).pipe(
  switchMap(() => getPosts()),
  retryWhen(errorObs$ => errorObs$.pipe(
    tap(x => error$.next(x)),
    delay(1000)
  )),
  share()
)

const filter$ = fromEvent(document.getElementById('filter'), 'input').pipe(
  map(event => event.target.value),
  startWith(''),
  tap(posts => console.log('filter', posts)),
)

const filteredPosts$ = combineLatest(post$, filter$).pipe(
  map(([posts, filter]) => filterPosts(posts, filter)),
)

const successStatus$$ = post$.pipe(
  map(posts => timer(0, 1000).pipe(
    map(time => `Last fetched ${posts.length} posts ${time} seconds ago`)
  ))
);

const error$$ = error$.pipe(
  map(err => of(`Error: ${err.message}`))
)

const status$$ = merge(successStatus$$, error$$)

const statusMessage$ = status$$.pipe(
  switchMap(status$ => status$)
)

statusMessage$.subscribe(renderStatus)
filteredPosts$.subscribe(renderPosts)

function filterPosts(posts, filter) {
  const filterLowerCase = filter.toLowerCase()
  return posts.filter(post => post.title.toLowerCase().includes(filterLowerCase))
}