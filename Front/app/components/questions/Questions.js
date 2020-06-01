import {questions, options} from './quesList'
import React, {useRef, useEffect, useState, useReducer} from 'react'
import Checkbox from '../filterBar/Checkbox'
import SubmitBtn from './SubmitBtn'
import './questions.css'

//todo: if parter answer are not selected, button can not be clickable
const SelectBox = ({selectChange})=>{
    return(
        <select 
            className='form-control'
            onChange = {selectChange}
        >
        <option value={options[0]}>{options[0]}</option>
        <option value={options[1]}>{options[1]}</option>
        </select>
    )
}

const OptionCheckbox = (props)=>{
    const {yes, checkNo, no, checkYes} = props

    return(
        <div className='row'>
            <label className='flex-row'>
                <Checkbox checked = {yes} onChange={checkYes} />
                <span >yes</span>
            </label>
            <label className='flex-row'>
                <Checkbox  checked = {false} checked = {no} onChange={checkNo} />
                <span >No</span>
            </label>
        </div>
    )
}


const QuestionsCard = (props)=>{
    let {index} = props
   
    return(
        <div className = 'container'>
        <div className = 'row justify-content-center'>
            <div className='col-8'>
                <div className='row justify-content-center'>
                    <div className='col-10'>
                        {questions[index]}
                    </div>
                </div>
                <div className='row justify-content-center'>
                    <div className='col-10'>
                       <SelectBox {...props}/>
                    </div>
                </div>
                <div className='row justify-content-center mediumMargin' >
                    <div className='col-10'>
                        What should your ideal partner answer ?
                    </div>
                </div>
                <div 
                    className='row justify-content-center smallMargin' 
                    style={{
                        position: 'relative',
                        left: '9em'
                    }}>
                    <div className='col-10'>
                       <OptionCheckbox {...props}/>
                    </div>
                </div>

                <div className='row justify-content-center mediumMargin'>
                    <div className='col-10'>
                        <SubmitBtn {...props}/>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )

}

const useAnswersReducer = (state, action)=>{
    if(action.type === 'option1'){
        return(Object.assign({}, state, {option1 : action.data}))
    }else if(action.type === 'option2'){
        return(Object.assign({}, state, {option2 : action.data}))
    }else if(action.type === 'option3'){
        return(Object.assign({}, state, {option3 : action.data}))
    }else if(action.type === 'answers'){
        return (Object.assign({}, state, {answers : state.answers.concat([state.option1, state.option2, state.option3])}))
    }else if(action.type === 'option'){
        return {
            ...state, 
            option : action.data
        }
    }else if(action.type === 'submit'){
        console.log(action.data)
    }
}

const initialPartState = {
    //option123 are data boolean info that i need to send to server
    option1 : true,
    option2 : false,
    option3 : false,
    disableBtn: true,
    answers : [],
    //option text 
    option : 'yes',
}

const QuestionsContainer = ()=>{
    //const option = useRef()
    //const [option, setOption] = useState(options[0])
    const [submit, setSubmit] = useState(false)
    const [partState, dispatch] = useReducer(
        useAnswersReducer,
        initialPartState
    )
    const [index, setIndex] = useState(0)
    const [yes, setYes] = useState(false)
    const [no, setNo] = useState(false)
    
    const checkYes = ()=>{
        setYes((yes)=>!yes)
    }
    const checkNo = ()=>{
        setNo((no)=>!no)
    }
    const selectChange = (e)=>{
        let value = e.target.value
        //setOption(value)
        dispatch({type: 'option', data : value})
        if(value === 'yes')
            dispatch({type : 'option1', data : true})
        else
            dispatch({type : 'option1', data : false})
    }
    const nextQuestion = ()=>{
        if(index < 11){
            setIndex(index => index+1)
            dispatch({type : 'option2', data : yes})
            dispatch({type : 'option3', data : no})
            dispatch({type : 'answers'})
        }
        setYes(false)
        setNo(false)
    }
    const submitHandler = (e)=>{
        dispatch({type: 'submit', data : partState})
        setSubmit(true)
    }
    return(
       <div className = 'center-page'>
            {submit === false
            ?
            <QuestionsCard
            index = {index}
            nextQuestion = {nextQuestion}
            selectChange = {selectChange}
            yes = {yes}
            no = {no}
            checkYes = {checkYes}
            checkNo = {checkNo}
            submitHandler = {submitHandler}
            beforeLastNumQues = {10}
            option2 = {partState.option2}
            option3 = {partState.option3}
            />
            :
            <h1>Felicitation</h1>
            }
       </div>
         
    )
}

export default QuestionsContainer