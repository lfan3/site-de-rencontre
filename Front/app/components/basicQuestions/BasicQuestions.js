import React, {useRef, useState, useReducer,useEffect} from 'react'
import SubmitBtn from '../questions/SubmitBtn'
import {csv, dsv, json} from 'd3'
import './basic.css'
import {valideTagReg} from '../../utiles/validation'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"

/************************************************************* */
/*-------------------------------------------------------------*/
//              useReducer way to handle seperated/mutliply pages formulaire
/*------------------------------------------------------------*/
/***************************************************************** */
//formulaire use ref VS state
//if it is a one page formulaire, 
//ref is much better, we can access easily the data by dayRef.current.value to get the formulaire content, 
//otherwise, we need a changeHandler, but if we use changehandler, it is better to use a stateful valuething
//BUUUUUUUUUUT if it is a multiply page formulaire, it is better to use stateful value , so the value stay in the state

const Selection = (props)=>{
    const {optionsNumber, id, dispatch} = props
    //with onchange selection
    const options = []
    let labelName = id.charAt(0).toUpperCase() + id.slice(1)
    if(id !== 'year'){
        for(let i=0; i<optionsNumber; i++){
            options.push(i+1)
        }
    }else{
        let thisYear = new Date().getFullYear()
        for(let i=0; i<optionsNumber; i++){
            options.push(thisYear - i - 18)
        }
    }
    const changeHandler = (e)=> {
        let value = e.target.value
        dispatch({type:'change'+labelName, data: value})
    }
    return(
        <label> {labelName}
            <select className='form-control' id={id} onChange = {changeHandler}>
                {options.map((option)=><option key={option}>{option}</option>)}
            </select>
        </label>
 
    )
} 

const Birthday= (props)=>{
    return(
    <div className='form-row'> 
        <div className='form-group col-2'>
                <Selection optionsNumber ={31} id='day' {...props}/>
        </div>
        
        <div className='form-group col-2'>
                <Selection optionsNumber = {12} id='month' {...props}/>
        </div>
        <div className='form-group col-4'>
                <Selection optionsNumber = {50} id='year'{...props} />
        </div>
    </div>
    )
}

const GenderSelection = (props)=>{
    const dispatch = props.dispatch
    const changeHandler = (e)=>{
        let value = e.target.value
        dispatch({type:CHANGE_GENDER, data : value})
    }
    return(
        <select 
            id = 'gender'
            className='form-control'
            onChange = {changeHandler}
        >
        <option value='woman'>woman</option>
        <option value='man'>man</option>
        </select>
    )
}

const OrientSelection = (props)=>{
    const dispatch = props.dispatch
    const changeHandler = (e)=>{
        let value = e.target.value
        dispatch({type:CHANGE_ORIENT, data : value})
    }
    return(
        <select 
            id = 'orient'
            className='form-control'
            onChange = {changeHandler}
        >
        <option value='straigt'>straight</option>
        <option value='gay'>gay</option>
        <option value='bisexual'>bisexual</option>
        </select>
    )
}

const CitySelection = (props)=>{
    //selection with svg file
    //ip location
    const {dispatch} = props
    const [cityApi, setCityApi] = useState({})
    useEffect(()=>{
        //csv('app/dataCSV/villes_france.csv').then(data=>{
        //    data.forEach(d => setCity(()=>city.push(d.OZAN)))
        //})
        //json('app/dataCSV/arrondissements.json').then(data=>{
        //    console.log(data)
        //    let noms = data.map(d=>d.fields.l_ar)
        //    setCity(noms)
        //})
        fetch('http://ip-api.com/json/?fields=status,city,query,lat,lon')
            .then(res=>res.json())
            .then((res)=>{
                setCityApi(res)
            })

    }, [])
    console.log(cityApi)
    const changeHandler = (e)=>{
        let value = e.target.value
        dispatch({type:CHANGE_CITY, data : value})
    }
    return(
        <select 
            id = 'city'
            className='form-control'
            onChange = {changeHandler}
        >
        <option value='paris'>paris</option>
        <option value='newyork'>New York</option>
        <option value='london'>London</option>
        </select>
    )
}

const TagsSelection = (props)=>{
    //get tags from the back with useEffect
    //fake tags array from back
    //add tags to state Api
    let tags = ['sunshine', 'learning', 'computer games', 'alcool']
    const dispatch = props.dispatch
    const changeHandler = (e)=>{
        let value = e.target.value
        dispatch({type:CHANGE_TAG, data : value})
    }
    return(
        <select 
            id = 'tags'
            className='form-control'
            onChange = {changeHandler}
        >
        {tags.map((tag)=>(<option value={tag} key={tag}>{tag}</option>))}
        </select>
    )

}

const TagsBtn = (props)=>{
    const {tag, dispatch} = props
    const [created, setCreated] = useState(false)
    const clickHandler = ()=>{
        console.log('inside tagbtn ' + tag)
        console.log(valideTagReg.test(tag))
        if(valideTagReg.test(tag)){
            console.log('hey')
            dispatch({type: CREATE_TAG, data: tag})
            dispatch({type: ADD_ERROR, data : ''})
            setCreated(true)
        }else{
            dispatch({type: ADD_ERROR, data : 'It is not a valide hashtag'})
        }
    }
    return(
        <div className='row justify-content-center'>
            <div className='col-6'>
                 <button className='btn btn-warning' onClick={clickHandler}>Creat</button>
                 {created && <button className='btn btn-primary' >Finish</button>}
            </div>
        </div>
    )
}

const TagsWall = (props) =>{
    let {tags, dispatch} = props
    return(
        <ul className='flex-row'>
            {tags.map(tag=>(
                <li key={tag} style={{margin : '15px'}}>{tag}</li>
            ))
            }
        </ul>
    )

}
const TagsCreation = (props)=>{
    //let the user to enter the tags by themselves
     //add tags to state Api
     //const dispatch = props.dispatch
     //const changeHandler = (e)=>{
     //    let value = e.target.value
     //    dispatch({type:CHANGE_TAG, data : value})
     //}
     //verify
     /*

     const [value, setValue] = useState('')*/
     let {tag, dispatch} = props
     let [warnToggle, setWarnToggle] = useState(false)
     const changeHandler = (e)=>{
        let val = e.target.value
        dispatch({type : ADD_TAG, data : val})
    }
    const mouseEnterhandler = (e)=>{
        setWarnToggle(true)
    }
    const mouseLeavehandler = (e)=>{
        setWarnToggle(false)
    }
     return(
         <div>
            <input 
            className = 'form-controle form-controle-lg'
            type='text' 
            placeholder='enter one tag' 
            value={tag} 
            onChange = {changeHandler}
            />
            
            <span>
            <FontAwesomeIcon 
                icon={faExclamationTriangle} 
                style={{color:'red'}}
                onMouseEnter = {mouseEnterhandler} 
                onMouseLeave = {mouseLeavehandler} />
            </span>
            {warnToggle && 
                <div 
                className='border border-warning text-muted' 
                style={{fontSize : '15px', marginTop : '15px'}}>
                <p >
                    The hashtag should begin with # like #hashtag. 
                </p>
                <p>
                    Following the # 
                    you can add up to ten signes(letter, numbers, the special caracters(-_@(){}:,.^%))
                </p>
            </div>
            }
   

         </div>
     )
}

//<Selection optionsNumber = {12} id='month' monthRef={monthRef}/>
const questions = [
    "When is your birthday ?",
    "What is your gender ?",
    "What is your sex orientation ?",
    "In Which city do you live ?",
    "Choose some tags that you like",
    "Do you want to create your own tags ? Let's do it."
]
//utility function
const existedInArray = (el, arr)=>{
    let judger = false
    for(let i=0; i<arr.length; i++){
        if(arr[i] === el)
            judger = true
    }
    return judger
}
const initalState = {
    day : 1,
    month : 1,
    year : 2002,
    gender : 'woman',
    orient : 'straight',
    city : 'paris',
    index : 4,
    tag : '',
    tags : [],
    newTags : [],
    error : ''
}
//not useful because of selection
//const CHANGE_DAY = 'CHANGE_DAY'
//const CHANGE_MONTH = 'CHANGE_MONTH'

const CHANGE_GENDER = 'CHANGE_GENDER'
const CHANGE_ORIENT = 'CHANGE_ORIENT'
const CHANGE_CITY = 'CHANGE_CITY'
const CHANGE_TAGS = 'CHANGE_TAGS'
const ADD_TAG = 'ADD_TAG'
const CREATE_TAG = 'CREATE_TAG'
const DELETE_TAG = 'DELETE_TAG'
const ADD_ERROR = 'ADD_ERROR'

const stateReducer = (state, action)=>{
    if(action.type === 'next'){
        return(Object.assign({}, state, {index : state.index + 1}))
    }
    else if(action.type === 'changeDay'){
        return(Object.assign({}, state, {day : action.data}))
    }
    else if(action.type === 'changeMonth')
        return(Object.assign({}, state, {month : action.data}))
    else if(action.type === 'changeYear')
        return(Object.assign({}, state, {year : action.data}))
    else if(action.type === CHANGE_GENDER)
        return(Object.assign({}, state, {gender : action.data}))
    else if(action.type === CHANGE_ORIENT)
        return(Object.assign({}, state, {orient : action.data}))
    else if(action.type === CHANGE_CITY)
        return(Object.assign({}, state, {city : action.data}))
    else if(action.type === 'changeTags'){
        //change to concate when there is api
        return(Object.assign({}, state, {tags : action.data}))
    }
    else if(action.type === ADD_TAG){
        return(Object.assign({}, state, {tag : action.data}))
    }
    else if(action.type === CREATE_TAG){
        let tag = action.data
        let newTags = state.newTags
        if(existedInArray(tag, newTags))
            return(Object.assign({}, state, {tag :''}))
        else    
            return(Object.assign({}, state, {tag :''},{newTags : newTags.concat([tag])}))
    }
    else if(action.type === DELETE_TAG){
        let newTags = state.newTags.filter((nt)=> nt !== action.data)
        return(Object.assign({}, state, newTags))
    }
    else if(action.type === ADD_ERROR)
        return(Object.assign({}, state, {error : action.data}))
    else if(action.type === 'submit'){
        return(Object.assign({}, state, {tag : state.tag.concat(state.newTags)}, {newTags : []}))
    }

}


const BasicQ = ()=>{
    const [state, dispatch] = useReducer(
        stateReducer,
        initalState
    )
    let index = state.index

    return(
        <div className='container-fluid center-page'>
            {index===5 && <div className='row no-padding justify-content-center'>
                <div className='col-4'>
                   {<TagsWall tags = {state.newTags} dispatch={dispatch}/>}
                </div>
            </div>
            }
            <div className='row no-padding justify-content-center'>
                <div className='offset-4 col-7'>
                   {questions[index]}
                </div>
            </div>
            <div className='row no-padding justify-content-center mediumMargin'>
                <div className='offset-4 col-7'>
                {index === 0 && <Birthday dispatch = {dispatch}/>}
                {index === 1 &&  <GenderSelection dispatch = {dispatch}/>}
                {index === 2 &&  <OrientSelection dispatch = {dispatch}/>}
                {index === 3 &&  <CitySelection dispatch = {dispatch}/>}
                {index === 4 &&  <TagsSelection dispatch = {dispatch}/>}
                {index === 5 &&  <TagsCreation dispatch = {dispatch} tag={state.tag}/>}
                </div>
            </div>
            <div className='row no-padding justify-content-center mediumMargin'>
                <div className='offset-4 col-7'>
                {index!==5
                  ?  <SubmitBtn 
                        nextQuestion = {()=>dispatch({type : 'next'})}
                        index = {index}
                        beforeLastNumQues = {5}
                        submitHandler = {()=>dispatch({type:'submit'})}
                    />
                 : <TagsBtn tag = {state.tag} dispatch={dispatch}/>
                }
                </div>
            </div>
            <div className='row no-padding justify-content-center mediumMargin'>
            {state.error && 
                <div className='offset-4 col-7'>
                    {state.error}
                </div>
            }
            </div>
        </div>
    )
}

export default BasicQ
