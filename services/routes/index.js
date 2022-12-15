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

function getBySlug (slug) {
  const URL = `${URL_BASE}routes/${slug}`
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      typeSearch: 'BY_SLUG'
    },
    mode: 'cors'
  }
  return fetch(URL, options)
}

export { getAllRoutes, getBySlug }
