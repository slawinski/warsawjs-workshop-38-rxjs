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

module.exports = { renderPosts, renderStatus }
