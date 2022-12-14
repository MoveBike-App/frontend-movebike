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
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'typeSearch': 'BY_SLUG'
        },
        mode: 'cors'
    }

    return fetch(URL, options)
}

function getBikesAvailable(initialDate, finalDate) {
    const URL = `${URL_BASE}reserves/vailable-vehicles?initialDate=${initialDate}&finalDate=${finalDate}`
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    }

    return fetch(URL, options)
}

export {
    getAllMotos,
    getById,
    getBikesAvailable
}