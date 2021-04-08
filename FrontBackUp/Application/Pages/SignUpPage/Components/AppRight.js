import {Switch, NavLink, Link, Route} from 'react-router-dom'
import React, { Component } from 'react';
import SignUp from '../Containers/SignUp'
import NavBar from '../../../PartPages/Components/NavBar'
//import NewSignIn from '../../../../app/containers/NewSignIn'


export default function AppRight(props){
    return(
    <div className="col-sm-6 bg-gray">
        <div className = 'form-container whiteLetters'>
            <NavBar/>
            <Route exact path='/' render = {(p)=> <SignUp {...p} {...props}/>}/>
        </div>
    </div>
    )
}