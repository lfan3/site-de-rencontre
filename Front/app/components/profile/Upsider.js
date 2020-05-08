import React from 'react'
import UserPhoto from './UserPhoto'
import UserCard from './UserCard'
import Buttons from './Buttons'

const style = {
    border : '2px yellow solid',
    color: 'white'
}
/*
<Buttons 
likeClickHandler={likeClickHandler} 
mutual = {mutual} 
unmatchClickHandler={unmatchClickHandler}
like = {like}
name = {name}/>
*/
const Upsider = (props)=>{
    //let {photo, userInfo, likeClickHandler, mutual, like,unmatchClickHandler} = props
    let {photo, userInfo} = props
    let name = userInfo.name
    return(
        <div style={style} className='flex-row'>
            <UserPhoto photo={photo}/>
            <UserCard info = {userInfo}/>
            <Buttons props = {{...props}}/>

        </div>
    )
}

export default Upsider