import React, { Component } from 'react';
import Axios from 'axios';
import {Redirect} from 'react-router-dom'
import {authPost, authGet} from '../../utiles/auth'



export class SignInForm extends Component {
    state = {
        email : '',
        password : '',
        signup : 'false',
        verified : false,
        homepage : '',
        loading : true
    }
    componentDidMount(){
        let param = 'signin'
        let auth = authGet(param)
        //var authOption = {
        //    method: 'GET',
        //    url : `${API_URL}/signin`,
        //    headers:{'content-type': 'application/json'},
        //    //withCredential and send headers will enable the cookie
        //    withCredentials: true
        //}
        let homepage = Axios(auth)
        homepage.then((res)=>{
            console.log(res)
            homepage = res.data
            this.setState({
                homepage,
                loading : false
            })
        })
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
        let param = 'signin'
        let data = this.state
        let auth = authPost(param, data)
        /*
        var authOption = {
            method: 'POST',
            url : `${API_URL}/signin`,
            headers:{'content-type': 'application/json'},
            data: this.state,
            //withCredential and send headers will enable the cookie
            withCredentials: true
        }*/
        let resp = await Axios(auth)
        let backMessage = resp.data
        if(backMessage === 'verified')
        this.setState({verified : true})
    }
    render(){
        console.log(this.state.verified)
        return(
            <div>
            {this.state.verified && <Redirect to = '/test'/>}
             <div>
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
                            id = 'password'
                            name = 'password'
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
            </div>
        </div>
        )
    }
}

//potential error, after changement not tested.
//all the post use authPost from utility to generate the authOPiton
