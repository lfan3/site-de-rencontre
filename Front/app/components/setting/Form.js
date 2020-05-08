import React, {useRef} from 'react'
//import BirthdayForm from './BirthdayForm'
import './setting.css'
import Birthday from './BirthdayForm'



const Form = (props)=>{
    const {loginRef,emailRef,dayRef,monthRef,yearRef,cityRef,passwordRef, submit}= props
    return(
        <form>
            <div className='form-group'>
                <label> Username
                    <input type='text' className='form-control' id='username' ref={loginRef}/>
                </label>
            </div>
            <div className='form-group'>
                <label> Email
                    <input type='text' className='form-control' id='' ref={emailRef}/>
                </label>
            </div>
            <Birthday dayRef={dayRef} monthRef = {monthRef} yearRef={yearRef}/>
            <div className='form-group'>
                <label> City
                    <input type='text' className='form-control' id='' ref={cityRef}/>
                </label>
            </div>
            <div className='form-group'>
                <label> Password
                    <input type='text' className='form-control' id='' ref={passwordRef}/>
                </label>
            </div>
           
            <button typ='submit' className='btn bg-blue' onClick={submit}>Submit</button>
        </form>
    )
}

export default Form