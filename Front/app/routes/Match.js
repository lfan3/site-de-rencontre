import React from 'react'
import _ from 'lodash'
import {PaginationArrow} from '../components/PaginationArrow'
import {DarkHeader} from '../components/DarkHeader'
import {ProfileGrid} from '../components/ProfileGrid'
import '../style/match.css'

const profilesData = [
    {
        imageLink : './public/images/couple.png',
        name : 'Cloe',
        age : '33',
        bio : 'I am cloe'
    },
    {
        imageLink : './public/images/cloe.jpg',
        name : 'Cloe',
        age : '33',
        bio : 'I am cloe'
    },
    {
        imageLink : './public/images/cat.jpg',
        name : 'Cloe',
        age : '33',
        bio : 'I am cloe'
    },
    {
        imageLink : './public/images/cloe.jpg',
        name : 'Cloe',
        age : '33',
        bio : 'I am cloe'
    },
    {
        imageLink : './public/images/bird.png',
        name : 'Cloe',
        age : '33',
        bio : 'I am cloe'
    },
    {
        imageLink : './public/images/cloe.jpg',
        name : 'Cloe',
        age : '33',
        bio : 'I am cloe'
    },
    {
        imageLink : './public/images/cat.jpg',
        name : 'Cloe',
        age : '33',
        bio : 'I am cloe'
    },
]



export class Match extends React.Component{
    state = {
        data : _.slice(profilesData, 0, 3),
        beginIndex:3
    }
    clickHandler = ()=>{
        this.setState((preState)=>({
            data : _.slice(profilesData, preState.beginIndex, preState.beginIndex + 3),
            beginIndex : preState.beginIndex + 3
        }))
    }
    render(){
        return (
            <div>
                {/* <button onClick={()=>this.clickHandler()}>next</button> */}
                <DarkHeader/>
                <div className='profile-main'>
                    <div className='profile-people'>
                        <ProfileGrid  profilesData={this.state.data}/>
                        <PaginationArrow />
                    </div>
                    <div className='profile-filter'>
                        filter
                    </div>
                </div>
  
            </div>
        )
    }
}