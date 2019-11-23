const { fromEvent } = require('rxjs')

let formSub;

function showUploadTab() {
  document.getElementById('upload-tab').classList.remove('hidden')

  formSub = fromEvent(document.getElementById('upload-form'), 'submit').subscribe(async e => {
    console.log(e)
    e.preventDefault();
    await fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(new FormData(e.target))),
    })
  })
}

function hideUploadTab() {
  document.getElementById('upload-tab').classList.add('hidden')

  formSub && formSub.unsubscribe()
}

module.exports = {
  showUploadTab,
  hideUploadTab,
}
