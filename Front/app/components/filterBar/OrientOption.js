import React from 'react'
import StyledP from './StyledP'
import OrientCheckbox from './OrientCheckBox'


const OrientOption = (props)=>{
    //ori to handle wether the checkbox show up: boolean
    //orientdata: straight or gay
    //orient, is the a function from main component.
    //so i need to make distingtion between ori and orient
    let {clickHandler, changeInput, orientdata, ori} = props
    return(
        <div>
                <StyledP className = 'whiteLetters' type='text' id = 'orient' onClick = {clickHandler}> {orientdata}</StyledP>
                {ori && <OrientCheckbox {...props} changeInput = {changeInput}/>}
        </div>
    )
}

export default OrientOption