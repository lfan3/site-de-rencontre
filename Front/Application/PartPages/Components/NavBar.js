import {Switch, NavLink, Link, Route} from 'react-router-dom'
import React, { Component } from 'react';

const activeStyle = {
    backgroundColor : '#66dac7'
}

export default function NavBar(){
    return(
        <nav className='signNav flex-row space-end'>
        <ul className='flex-row space-around round-corner sign-ul'>
            <li>
                <NavLink to='/' exact activeStyle = {activeStyle} className='bg-light-gray whiteLetters flex-iterms signup'>
                    Sign Up
                </NavLink>
            </li>
            <li>
                <NavLink to ='/login' activeStyle = {activeStyle} className='bg-light-gray whiteLetters flex-iterms signin'>
                    Sign In
                </NavLink>
            </li>
        </ul>
        </nav>
    )
}
