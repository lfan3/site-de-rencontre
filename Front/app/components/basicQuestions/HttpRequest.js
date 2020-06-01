import { API_URL } from '../../config'
import {
    GET_CITIES, 
    CITIES_LOADED,
    ADD_POSITION,
    GET_TAGS,
    TAGS_LOADED
} from './Reducer'

//////////////////////////////////////////////////////////:/
//* This fichier contient les httprequest for BasicQ *//
////////////////////////////////////////////////////////////

//! Geolocalisation part

const getCityFromIp = (dispatch)=>{
    fetch('http://ip-api.com/json/?fields=status,city,query,lat,lon')
    .then(res=>res.json())
    .then((res)=>{
        const {lat, lon} = res
        let data = {lat, lon}
        dispatch({type: ADD_POSITION, data : data})
    })
    .catch(e=>{
        console.log('ip_api fetch error' +e)
    })
}

function success(position, dispatch){
    let lat = position.coords.latitude
    let lon = position.coords.longitude
    let data = {lat, lon}
    dispatch({type: ADD_POSITION, data : data})
    console.log(lat, lon)
}

function error(e, dispatch){
    getCityFromIp(dispatch)
}

export const geolocation = (dispatch)=>{
    if("geolocation" in navigator){
        //! pass the parameter to cb function , ex: error()
        //navigator.geolocation.getCurrentPosition(success, (e)=>error(e, dispatch))
        navigator.geolocation.getCurrentPosition((position)=>success(position,dispatch), (e)=>error(e, dispatch))
    }else{
        getCityFromIp(dispatch)
    }
}

//! get cities and tags from DB
//* Error Handler(important part)
export const getCities= async(dispatch)=>{
    let res = await fetch(`${API_URL}/cities`)
    if(res.status >=200 && res.status<=299){
        const citiesData = await res.json()
        dispatch({type: GET_CITIES, data : citiesData})
        dispatch({type: CITIES_LOADED})
    }else{
        console.log(res.status, res.statusText)
    }
}
export const getTags = (dispatch)=>{
    //* fetch GET do not need to include credential
    //* fetch does not throw 4xx or 5xx response
    fetch(`${API_URL}/tags`)
    .then(res =>{
        if(res.status >= 200 && res.status <= 299)
            return res.json()
        else{
            throw new Error(res.statusText)
        }
    })
    .then((tagsData)=>{
        dispatch({type:GET_TAGS, data : tagsData})
        dispatch({type: TAGS_LOADED})
    })
    .catch(e=>console.log(e))
}