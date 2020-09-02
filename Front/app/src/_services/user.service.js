import { API_URL } from '../../config'
import {authHeader, handleResponse} from '@/_helpers'

export const userService = {
    getAll
}

function getAll(){
    let url = `${API_URL}/users`

    const requestOption = {method:'GET',headers: authHeader()};
    return fetch(url, requestOption).then(handleResponse);
}