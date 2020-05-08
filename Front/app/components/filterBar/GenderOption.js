import React from 'react'
import StyledP from './StyledP'
import GenderCheckbox from './GenderCheckbox'

const GenderOption = (props)=>{
    let {changeInput, clickHandler, gender, sexdata} = props
    return(
        <div>
            <StyledP className = 'whiteLetters' type='text' id='gender' onClick = {clickHandler}>{sexdata}</StyledP>
            {gender && 
                <GenderCheckbox {...props} changeInput = {changeInput}/>
            }
        </div>
        /*
        <div className='flex-colum'>
        <StyledP className = 'whiteLetters' type='text' id='gender' onClick = {clickHandler}>{sexdata}</StyledP>
        {gender && 
        <label>
            <GenderCheckbox {...props} changeInput = {changeInput}/>
        </label>
        }
        </div>
        */
    )
}

export default GenderOption