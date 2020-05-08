import React from 'react';

const SignUpRender = (props)=>{
    let {handleSubmit, username, handleChange, error, email, passwd, confPasswd} = props
    
    return(
    <div className = 'FormContainer'>
                <form className = 'FormeFields' onSubmit = {handleSubmit}>
                    <div className = 'FormeField flex-colum'>
                        <label htmlFor='username' className='whiteLetters'>Username</label>
                        <input
                            type = 'text'
                            id = 'username'
                            name = 'username'
                            placeholder = 'create your username'
                            //very react way to handle the formulaire
                            value = {username}
                            onChange = {handleChange}
                        />
                        {error.username.length > 0 && <span style = {{color : "red"}}> {error.username} </span>}
                    </div>
                    <div className = 'FormeField flex-colum'>
                        <label htmlFor='email' className='whiteLetters' >Email</label>
                        <input
                            type = 'text'
                            id = 'email'
                            name = 'email'
                            placeholder = 'fill your email adress'
                            //very react way to handle the formulaire
                            value = {email}
                            onChange = {handleChange}
                        />
                        {error.email.length > 0 && <span style = {{color : "red"}}> {error.email} </span>}

                    </div>
                    <div className = 'FormeField flex-colum'>
                        <label htmlFor='passwd' className='whiteLetters'>Password</label>
                        <input
                            type = 'text'
                            id = 'passwd'
                            name = 'passwd'
                            placeholder = 'create your password'
                            //very react way to handle the formulaire
                            value = {passwd}
                            onChange = {handleChange}
                        />
                        {error.passwd.length > 0 && <span style = {{color : "red"}}> {error.passwd} </span>}
                    </div>
                    <div className = 'FormeField flex-colum'>
                        <label htmlFor='confPasswd' className='whiteLetters'>Confirme your password</label>
                        <input
                            type = 'text'
                            id = 'confPasswd'
                            name = 'confPasswd'
                            placeholder = 'create your username'
                            //very react way to handle the formulaire
                            value = {confPasswd}
                            onChange = {handleChange}
                        />
                        {error.confPasswd.length > 0 && <span style = {{color : "red"}}> {error.confPasswd} </span>}
                    </div>
                    <div className= "submitButton"> 
                        <button id='submit' className ='submit-button whiteLetters'>
                           Sign Up
                        </button>
                    </div>
                </form>
            </div>
    )
}

export default SignUpRender