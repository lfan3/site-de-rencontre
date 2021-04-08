import React from 'react'
import {BrowserRouter as Router,Switch, Route, Redirect} from 'react-router-dom'
import ReactDOM from 'react-dom'
import Register from './Application/Pages/SignUpPage/index'
import Login from './Application/Pages/SignInPage/index'
import Main from './app/containers/Main'
import './app/style/index.css'


function App(){
    return(
       <Router history = {history}>
           <Switch>
               <Route path = '/' exact component = {Register}/>
               <Route path = '/login' exact component = {Login}/>
               <Route path = '/main' exact component = {Main}/>
           </Switch>
       </Router>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)

