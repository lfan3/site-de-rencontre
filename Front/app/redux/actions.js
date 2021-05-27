import {ADD_USERS} from './actionTypes'

export const addUsers = users =>{
    return {
        type: ADD_USERS,
        payload: users
    }
}