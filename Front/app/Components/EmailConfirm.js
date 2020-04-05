import React from 'react'
import Axios from 'axios'

export default class Confirm extends React.Component{
    state = {
        confirm : false
    }
    componentDidMount(){
        this.callBackApi()
    }
    callBackApi = async ()=>{
        let tocken = this.props.match.params.tocken
        let email = this.props.match.params.email
        console.log(email);
        let res = await Axios.get(`http://localhost:5000/api/${email}/${tocken}`)
        let {confirm} = res.data
        if(confirm){
            if(confirm === '1'){
                this.setState({
                    confirm : true
                })
            }
        }
    }
    render(){
        let {confirm} = this.state
        return(
            <div>
                {confirm ? <div>Confirm</div> : <div> Error </div>}
            </div>
        )
    }
}