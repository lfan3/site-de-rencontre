import React, { Component } from 'react';
import Axios from 'axios';
//check the signup information...

const valideEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const valideReg = RegExp(/[a-z0-9A-Z]+([_-]|[a-z0-9A-Z])([a-z0-9A-Z]+$)/)

function emptyInput(stats){
    for(let [key, value] of Object.entries(stats)){
        if(value === '')
            return true
    }
    return false
}

function valideForm(errObj){
    let valide = 'true';
    for(let [key, value] of Object.entries(errObj)){
        if(value !== '')
            valide = false
    }
    return valide
}

function valideUsername(username){
    let reg = valideReg.test(username)
    if(username.length < 3)
        return('username must be at least 3 caracters(letters, numbers, only one - or _')
    else if(!reg)
        return('username should have both letters and numbers, hypen or underscore is allowed in the middle of other caracters')
    return('')
}

function validePass(passwd){
    let reg = valideReg.test(passwd)
    if(passwd.length < 6)
        return('password must be at least 6 caracters (letters, numbers, only one - or _)')
    else if(!reg)
        return('username should have both letters and numbers,  hypen or underscore is allowed in the middle of other caracters')
    return('')
}

function stringCompare(pass, confpass){
    let diff = pass.localeCompare(confpass)
    if(diff)
        return('The two passwords are not the same')
    return('')
}


export class SignUpForm extends Component {
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
                error.username = valideUsername(value)
                
            break;
            case 'email' :
                error.email = valideEmailRegex.test(value) 
                ? '' 
                : 'This is not a valid Email';
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
        let {signedup} = this.props
        let content = {
            username,
            email, 
            passwd,
            confPasswd
        }
        let empty = emptyInput(content)
        if(valideForm(error) && empty === false){
           // this.callbackApi()
            signedup()
            console.log('valide')
        }else{
            console.log('not valide form')
           // console.log(error)
        }
    }
    callbackApi = async()=>{
        let res = await Axios.post('http://localhost:5000/api/', this.state)
    }
    render(){
      //  <SignupConsumer>
    //    {({signup})=>(
    //        signup
    //        ? <Link to='/signin'>Sign Up</Link>  
    //        : 'Sign Up')
    //    }
//
    //</SignupConsumer>
        let {error} = this.state
        return(
            <div className = 'FormContainer'>
                <form className = 'FormeFields' onSubmit = {this.handleSubmit}>
                    <div className = 'FormeField flex-colum'>
                        <label htmlFor='username' className='whiteLetters'>Username</label>
                        <input
                            type = 'text'
                            id = 'username'
                            name = 'username'
                            placeholder = 'create your username'
                            //very react way to handle the formulaire
                            value = {this.state.username}
                            onChange = {this.handleChange}
                        />
                        {error.username.length > 0 && <span style = {{color : "red"}}> {error.username} </span>}
                    </div>
                    <div className = 'FormeField flex-colum'>
                        <label htmlFor='email' className='whiteLetters' >Email</label>
                        <input
                            type = 'text'
                            id = 'email'
                            name = 'email'
                            placeholder = 'fill your email adress'
                            //very react way to handle the formulaire
                            value = {this.state.email}
                            onChange = {this.handleChange}
                        />
                        {error.email.length > 0 && <span style = {{color : "red"}}> {error.email} </span>}

                    </div>
                    <div className = 'FormeField flex-colum'>
                        <label htmlFor='passwd' className='whiteLetters'>Password</label>
                        <input
                            type = 'text'
                            id = 'passwd'
                            name = 'passwd'
                            placeholder = 'create your password'
                            //very react way to handle the formulaire
                            value = {this.state.passwd}
                            onChange = {this.handleChange}
                        />
                        {error.passwd.length > 0 && <span style = {{color : "red"}}> {error.passwd} </span>}
                    </div>
                    <div className = 'FormeField flex-colum'>
                        <label htmlFor='confPasswd' className='whiteLetters'>Confirme your password</label>
                        <input
                            type = 'text'
                            id = 'confPasswd'
                            name = 'confPasswd'
                            placeholder = 'create your username'
                            //very react way to handle the formulaire
                            value = {this.state.confPasswd}
                            onChange = {this.handleChange}
                        />
                        {error.confPasswd.length > 0 && <span style = {{color : "red"}}> {error.confPasswd} </span>}
                    </div>
                    <div className= "submitButton"> 
                        <button id='submit' className ='submit-button whiteLetters'>
                           Sign Up
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}


export class SignInForm extends Component {
    state = {
        email : '',
        passwd : '',
        signup : 'false',
    }
    handleChange = (e)=>{
        let target = e.target
        let name = target.name
        let value = target.value
        this.setState({
            [name] : value
        })
    }
    handleSubmit = async(e)=>{
        e.preventDefault()
        console.log(this.state)
        let res = await Axios.post('http://localhost:5000/api/', this.state)
    }
    render(){

        return(
            <div className = 'FormContainer'>
                <form className = 'FormeFields' onSubmit = {this.handleSubmit}>
                    <div className = 'FormeField flex-colum'>
                        <label htmlFor='email' className='whiteLetters'>Email</label>
                        <input
                            type = 'text'
                            id = 'email'
                            name = 'email'
                            placeholder = 'fill your email adress'
                            //very react way to handle the formulaire
                            value = {this.state.email}
                            onChange = {this.handleChange}
                        />
                    </div>
                    <div className = 'FormeField flex-colum'>
                        <label htmlFor='passwd' className='whiteLetters'>Password</label>
                        <input
                            type = 'text'
                            id = 'passwd'
                            name = 'passwd'
                            placeholder = 'create your password'
                            //very react way to handle the formulaire
                            value = {this.state.passwd}
                            onChange = {this.handleChange}
                        />
                    </div>

                    <div className= "submitButton">
                        <button id='submit' className ='submit-button whiteLetters'>Sign In</button>
                    </div>
                </form>
            </div>
        )
    }
}

