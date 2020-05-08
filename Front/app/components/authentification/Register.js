import React, { Component } from 'react';
import {SignInForm, SignUpForm} from './SignForms'
import Axios from 'axios';
import {Switch, NavLink, Link, Route} from 'react-router-dom'
import SignUp from '../../containers/SignUp'
import SignIn from '../../containers/SignIn'
import NewSignIn from '../../containers/NewSignIn'
import { sign } from 'crypto';
const activeStyle = {
    backgroundColor : '#66dac7'
}


//if the perple logined in then let it enter in the main page
function AppLeft({state}){
    console.log(state.notice, state.signup , ' inside the appleft')
    return(
        <React.Fragment>
            <div className="col-sm-6 bg-blue whiteLetters">
                <div className='heartAnimation'>
                  <div className='heart'></div>
                </div>
                <div> {state.notice} </div> 
                {state.signup && <div>Check your email</div>}

            </div>
        </React.Fragment>
    )
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
            <Route exact path='/' render = {(p)=> <SignUp {...p} {...props}/>}/>
            <Route path='/signin' component = {NewSignIn}/>
        </div>
    </div>
    )
}

export default class Register extends Component {
    state = {
        signup : false,
        notice : ''
    }
    statehandler = (sendEmailsmsO)=>{
        //sendEmailsmsO = {success : blabla, error :blabla}
        if(sendEmailsmsO.error){
            this.setState({signup : false})
            this.setState({notice : sendEmailsmsO.error})
        }
        else{
            this.setState({notice : ''})
            this.setState({signup : true})
        }
    }
    render(){
        return(
            <div className="fp-container">
                <div className = 'row fullHeight'>
                     <AppLeft state= {this.state}/>
                     <AppRight statehandler = {this.statehandler} />
                </div>
            </div>
        )
    }
}

