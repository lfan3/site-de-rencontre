import React, { Component } from 'react';
import ReactDOM from 'react-dom'

class App extends Component {
  state = {
    data : null,
    fetch : null
  }/*
  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };
*/
  fetchData = ()=>{
    fetch('/express_backend')
    .then((res)=>res.json())
    .then((respos)=>{
      this.setState({
        fetch : respos.express
      })
      console.log(respos.express);
    });
  }
  getData = ()=>{
    this.setState({
      data : 'nice'
    })
  }
  /*
  function fetchRepos(username){
    return fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
    .then((res) => res.json())
    .then((repos)=>{
        if(repos.message)
            throw new Error(getErrorMsg(repos.message,username))
        return repos
    })
}*/

  render() {
    return (
      <div>
        <header >
          <h1 >Welcome to React</h1>
        </header>
        <button onClick = {this.getData}>Data</button>
        <p>{this.state.data}</p>
        <button onClick = {this.fetchData}>fetch_Data</button>
        <p>{this.state.fetch}</p>

      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)