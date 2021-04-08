import React from 'react';

import './InputBar.css';


const InputBar = ({message, setMessage, sendMessage})=>{
    console.log('input bar' + message)

    return(
        <div>
            <input 
            value = {message}
            onChange = {(e)=>setMessage(e.target.value)}
            onKeyPress = {e=>e.key === 'Enter' && sendMessage(e)}
            />
            <button 
            onClick = {(e)=> sendMessage(e)}
            />
        </div>
  
    )

}


export default InputBar;
