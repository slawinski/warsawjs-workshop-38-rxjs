require('./index.css')

const { getPosts } = require('./api')
const { renderPosts } = require('./ui')

getPosts().then(renderPosts)
