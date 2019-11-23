const { merge, fromEvent } = require('rxjs')
const { mapTo, startWith, map } = require('rxjs/operators')
const { showPostsTab, hidePostsTab } = require('./postsTab')
const { showUploadTab, hideUploadTab } = require('./uploadTab')

function initTabs() {
  const visibleTab$ = merge(
    fromEvent(document.getElementById('posts-link'), 'click').pipe(mapTo('posts-tab')),
    fromEvent(document.getElementById('upload-link'), 'click').pipe(mapTo('upload-tab')),
  ).pipe(
    startWith('posts-tab')
  )

  const isVisible$ = tab => visibleTab$.pipe(
    map(currentTab => currentTab == tab)
  )

  isVisible$('posts-tab').subscribe(isVisible => {
    if(isVisible) {
      showPostsTab()
    } else {
      hidePostsTab()
    }
  })

  isVisible$('upload-tab').subscribe(isVisible => {
    if(isVisible) {
      showUploadTab()
    } else {
      hideUploadTab()
    }
  })
}

module.exports = { initTabs } 
