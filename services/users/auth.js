const axios = require('axios')
import { URL_BASE } from "../config";

function authLogin(email, password) {
  const URL = `${URL_BASE}auth/login`;

  return axios.post(URL, {
    email,
    password,
  });
}

export { authLogin };
