const { fromEvent } = require('rxjs')
const { switchMap, map } = require('rxjs/operators')

const API_URL = 'http://localhost:3000'

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

function showUploadTab() {
  document.getElementById('upload-tab').classList.remove('hidden')

  formSub = fromEvent(document.getElementById('upload-form'), 'submit')
    .pipe(
      map(e => Object.fromEntries(new FormData(e.target))),
      switchMap(async ({ title, image }) => {
        const imageId = await uploadImage(image)
        return { title, imageId }
      }),
      switchMap(async ({ title, imageId }) => createPost(title, imageId)),
    )
  .subscribe()
}

function hideUploadTab() {
  document.getElementById('upload-tab').classList.add('hidden')

  formSub && formSub.unsubscribe()
}

module.exports = {
  showUploadTab,
  hideUploadTab,
}
