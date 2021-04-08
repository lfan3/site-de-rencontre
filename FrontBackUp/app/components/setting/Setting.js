
import React, {useRef} from 'react'
import {Router, Link} from 'react-router-dom'
import './setting.css'
import Section from './Section'
import Form from './Form'
import SideBar from './SideBar'
import Header from '../header/Header'

const Setting = ()=>{
    const loginRef = useRef()
    const emailRef = useRef()
    const dayRef = useRef()
    const monthRef = useRef()
    const yearRef = useRef()
    const cityRef = useRef()
    const passwordRef = useRef()

    const submit = (e)=>{
        e.preventDefault()
        console.log(dayRef.current.value)
        console.log(monthRef.current.value)
    }
    console.log(loginRef)
    return(
        <div className='container-fluid'>
            <div className='row no-padding'>
                <Header/>
            </div>
            <div className='row no-padding'>
                <Section/>
            </div>
            <div className='row top-margin'>
                <div className='col-5'>
                    <SideBar/>
                </div>
                <div className='col-7'>
                    <Form 
                        loginRef={loginRef}
                        emailRef={emailRef}
                        dayRef={dayRef}
                        monthRef={monthRef}
                        yearRef={yearRef}
                        cityRef={cityRef}
                        passwordRef={passwordRef}
                        submit = {submit}
                    />
                   
                </div>
            </div>
        </div>
            

    )
}

export default Setting
/*
     <Form 
                        loginRef={loginRef}
                        submit = {submit}
                        />
*/