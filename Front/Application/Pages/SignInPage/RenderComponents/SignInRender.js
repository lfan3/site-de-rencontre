import React from 'react'
import {Link } from 'react-router-dom'
//todo: loginId userId, both defined, login defined, userId not defined, get ids from local or API
const SignInRender = (props)=>{
    let {loginId, userId} = props
    let {handleChange, handleSubmit, verified, password, email, error} = props
    return(
        <div>
            <div>
            <div className = 'FormContainer'>
                <form className = 'FormeFields' onSubmit = {handleSubmit}>
                    <div className = 'FormeField flex-colum'>
                        <label htmlFor='email' className='whiteLetters'>Email</label>
                        <input
                            type = 'text'
                            id = 'email'
                            name = 'email'
                            placeholder = 'fill your email adress'
                            value = {email}
                            onChange = {handleChange}
                        />
                    </div>
                    <div className = 'FormeField flex-colum'>
                        <label htmlFor='passwd' className='whiteLetters'>Password</label>
                        <input
                            type = 'text'
                            id = 'password'
                            name = 'password'
                            placeholder = 'create your password'
                            value = {password}
                            onChange = {handleChange}
                        />
                    </div>
                    <div className= "submitButton">
                        <button id='submit' className ='submit-button whiteLetters'>Sign In</button>
                    </div>
                    {error && 
                        <div style={{color: 'red', marginTop:'20px'}}>
                            {error.email && <div>{error.email}</div>}
                            {error.password && <div>{error.password}</div>}
                            {error.info && <div>{error.info}</div>}
                        </div>
                    }
                    {(verified && loginId && !userId)&&
                        <div className = 'whiteLetters'>
                            <Link to= '/baseq' style= {{color: 'white'}} >Next Step</Link>
                        </div>
                    }
                </form>
            </div>
            </div>
        </div>
        
    )
}

export default SignInRender