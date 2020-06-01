import React, {useRef, useState, useReducer,useEffect} from 'react'
import {valideTagReg} from '../../utiles/validation'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faExclamationTriangle, faTimes } from "@fortawesome/free-solid-svg-icons"
import {
    ADD_INPUT_TAG,
    DELET_INPUT_TAG,
    CREATE_TAG,
    DELETE_TAG,
    ADD_ERROR,
    } from './Reducer'
export function TagTicket(props){
    let {tag, dispatch} = props
    const closeHandler = (e)=>{
        console.log(e.target)
        dispatch({type: DELETE_TAG, data: tag})
    }
    return(
        <div style={{height: '1.5em', backgroundColor: '#EEEEEE', textAlign:'center'}}>
            <strong style={{padding: '1em'}}>{tag}</strong>
            <FontAwesomeIcon 
				icon={faTimes} 
				size= "sm"
				style={{color:'black', marginRight: '1em'}}
				onClick = {closeHandler} />
        </div>
    )
}
export function TagsWall(props) {
    let {tags, dispatch} = props
    return(
        <div className = 'row'>
        <div className= 'col-6' >
            <ul className='flex-row' >
                {tags.map(tag=>(
                    <li key={tag} style={{margin : '15px'}}><TagTicket tag={tag} dispatch={dispatch}/></li>
                ))
                }
            </ul>
        </div>
        </div>
    )
}

export function TagsBtn(props){
    const {tag, dispatch, finishHandler} = props
    const [created, setCreated] = useState(false)
    const clickHandler = ()=>{
        if(valideTagReg.test(tag)){
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
                 {!created &&<button className='btn btn-dark' onClick={finishHandler}>Skip</button>}
                 {created && <button className='btn btn-primary' onClick={finishHandler}>Finish</button>}
            </div>
        </div>
    )
}
export function TagsSelection(props){

    const {tags} = props
    const dispatch = props.dispatch
    const changeHandler = (e)=>{
        let value = e.target.value
        dispatch({type:CREATE_TAG, data : value})
    }
    return(
        <select 
            id = 'tags'
            className='form-control'
            onChange = {changeHandler}
        >
        <option>--choose your tags--</option>
        {tags.map((tagObj, index)=>(<option value={'#'+tagObj.tag} key={index}>#{tagObj.tag}</option>))}
        </select>
    )

}
export function TagsCreation(props){
     let {tag, dispatch, error} = props
     let [warnToggle, setWarnToggle] = useState(false)
     let [warrning, setWarning] = useState(false)
     useEffect(()=>{
        if(error === 'It is not a valide hashtag'){
            setWarning(true)
            dispatch({type: DELET_INPUT_TAG})
        }
        else
            setWarning(false)
     },[error])
     const changeHandler = (e)=>{
        let val = e.target.value
        dispatch({type : ADD_INPUT_TAG, data : val})
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
            {(warnToggle || warrning) && 
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