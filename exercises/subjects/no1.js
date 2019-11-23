// mock of browser's local storage
const data = {}
const localStorage = {
  getItem: key => data[key] !== undefined ? data[key] : null,
  setItem: (key, value) => { data[key] = value },
}

