import React, { useReducer} from 'react';
import Axios from 'axios';
import {authPost} from '../../../utilities/auth'
import {formContentChecker} from '../../../utilities/validation'
import SignInRender from '../RenderComponents/SignInRender'

const initialState = {
    loginId: '',
    userId:'',
    email : '',
    password : '',
    verified : false,
    homepage : '',
    loading : true,
    error : null
}

const registerReducer = (state, action)=>{
    if(action.type === 'login'){
        return {
            ...state,
            loading : true,
            error : ''
        }
    }else if(action.type === 'checkInput'){
        return {
            ...state,
            error: action.error
        }
    }else if(action.type === 'success'){
        console.log('i am inside the success')
        if(action.data){
            return({
                ...state,
                loginId : action.data.loginId,
                userId: action.data.userId,
                verified : true,
                loading : false
            })
        }
    }else if(action.type === 'error'){
        console.log('i am inside error')
        return{
            ...state,
            loading : false,
            error : action.error
        }
    }else if(action.type === 'input'){
        return{
            ...state,
            [action.name] : action.value
        }
    }else{
        throw new Error('This action can not be supported ...')
    }
}

function Register(){
    const [state, dispatch] = useReducer(
        registerReducer,
        initialState
    )
    const handleChange = (e)=>{
        let target = e.target
        let name = target.name
        let value = target.value
        dispatch({type:'input', name, value})
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch({type : 'login'})
        let error = formContentChecker(state)
        if(!error.email && ! error.password){
            console.log('no error')
            let param = 'signin'
            let data = {
                email: state.email,
                password : state.password
            }
            let auth = authPost(param, data)
            
            Axios(auth).then((resp)=>{
                let {loginId, userId}= resp.data
                localStorage.setItem('loginId', loginId)
                localStorage.setItem('userId', userId)
                if(!loginId)
                    dispatch({type: 'error', error : {info: 'User does not exist'}})
                else{
                    dispatch({ type : 'success', data : {loginId, userId}})
                }
            }).catch((error)=>dispatch({type : 'error', error : error}))
        }else{
            dispatch({type:'error', error : {...error}})
        }
    }
    return(
            <SignInRender
            handleSubmit = {handleSubmit}
            handleChange = {handleChange}
            {...state}
            />
    ) 

}

export default Register