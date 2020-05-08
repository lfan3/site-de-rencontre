import React from 'react'
import Checkbox from './Checkbox'

//i can not seperate this box into statfull component and stateless,
//because there is the cheched inside the checkbox has an styled issue.
//it must be synchronisme
class GenderCheckbox extends React.Component{
    state = {
        all: false,
        woman : false,
        man : false
    }
    changeHandler = (event)=>{
        console.log(this.props)
        let id = event.target.id
        this.props.sex(id)
        let init = {
            all: false,
            woman : false,
            man : false
        }
        this.setState(()=>{
            return Object.assign(init, {[id] :true})
        })
        this.props.changeInput(id)
    }
    render(){
        return(           
            <div className='flex-row label space-aroud whiteLetters'>
            <label className='flex-row'>
                <Checkbox id='all' checked = {this.state.all} onChange ={this.changeHandler} />
                <span className='gender-options'>All genders</span>
            </label>
            <label className='flex-row' >
                <Checkbox id='woman' checked = {this.state.woman} onChange ={this.changeHandler}/>
                <span className='gender-options'>Woman</span>
            </label>
            <label className='flex-row'>
                <Checkbox id ='man' checked = {this.state.man} onChange ={this.changeHandler} />
                <span className='gender-options'>Man</span>
            </label>
            </div>

        )
    }
}

export default GenderCheckbox