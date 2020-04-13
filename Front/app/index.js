import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './index.css'
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom'
import Photo from './Components/Photo'
import Register from './Components/Register'
import EmailConfirm from './Components/EmailConfirm'
import Main from './Components/Main'
import Test from './Components/Filterbar'
import RangeSlider from './Components/RangeSlider'
/*
<Route path = '/photo' component = {Photo}/>
<Route path = '/questions' component = {Questions}/>
<Route path = '/setting' component = {Setting}/>
<Route path = '/profile' component = {Profile}/>
*/
class App extends Component{
    render(){
        //need to add an autherified varible to know wether the user is loged in to enter main component
        return(
            <Router>
                <Switch>
                    <Route path = '/' exact component = {Register}/>
                    <Route path = '/signin' component = {Register}/>
                    <Route path = '/photo' component = {Photo}/>
                    <Route path = '/confirm/:email/:tocken' component = {EmailConfirm}/>
                    <Route path = '/main' component = {Main}/>
                    <Route path = '/test' component = {Test}/>
                    <Route path = '/slider' component = {RangeSlider}/>
                    <Route render = {()=> <div>four oh four === 404</div>}/>
                </Switch>
            </Router>
        )
    }
}
ReactDOM.render(
    <App />,
    document.getElementById('app')
)

