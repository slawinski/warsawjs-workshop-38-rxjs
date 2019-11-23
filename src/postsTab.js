const { timer, from, fromEvent, combineLatest, of, interval, onErrorResumeNext, Subject, merge } = require('rxjs')
const { map, tap, startWith, switchMap, share, catchError, retry, retryWhen, delay } = require('rxjs/operators')
const { renderPosts, renderStatus } = require('./render')
const { postsController } = require('./controllers/postsController')

const filter$ = fromEvent(document.getElementById('filter'), 'input').pipe(
  map(e => e.target.value),
  startWith(''),
)

const { status$, filteredPosts$ } = postsController({
  filter$,
  getPosts: fetchPosts,
})


let statusSub;
let filteredPosts;

function showPostsTab() {
  document.getElementById('posts-tab').classList.remove('hidden')
  statusSub = status$.subscribe(renderStatus)
  filteredPosts = filteredPosts$.subscribe(renderPosts)
}

function hidePostsTab() {
  document.getElementById('posts-tab').classList.add('hidden')
  statusSub && statusSub.unsubscribe()
  filteredPosts && filteredPosts.unsubscribe()
}

async function fetchPosts() {
  const response = await fetch('https://warsawjs-workshop-38-backend.herokuapp.com')
  return response.json()
}

module.exports = { showPostsTab, hidePostsTab }
