import React, {useRef, useState, useReducer,useEffect} from 'react'
import SubmitBtn from '../questions/SubmitBtn'
import {csv, dsv, json} from 'd3'
import {valideNameReg, valideUsernameReg} from '../../utiles/validation'
import './basic.css'
import { API_URL } from '../../config'
import {TagsWall, TagsBtn, TagsCreation, TagsSelection} from './Tags'
import {getCities, geolocation, getTags} from './HttpRequest'
import {
    initalState,
    CHANGE_GENDER,
    CHANGE_ORIENT,
    CHANGE_CITY,
    ADD_ERROR,
    ADD_NAME,
    CHANGE_ARRD,
    NEXT,
    stateReducer
    } from './Reducer'
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



//! Components
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

function Name(props){
    const {dispatch,name} = props
    const changeHandler = (e)=>{
        let value = e.target.value
        console.log(value)
        if(valideNameReg.test(value))
            dispatch({type:ADD_NAME, data : value})
        else
            dispatch({type: ADD_ERROR, data : 'It is not a valide name'})
    }
    return(
        <div className='form-row'>
            <input type='text' value={name} onChange={changeHandler}></input>
        </div>
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
//* Now i just get all cities from france and when it is paris, it goes to arrondissemnts
//* cities data comes from db
//todo: improuve: use GeoDB cities API to trive all world's cities

const CitySelection = (props)=>{
    //* give i keep it formyself option/others
    const {dispatch, citiesData, city} = props
    const {cities, arronds} = citiesData
    const changeHandler = (e)=>{
        let value = e.target.value
        dispatch({type:CHANGE_CITY, data : value})
    }
    const parisChangeHandler = (e)=>{
        let arronds = e.target.value
        console.log('event', arronds)
        dispatch({type: CHANGE_ARRD, data: arronds})
    }
    return(
        <div>
            <select 
                id = 'city'
                className='form-control'
                onChange = {changeHandler}
            >
            <option>--choose your city--</option>
            {cities.map((city,index)=>(
                <option value={city.ville_nom} key ={index}>{city.ville_nom}</option>
            ))}
            <option>No my city option</option>
            </select>
            {city === 'PARIS' && (
                <select 
                    id = 'paris' 
                    className = 'form-control'
                    onChange = {parisChangeHandler}
                >
                    {arronds.map((arr)=>(
                        <option key={arr.l_ar} value={arr.l_ar}>{arr.l_ar}</option>
                    ))}
                </select>
            )}
        </div>

    )
}

//todo: move these questions to DB
// ! dummy data
//<Selection optionsNumber = {12} id='month' monthRef={monthRef}/>
const questions = [
    "What is your name?",
    "When is your birthday ?",
    "What is your gender ?",
    "What is your sex orientation ?",
    "In Which city do you live ?",
    "Choose some tags that you like",
    "Do you want to create your own tags ? Let's do it."
]


const BasicQ = ()=>{
    const [state, dispatch] = useReducer(
        stateReducer,
        initalState
    )
    let index = state.index
    //* just call the asyn function inside the useEffect
    useEffect(()=>{
        geolocation(dispatch)
    }, [])
    useEffect(()=>{
        getCities(dispatch)
    },[])
    useEffect(()=>{
        getTags(dispatch)
    },[])

    const finishHandler = ()=>{
        console.log(state)
        const {arronds, city, position, day, month, year,gender,newTags, orient, ipCity} = state
        const data = {arronds, ipCity, city, position, day, month, year,gender,newTags, orient}
        
        finishFetch(data)
        .then(res=>res.json())
        .then(()=>{dispatch({type: NEXT})})
        .catch((e)=>{dispatch({type: ADD_ERROR, data: 'OO something is wrong'}) } )
    }
    //todo2-1: tomorrow: error handling in node and react error boundray
    const finishFetch = async(data)=>{
        let options = {
            method : 'POST',
            headers: {'Content-Type' : 'application/json'},
            body : JSON.stringify(data),
        }
        try{
            fetch(`${API_URL}/newUser`, options)
        }catch(e){
            throw new Error('user data did not sended correctly')
        }
    }
    return(
        <div className='container-fluid center-page'>
            {(index===6 || index===5 )&& <div className='row no-padding justify-content-center'>
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
                {index === 0 && <Name dispatch = {dispatch} name = {state.name}/>}
                {index === 1 && <Birthday dispatch = {dispatch}/>}
                {index === 2 &&  <GenderSelection dispatch = {dispatch}/>}
                {index === 3 &&  <OrientSelection dispatch = {dispatch}/>}
                {index === 4 &&  (!state.citiesload ?<CitySelection dispatch = {dispatch} citiesData = {state.citiesData} city={state.city}/> : <div>loading</div>)}
                {index === 5 && (!state.tagsload ? <TagsSelection dispatch = {dispatch} tags={state.tagsData}/> : <div>loading</div>)}
                {index === 6 &&  <TagsCreation dispatch = {dispatch} tag={state.tag} error={state.error}/>}
                {index === 7 &&  <button className='btn btn-primary'>Enter</button>}
                </div>
            </div>
            <div className='row no-padding justify-content-center mediumMargin'>
                <div className='offset-4 col-7'>
                {(index === 4 && state.city ==='')
                ? <button className='btn btn-primary' disabled>Next</button>
                :((index!= 6 && index != 7)
                  ?  <SubmitBtn 
                        nextQuestion = {()=>dispatch({type : NEXT})}
                        index = {index}
                        beforeLastNumQues = {6}
                        submitHandler = {()=>dispatch({type:'submit'})}
                    />
                 : (index != 7 && <TagsBtn tag = {state.tag} dispatch={dispatch} finishHandler={finishHandler}/>)
                )
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
