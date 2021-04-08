//! STORE + reducer + actionsTypes
//? Is it better to have one load at the very begining of all the fetch
//? Or it is better like hier two load, as I think, they will be loaded before arrive at this elements
//? so i load the data one by one
export const initalState = {
    //todo: to define login_id
    login_id : 512,
    name:'',
    day : 1,
    month : 1,
    year : 2002,
    gender : 'woman',
    orient : 'straight',
    citiesData: {},
    position : {},
    city : '',
    arronds: '1er Ardt',
    index : 0,
    tagsData: [],
    tag : '',
    newTags : [],
    citiesload: true,
    tagsload: true,
    error : ''
}


//not useful because of selection
//const CHANGE_DAY = 'CHANGE_DAY'
//const CHANGE_MONTH = 'CHANGE_MONTH'
export const ADD_NAME = 'ADD_NAME'
export const CHANGE_GENDER = 'CHANGE_GENDER'
export const CHANGE_ORIENT = 'CHANGE_ORIENT'
export const CHANGE_CITY = 'CHANGE_CITY'
export const CHANGE_TAGS = 'CHANGE_TAGS'
export const ADD_INPUT_TAG = 'ADD_INPUT_TAG'
export const DELET_INPUT_TAG = 'DELET_INPUT_TAG'
export const CREATE_TAG = 'CREATE_TAG'
export const DELETE_TAG = 'DELETE_TAG'
export const ADD_ERROR = 'ADD_ERROR'
export const GET_TAGS = 'GET_TAGS'
export const TAGS_LOADED = 'TAGS_LOADED'
export const GET_CITIES = 'GET_CITIES'
export const CITIES_LOADED = 'CITIES_LOADED'
export const CHANGE_ARRD = 'CHANGE_ARRD'
export const NEXT = 'NEXT'
export const ADD_POSITION = 'ADD_POSITION'

// ! utility function
const existedInArray = (el, arr)=>{
    let judger = false
    for(let i=0; i<arr.length; i++){
        if(arr[i] === el)
            judger = true
    }
    return judger
}

export const stateReducer = (state, action)=>{
    switch(action.type){
        case ADD_NAME : {
            return(Object.assign({}, state, {name : action.data}))
        }
        case NEXT :{
            return(Object.assign({}, state, {index : state.index + 1}))
        }
        case 'changeDay': {
            return(Object.assign({}, state, {day : action.data}))
        }
        case 'changeMonth':{
            return(Object.assign({}, state, {month : action.data}))
        }
        case 'changeYear':{
            return(Object.assign({}, state, {year : action.data}))
        }
        case CHANGE_GENDER:{
            return(Object.assign({}, state, {gender : action.data}))
        }
        case CHANGE_ORIENT:{
            return(Object.assign({}, state, {orient : action.data}))
        }
        case CHANGE_CITY:{
            if(action.data === '--choose your city--')
                action.data = ''
            return(Object.assign({}, state, {city : action.data}))
        }
        case ADD_INPUT_TAG:{
            return(Object.assign({}, state, {tag : action.data}))
        }
        case DELET_INPUT_TAG:{
            return(Object.assign({}, state, {tag : ''}))
        }
        case CREATE_TAG:{
            let tag = action.data
            let newTags = state.newTags
            if(existedInArray(tag, newTags) || tag === '--choose your tags--')
                return(Object.assign({}, state, {tag :''}))
            else    
                return(Object.assign({}, state, {tag :''},{newTags : newTags.concat([tag])}))
        }
        case DELETE_TAG:{
            let newTags = state.newTags.filter((nt)=> nt !== action.data)
            let newState = Object.assign({}, state, {newTags})
            return(newState)
        }
        case ADD_ERROR:{
            return(Object.assign({}, state, {error : action.data}))
        }
        case 'submit':{
            return(Object.assign({}, state, {tag : state.tag.concat(state.newTags)}, {newTags : []}))
        }
        case GET_TAGS:{
            return(Object.assign({}, state, {tagsData : action.data}))

        }
        case TAGS_LOADED:{
            return(Object.assign({}, state, {tagsload : false}))
        }     
        case GET_CITIES:{
            return(Object.assign({}, state, {citiesData : action.data}))
        }
        case CITIES_LOADED:{
            return(Object.assign({}, state, {citiesload : false}))
        }
        case CHANGE_ARRD:{
            return(Object.assign({}, state, {arronds : action.data}))
        }
        case ADD_POSITION:{
            console.log(action.data)
            return(Object.assign({}, state, {position : action.data}))
        }
    }
}