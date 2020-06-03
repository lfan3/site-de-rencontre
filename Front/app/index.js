import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom'
import './index.css'
import {BrowserRouter as Router,Switch, Route, Redirect} from 'react-router-dom'
import Photo from './components/photos/Photo'
import PhotoTuto from './components/photos/Photo_tuto'
import Register from './components/authentification/Register'
import EmailConfirm from './components/authentification/EmailConfirm'
import Main from './containers/Main'
import Join from './components/Join'
import Profile from './containers/Profile'
//import Chat from './components/Chat'
import Toto from './components/willbelikedPerson'
import Perso from './components/Perso'
import TestComponent from './components/TestComponent'
import Matched from './containers/Matched'
import {SessionProvider} from './contexts/sessionContext'
import Test from './containers/test'
import Setting from './components/setting/Setting'
import Questions from './components/questions/Questions'
import BaseQ from './components/basicQuestions/BasicQuestions'
import Csv from './dataCSV/csvD3React'

function App(){
        //need to add an autherified varible to know wether the user is loged in to enter main component
        let loginId = localStorage.getItem('loginId')
        let userId = localStorage.getItem('userId')
        return(
            <Router>
                <Switch>
                       
                            {(loginId && userId)
                            ? <Route path = '/' exact component = {Register}/>
                            : <Route path = '/' exact component = {Main}/>
                            }
                            <Route path = '/signin' component = {Register}/>
                            {/*<Route path = '/main' exact component = {Main}/>*/}
                            <Route path = '/photo' component = {Photo}/>
                            <Route path = '/perso' component = {Perso}/>
                            <Route path = '/confirm/:email/:tocken' component = {EmailConfirm}/>
                            <Route path = '/main/:userId' component = {Profile}/>
                            <Route path = '/matched' component = {Matched}/>
                            <Route path = '/questions' component = {Questions}/>
                            <Route path = '/baseq' component = {BaseQ}/>
                            <Route path = '/test' component = {Test}/>
                            <Route path = '/setting' component = {Setting}/>
                            <Route path = '/csv' component = {Csv}/>
                            <Route render = {()=> <div>four oh four === 404</div>}/>
                    }

                </Switch>
            </Router>
        )
    
}
ReactDOM.render(
    <App />,
    document.getElementById('app')
)

