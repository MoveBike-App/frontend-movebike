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

function addAReaction (idRoute, token) {
  const URL = `${URL_BASE}reactions/${idRoute}`
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    mode: 'cors'
  }
  return fetch(URL, options)
}

function deleteAReaction (idReaction, token) {
  const URL = `${URL_BASE}reactions/${idReaction}`
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    mode: 'cors'
  }
  return fetch(URL, options)
}

export { getAllRoutes, getAllReactions, addAReaction, deleteAReaction }
