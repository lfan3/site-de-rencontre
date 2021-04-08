import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import ReactDOM from 'react-dom'
import {Home} from './app/routes/Home'
import 'bootstrap/dist/css/bootstrap.min.css';

function App(){
    return(
       <Router history = {history}>
           <Switch>
               <Route path = '/' exact component = {Home}/>
           </Switch>
       </Router>

    )
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)

