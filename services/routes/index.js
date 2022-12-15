import { URL_BASE } from '../config'

function getAllRoutes () {
  const URL = `${URL_BASE}routes`
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors'
  }
  return fetch(URL, options)
}

function getAllReactions (idRoute) {
  const URL = `${URL_BASE}reactions/${idRoute}`
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors'
  }
  return fetch(URL, options)
}

export { getAllRoutes, getAllReactions }
