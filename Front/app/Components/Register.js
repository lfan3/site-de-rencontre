import React, { Component } from 'react';
import {SignInForm, SignUpForm} from './SignForms'
import '../index.css'
import Axios from 'axios';
import {Switch, NavLink, Link, Route} from 'react-router-dom'
import { API_URL } from '../config'

const activeStyle = {
    backgroundColor : '#66dac7'
}


//if the perple logined in then let it enter in the main page
class AppLeft extends Component{
    state = {
        loading : true
    }
    render(){
    return(
        <React.Fragment>
            <div className="col-sm-6 bg-blue whiteLetters">
                <div className='heartAnimation'>
                  <div className='heart'></div>
                </div>
                {this.state.loading ===false &&  <div>{this.state.homepage}</div>}
               
                {this.props.valideSignup && <div> check your email </div> }
                {this.props.valideSignup && <Link to = '/photo' className='whiteLetters'>continue your register</Link>}
            </div>
        </React.Fragment>
    )
    }
}

function NavBar(){
    return(
        <nav className='signNav flex-row space-end'>
        <ul className='flex-row space-around round-corner sign-ul'>
            <li>
                <NavLink to='/' exact activeStyle = {activeStyle} className='bg-light-gray whiteLetters flex-iterms signup'>
                    Sign Up
                </NavLink>
            </li>
            <li>
                <NavLink to ='/signin' activeStyle = {activeStyle} className='bg-light-gray whiteLetters flex-iterms signin'>
                    Sign In
                </NavLink>
            </li>
        </ul>
        </nav>
    )
}


function AppRight(props){
    return(
    <div className="col-sm-6 bg-gray">
        <div className = 'form-container whiteLetters'>
            <NavBar/>
            <Route exact path='/' render = {(p)=> <SignUpForm {...p} signedup = {props.statehandler}/>}/>
            <Route path='/signin' component = {SignInForm}/>
        </div>
    </div>
    )
}

export default class Register extends Component {
    state = {
        signup : false
    }
    statehandler = ()=>{
        this.setState({signup : true})
    }
    render(){
        return(
            <div className="fp-container">
                <div className = 'row fullHeight'>
                     <AppLeft valideSignup = {this.state.signup}/>
                     <AppRight statehandler = {this.statehandler}/>
                </div>
            </div>
        )
    }
}

