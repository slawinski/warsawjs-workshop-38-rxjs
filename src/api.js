const apiUrl = 'https://warsawjs-workshop-38-backend.herokuapp.com'

const getImageUrlFromId = id => `${apiUrl}/image/${id}`

async function getPosts() {
  const response = await fetch('https://warsawjs-workshop-38-backend.herokuapp.com')
  return response.json()
}

async function createPost(title, imageUrl) {
  await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      src: imageUrl,
      title,
    }),
  })
}

async function uploadImage(imageFile) {
  const formData = new FormData()
  formData.append('image', imageFile)

  const res = await fetch(`${apiUrl}/image`, {
    method: 'POST',
    body: formData,
  })
  const json = await res.json()
  return json.id;
}


module.exports = {
  apiUrl,
  getImageUrlFromId,
  getPosts,
  createPost,
  uploadImage,
}
