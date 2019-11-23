const { fromEvent, BehaviorSubject, EMPTY } = require('rxjs')
const { switchMap, map, tap, catchError } = require('rxjs/operators')

const API_URL = 'https://warsawjs-workshop-38-backend.herokuapp.com'

async function uploadImage(image) {
  const formData = new FormData()
  formData.append('image', image)

  const res = await fetch(`${API_URL}/image`, {
    method: 'POST',
    body: formData,
  })
  const json = await res.json()
  return json.id;
}

async function createPost(title, imgId) {
  await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      src: `${API_URL}/image/${imgId}`,
      title,
    }),
  })
}

let formSub;
let progressSub;

function showUploadTab() {
  document.getElementById('upload-tab').classList.remove('hidden')

  const progress$ = new BehaviorSubject('')

  formSub = fromEvent(document.getElementById('upload-form'), 'submit')
    .pipe(
      map(e => Object.fromEntries(new FormData(e.target))),
      tap(() => progress$.next('Uploading image..')),
      switchMap(async ({ title, image }) => {
        const imageId = await uploadImage(image)
        return { title, imageId }
      }),
      tap(() => progress$.next('Creating post..')),
      switchMap(async ({ title, imageId }) => createPost(title, imageId)),
      tap(() => progress$.next('Done.')),
      catchError(err => {
        progress$.next(`Error: ${err.message}`)
        return EMPTY
      }),
    )
  .subscribe()

  progressSub = progress$.subscribe(
    status => document.getElementById('upload-status').innerHTML = status,
  )
}

function hideUploadTab() {
  document.getElementById('upload-tab').classList.add('hidden')

  formSub && formSub.unsubscribe()
  progressSub && progressSub.unsubscribe()
}

module.exports = {
  showUploadTab,
  hideUploadTab,
}
