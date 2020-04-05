import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Axios from 'axios';

class App extends Component {
  state = {
    data : null,
    fetch : null
  }
  componentDidMount() {
    // Call our fetch function below once the component mounts
  this.callBackendAPI()
    .then(res => console.log(res))
    .catch(err => console.log(err));
}
  callBackendAPI = async () => {
    const params = {
      id: 6,
      first_name: 'Fred',
      last_name: 'Blair',
      email: 'freddyb34@gmail.com'
    }
    let res = await Axios.post('http://localhost:5000/api/', params);
  };
  render() {
    if("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position.coords.latitude +" "+position.coords.longitude);
      })
      return(
        <div>Geo is hiere</div>
      )
    }
    return (
      <div>
        <header >
          <h1 >Welcome to React</h1>
        </header>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)