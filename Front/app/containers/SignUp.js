import React, { Component } from 'react';
import Axios from 'axios';
import {authPost, authGet} from '../utiles/auth'
import {
    valideEmail,
    emptyInput, 
    valideForm, 
    valideUsername, 
    validePass, 
    stringCompare
} from '../utiles/validation'
import SignUpRender from '../components/authentification/S'



export default class SignUpForm extends Component {
    state = {
        username : '',
        email : '',
        passwd : '',
        confPasswd : '',
        error : {
            username : '',
            email : '',
            passwd : '',
            confPasswd : ''
        }
    }
    handleChange = (e)=>{
        let target = e.target
        let {name, value} = target
        let {error} = this.state
        let {passwd} = this.state
        switch(name){
            case 'username' :
                let errorArr = valideUsername(value)
                let errorString = errorArr.join(' ')
                error.username = errorString
            break;
            case 'email' :
                error.email = valideEmail(value)
            break;
            case 'passwd': 
                error.passwd = validePass(value)
            break;
            case 'confPasswd':
                error.confPasswd = stringCompare(passwd, value)
            break;
        }
        this.setState({
            [name] : value,
            error,
        })
    }
    handleSubmit = (e)=>{
        e.preventDefault()
        let {username, email, passwd,confPasswd, error} = this.state
        let content = {
            username,
            email, 
            passwd,
            confPasswd
        }
        let empty = emptyInput(content)
        if(valideForm(error) && empty === false){
            this.sendEmailApi().then((sendemailmsmO)=>{
                console.log(sendemailmsmO)
                this.props.statehandler(sendemailmsmO)
            })
        }else{
            this.props.statehandler({error : 'not valide form'})
        }
    }
    sendEmailApi = async()=>{
        let param = 'signup'
        let data = this.state
        let auth = authPost(param, data)
        let res = await Axios(auth)
        console.log(res)
        return (res.data)
/*
        if(res.data.success)
            return (res.data)
        else if(res.data.error)
            return (res.data)
            */
    }
    render(){
        return(
            <SignUpRender
                handleSubmit = {this.handleSubmit}    
                handleChange = {this.handleChange}
                {...this.state}
            />
        )
    }
}