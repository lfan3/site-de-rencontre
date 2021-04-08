import React from 'react'
import StyledP from './StyledP'

const AgeOption = (props)=>{
    let {old, clickHandler, fromdata, toAge, onChangeT, onChangeF} = props
    return(           
        <div>
        <StyledP className = 'whiteLetters' type ='text' id = 'ages' onClick = {clickHandler}>ages from {fromdata} to {toAge}</StyledP>
        {old &&
            <div>
                <input className='ageInput' type='text' id ='fromdata' maxLength='2' size='4' value ={fromdata} onChange = {onChangeF}/>
                <label className='whiteLetters'>--</label>
                <input className='ageInput' type='text' id='toAge' maxLength='2' size='4' value={toAge} onChange = {onChangeT}/>
            </div>
        }
    </div>
    )
}

export default AgeOption