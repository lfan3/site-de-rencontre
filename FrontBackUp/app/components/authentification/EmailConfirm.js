import React from 'react'
import Axios from 'axios'
import { API_URL } from '../../config'
import {Link} from 'react-router-dom'

export default class Confirm extends React.Component{
    state = {
        confirm : false,
        email : this.props.match.params.email,
        tocken : this.props.match.params.tocken
    }
    componentDidMount(){
        this.callBackApi()
    }
    callBackApi = async ()=>{
        var authOption = {
            method: 'POST',
            url : `${API_URL}/email_verify`,
            headers : {'content-type': 'application/json'},
            data : this.state
        }
        let res = await Axios(authOption)
        let answer = res.data
        console.log(answer)
        if(answer === 'email verified'){
            this.setState({
                confirm : true
            })
        }
    }
    render(){

        let {confirm} = this.state
        return(
            <div>
                {confirm ? <Link to='/signin'>Go to SignIn </Link> : <div> OH NON ! Error !! </div>}
            </div>
        )
    }
}