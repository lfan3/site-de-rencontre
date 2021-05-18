import React from 'react'

export const CustomeTextField = ({changeHandler, value, label})=>{
    return(
        <div className='userprivate--textField'>
            <input className='userprivate--input' type='text' onChange={changeHandler} name={label} value={value}/>
            <fieldset className="userprivate--field">
                <legend>{label}</legend>
            </fieldset>
        </div>
    )
}