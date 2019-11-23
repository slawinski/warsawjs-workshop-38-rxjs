const { expect } = require('chai')
const { of } = require('rxjs')
const { postsController } = require('../src/controllers/postsController')

it('works', () => {
  const { filteredPosts$, status$ } = postsController({ 
    filter$: of(""),
    getPosts: () => [1, 2, 3],
  })
})
