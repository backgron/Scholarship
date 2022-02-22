import axios from 'axios'
let fetch = {
  post: '',
  get: ''
}

fetch.get = function (api, data) {
  return new Promise((resolve, reject) => {
    axios.get(api, data).then(function (res) {
      resolve(res)
    }).catch(function (error) {
      Promise.reject(error)
    })
  })
}

fetch.post = function (api, data, header = {
  'Content-Type': 'application/json'
}) {
  return new Promise((resolve, reject) => {
    axios.post(api, data, header).then(function (res) {
      resolve(res)
    }).catch(function (error) {
      reject(error.response)
    })
  })
}


export default fetch