import Checkbox from './Checkbox'
import React from 'react'

class OrientCheckbox extends React.Component{
    state = {
        gay: false,
        straight : false,
        bisexual : false,
    }
    changeHandler = (event)=>{
        let id = event.target.id
        this.props.orient(id)
        let init = {
            gay: false,
            straight : false,
            bisexual : false
        }
        this.setState(()=>{
            return Object.assign(init, {[id] :true})
        })
        console.log(id)
        this.props.changeInput(id)  
    }
    render(){
        return(
            <div className='flex-row label space-aroud whiteLetters'>
            <label className='flex-row'>
                <Checkbox id='gay' checked = {this.state.gay} onChange ={this.changeHandler} />
                <span className='options'>gay</span>
            </label>
            <label className='flex-row' >
                <Checkbox id='straight' checked = {this.state.straight} onChange ={this.changeHandler}/>
                <span className='options'>straight</span>
            </label>
            <label className='flex-row'>
                <Checkbox id ='bisexual' checked = {this.state.bisexual} onChange ={this.changeHandler}/>
                <span className='options'>bisexual</span>
            </label>
            </div>
 
        ) 
    }
}

export default OrientCheckbox