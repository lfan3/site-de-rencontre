import React, {useRef} from 'react'
import {Router, Link} from 'react-router-dom'
import './setting.css'


const SideBar = ()=>{
    return(
        <div>
            <ul>
                <Link to='./setting'>
                    <li>My Account</li>
                </Link>
                <Link to='./photos'>
                    <li>My Photos</li>
                </Link>
            </ul>
        </div>
    )
}

export default SideBar