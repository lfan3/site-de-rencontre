import {ADD_USERS} from '../actionTypes'

const initialState = {
    users : []
}

export const UserReducer = (state=initialState, action)=>{
    switch(action.type){
        case ADD_USERS:{
            return {
                users: [...action.payload]
            }
        }
        default:{
            return state
        }
    }
}