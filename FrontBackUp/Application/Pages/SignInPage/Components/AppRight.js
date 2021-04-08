import {Route} from 'react-router-dom'
import React from 'react';
import NavBar from '../../../PartPages/Components/NavBar'
import SignIn from '../Containers/SignIn'


export default function AppRight(props){
    return(
    <div className="col-sm-6 bg-gray">
        <div className = 'form-container whiteLetters'>
            <NavBar/>
            <Route path='/login' component = {SignIn}/>
        </div>
    </div>
    )
}