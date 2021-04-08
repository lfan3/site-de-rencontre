import React from 'react'
import {HomeHeader} from '../components/HomeHeader'
import {HomeBody} from '../components/HomeBody'



export function Home(){
    return (
        <div style={{marginTop:'4.5em'}}>
            <HomeHeader/>
            <HomeBody/>
        </div>
    )
}