import React, {useEffect, useState, useRef} from 'react'
import {Route, Link, Redirect} from 'react-router-dom'
import Axios from 'axios'
import {authPost, authGet} from '../../utiles/auth'
import './header.css'

const Header = ({userA})=>{
    const [toggle, setToggle] = useState('hideDropNav')

    const logout = ()=>{
        let param = 'logout'
        let auth = authGet(param)
        //?? forget
        Axios(auth).then((res)=>console.log(res.data))
        localStorage.setItem('userId', undefined)
    }
    const togglefn = ()=>{
        console.log('i am been clicked')
        toggle === 'hideDropNav' 
        ? setToggle('showDropNav')
        : setToggle('hideDropNav')
    }
    return(
        <div className='bg-blue col-md-12 withPadding' style={{height : '50px'}}>
            <ul className='flex-row space-aroud'>
                <Link to = '/main'>
                    <li>Main</li>
                </Link>
                <Link to = '/matched'>
                    <li>Mached</li>
                </Link>
                <Link to = '/matched'>
                    <li>Message</li>
                </Link>
                <li onClick={togglefn}>Me
                    <ul className={toggle}>
                        <Link to={`/main/${userA}`}>
                            <li>Profile</li>
                        </Link>
                        <Link to= {'/setting'}>
                            <li>Setting</li>
                        </Link>
                        <Link to = '/signin'>
                            <li onClick={()=>logout()}>logout</li>
                        </Link>
                    </ul>
                </li>

                
               
            </ul>
        </div>

    )
}
export default Header