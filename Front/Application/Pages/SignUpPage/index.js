import React, { Component } from 'react';
import AppLeft from '../../PartPages/Components/AppLeft';
import AppRight from './Components/AppRight';

export default class Register extends Component {
    state = {
        signup : false,
        notice : ''
    }
    statehandler = (sendEmailsmsO)=>{
        //sendEmailsmsO = {success : blabla, error :blabla}
        if(sendEmailsmsO.error){
            this.setState({signup : false})
            this.setState({notice : sendEmailsmsO.error})
        }
        else{
            this.setState({notice : ''})
            this.setState({signup : true})
        }
    }
    render(){
        return(
            <div className="fp-container">
                <div className = 'row fullHeight'>
                     <AppLeft state= {this.state}/>
                     <AppRight statehandler = {this.statehandler} />
                </div>
            </div>
        )
    }
}
