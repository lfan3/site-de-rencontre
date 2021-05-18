import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import ReactDOM from 'react-dom'
import {Home} from './app/routes/Home'
import {Match} from './app/routes/Match'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { User } from './app/routes/User'
import { UserPrivate } from './app/routes/UserPrivate'

const theme = createMuiTheme({
    palette: {
      primary: {
        main:'#9d58db',
        light:'#cb0fed'
      },
      secondary:{
        main:'#e91e63',
      },
      text:{
        main:'black',
        light: '#546e7a'
      }
    },
  });

function App(){
    return(
        <ThemeProvider theme={theme}>
       <Router history = {history}>
           <Switch>
               <Route path = '/' exact component = {Home}/>
               <Route path = '/match' component = {Match}/>
               {/* to do the /user:id */}
               <Route path = '/user' component = {User}/> 
               <Route path = '/userprivate' component = {UserPrivate}/> 
           </Switch>
       </Router>
       </ThemeProvider>

    )
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)

