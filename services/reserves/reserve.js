const axios = require('axios')
import { URL_BASE } from '../config'

function createReserve(vehicle, totalPrice,isPaid, token) {
    const URL = `${URL_BASE}reserves`

    return axios.post(URL,{vehicle, totalPrice, isPaid},{ headers:{ Authorization: token }})
}



export {
    createReserve
}