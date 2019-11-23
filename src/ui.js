function renderPosts(posts) {
  const postsElem = document.getElementById('posts')
  postsElem.innerHTML = posts.map(post => `
    <div class="post">
      <img src="${post.src}"/>
      <h1>${post.title}</h1>
    </div>
  `).join('')
}

function renderStatus(status) {
  document.getElementById('status').innerHTML = status
}

function showPostsTab() {
  document.getElementById('posts-tab').classList.remove('hidden')
}

function hidePostsTab() {
  document.getElementById('posts-tab').classList.add('hidden')
}

function showUploadTab() {
  document.getElementById('upload-tab').classList.remove('hidden')
}

function hideUploadTab() {
  document.getElementById('upload-tab').classList.add('hidden')
}

function getUploadFormData() {
  return Object.fromEntries(new FormData(document.getElementById('upload-form')))
}

function renderUploadStatus(status) {
  document.getElementById('upload-status').innerHTML = status
}

module.exports = {
  renderPosts,
  renderStatus,
  showPostsTab,
  hidePostsTab,
  showUploadTab,
  hideUploadTab,
  renderUploadStatus,
  getUploadFormData,
}
