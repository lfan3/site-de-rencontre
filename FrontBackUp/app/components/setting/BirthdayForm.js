import React from 'react'
import Selection from './Selection'

const BirthdayForm= (props)=>{
    const {dayRef, monthRef, yearRef} = props
    return(
    <div className='form-row'> 
        <div className='form-group col-2'>
                <Selection optionsNumber ={31} id='day' Ref = {dayRef}/>
        </div>
        
        <div className='form-group col-2'>
                <Selection optionsNumber = {12} id='month' Ref={monthRef}/>
        </div>
        <div className='form-group col-4'>
                <Selection optionsNumber = {50} id='year' Ref={yearRef}/>
        </div>
    </div>
    )
}

export default BirthdayForm