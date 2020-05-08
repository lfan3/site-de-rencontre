import React, { Component } from 'react';
import Axios from 'axios';
import {authPost, authGet} from '../utiles/auth'
import { formContentChecker} from '../utiles/validation'
import SignInRender from '../components/authentification/SignInRender'

export default class SignIn extends Component {
    state = {
        email : '',
        password : '',
        verified : false,
        homepage : '',
        loading : true,
        error : null
    }
    //? do i need this did mount?
    componentDidMount(){
        let param = 'signin'
        let auth = authGet(param)
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
        let error = formContentChecker(this.state)
        if(!error){
            console.log('no error')
            let param = 'signin'
            let data = this.state
            let auth = authPost(param, data)
            
            let resp = await Axios(auth)
            let backMessage = resp.data
            if(backMessage === 'verified')
            this.setState({verified : true})
        }else{
            //often made mistake forget () to return object
            this.setState(()=>({error : {...error}}))
            console.log(error)
        }
    }

    render(){
        console.log(this.state)

        return(
            <SignInRender
                handleSubmit = {this.handleSubmit}
                handleChange = {this.handleChange}
                {...this.state}
            />
        ) 
    }
}

//potential error, after changement not tested.
