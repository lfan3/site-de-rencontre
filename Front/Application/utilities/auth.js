import { API_URL } from '../config'

export const authPost = (param, data)=>{
    let url = `${API_URL}/${param}`
    return {
        method: 'POST',
        url,
        headers:{'content-type': 'application/json'},
        data,
        //withCredential and send headers will enable the cookie
        withCredentials: true
    }
}

export const authGet = (param) =>{
    let url = `${API_URL}/${param}`
    return{
        method: 'GET',
        url,
        headers:{'content-type': 'application/json'},
        //withCredential and send headers will enable the cookie
        withCredentials: true 
    }
}
