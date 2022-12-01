const axios = require("axios");
import { URL_BASE } from "../config";

function createReserve(
  vehicle,
  totalPrice,
  isPaid,
  initialDate,
  finalDate,
  token
) {
  const URL = `${URL_BASE}reserves`;

  return axios.post(
    URL,
    { vehicle, totalPrice, isPaid, initialDate, finalDate },
    { headers: { Authorization: token } }
  );
}

function getReserveByCustomer(user, token) {
  const URL = `${URL_BASE}customers/${user}`;

  return axios.get(URL, { headers: { Authorization: token } });
}

export { createReserve, getReserveByCustomer };
