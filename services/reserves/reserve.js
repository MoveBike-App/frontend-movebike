const axios = require("axios");
import { URL_BASE } from "../config";

function createReserve(data, token) {
  const URL = `${URL_BASE}reserves`;
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
      mode: 'cors'
    },
  }

  return fetch(URL, options)
}

function getReserveByCustomer(user, token) {
  const URL = `${URL_BASE}customers/${user}`;
  const options = {
    method: 'GET',
    headers: {
      Authorization: token,
      mode: 'cors'
    }
  }

  return fetch(URL, options)
}

function getReserveById(id, token){
  const URL = `${URL_BASE}reserves/${id}`
  const options = {
    method: 'GET',
    headers: {
      Authorization: token,
      'typeSearch': 'BY_SLUG',
      mode: 'cors'
    }
  }

  return fetch(URL, options)
}

export { createReserve, getReserveByCustomer, getReserveById };
