import Checkbox from './Checkbox'
import React from 'react'

//const CheckboxWrapper = ({onChange, options})=>{
class CheckboxWrapper extends React.Component{
    state = {
        all: false,
        woman : false,
        man : false
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        if(this.props.checked!== nextProps.checked){
            this.setState(()=>(nextProps.checked))
        }
    }
    render(){
        let {checked, options, onChange} = this.props
        console.log(this.state)
        return(
            <div className='flex-row label space-aroud whiteLetters'>
            <label className='flex-row'>
                <Checkbox id={options[0]} checked = {checked[0]} onChange ={onChange} />
                <span className='options'>{options[0]}</span>
            </label>
            <label className='flex-row' >
                <Checkbox id={options[1]} checked = {checked[1]} onChange ={onChange}/>
                <span className='options'>{options[1]}</span>
            </label>
            <label className='flex-row'>
                <Checkbox id ={options[2]} checked = {checked[2]} onChange ={onChange}/>
                <span className='options'>{options[2]}</span>
            </label>
            </div>
        )
    }
 
}

export default CheckboxWrapper