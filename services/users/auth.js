const axios = require('axios')
import { URL_BASE } from "../config";

function authLogin(email, password) {
  const URL = `${URL_BASE}auth/login`;

  return axios.post(URL, {
    email,
    password,
  });
}

function createAccount(email, password, identity, phone) {
  const URL = `${URL_BASE}customers`
  return axios.post(URL, {
    email,
    password,
    identity,
    phone
  })
}

export { authLogin };
