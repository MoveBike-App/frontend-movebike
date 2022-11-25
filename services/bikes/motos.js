const axios = require('axios')
import { URL_BASE } from "../config";

function getAllMotos(){
    const URL = `${URL_BASE}motos`
    return axios.get(URL)
}

function getById(id) {
    const URL = `${URL_BASE}motos/${id}`

    return axios.get(URL)
}

export {
    getAllMotos,
    getById
}