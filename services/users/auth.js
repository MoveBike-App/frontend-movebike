const axios = require('axios')
import { URL_BASE } from "../config";

function authLogin(credentials) {
  const URL = `${URL_BASE}auth/login`;
  
  const options = {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors'
  }

  return fetch(URL, options);
}

function createAccount(email, password, identity, phone) {
  const URL = `${URL_BASE}customers`
  return fetch(URL, {
    email,
    password,
    identity,
    phone
  })
}

export { authLogin };
