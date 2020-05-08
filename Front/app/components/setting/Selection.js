import React, {useRef} from 'react'
import {Router, Link} from 'react-router-dom'
import './setting.css'


const Selection = (props)=>{
    const {change} = props
    const {optionsNumber, id,Ref} = props
    //with onchange selection
   
    const options = []
    if(id !== 'year'){
        for(let i=0; i<optionsNumber; i++){
            options.push(i+1)
        }
    }else{
        let thisYear = new Date().getFullYear()
        for(let i=0; i<optionsNumber; i++){
            options.push(thisYear - i - 18)
        }
    }
    return(
        <label> {id.charAt(0).toUpperCase() + id.slice(1)}
        {!change
          ?  <select className='form-control' id={id} ref={Ref}>
                {options.map((option)=><option key={option}>{option}</option>)}
            </select>
          : <select className='form-control' id={id} ref={Ref} onChange={change}>
                {options.map((option)=><option key={option}>{option}</option>)}
            </select>  
        }
            
        </label>
 
    )
}

export default Selection