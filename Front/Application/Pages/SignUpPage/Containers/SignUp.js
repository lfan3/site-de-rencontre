import React, { Component } from 'react'
import {sendEmailApi} from '../../../services/authenticationService'
import {
    valideEmail,
    emptyInput, 
    valideForm, 
    valideUsername, 
    validePass, 
    stringCompare
} from '../../../utilities/validation'
import SignUpRender from '../RenderComponents/SignUpRender'

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
            sendEmailApi(this.state).then((sendemailmsmO)=>{
                this.props.statehandler(sendemailmsmO)
            })
        }else{
            this.props.statehandler({error : 'not valide form'})
        }
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