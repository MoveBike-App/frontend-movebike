const axios = require('axios')
import { URL_BASE } from "../config";

function getAllMotos(){
    const URL = `${URL_BASE}motos`
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    }
    return fetch(URL, options)
}

function getById(id) {
    const URL = `${URL_BASE}motos/${id}`

    return axios.get(URL)
}

export {
    getAllMotos,
    getById
}