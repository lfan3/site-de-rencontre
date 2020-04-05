import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './index.css'
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom'
import Photo from './Components/Photo'
import Register from './Components/Register'
/*
<Route path = '/main' component = {Main}/>
<Route path = '/photo' component = {Photo}/>
<Route path = '/questions' component = {Questions}/>
<Route path = '/setting' component = {Setting}/>
<Route path = '/profile' component = {Profile}/>
*/
class App extends Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route path = '/' exact component = {Register}/>
                    <Route path = '/photo' component = {Photo}/>
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

