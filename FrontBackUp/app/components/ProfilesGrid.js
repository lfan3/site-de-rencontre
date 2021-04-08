import React from 'react'
import {Link} from 'react-router-dom'
import UserInfo from './UserInfo'

const ProfilesGrid = ({users, loading, url})=>{
    console.log(users, 'inside profileGrid')
    return(
       
    <div className='flex-center main-container bg-gray'>
        <ul className='grid space-around bg-gray'>
            {!loading && users.map((user, index)=>{
                return(
                <li key={index} className='grid-li'>
                    <Link to = {`${url}/${user.otherId}`} style = {{color : 'black'}}>
                    <img className='image-grid' src = {user.photo_path}/>
                    <UserInfo user = {user}/>
                    </Link>
                </li>
            )})}
        </ul>
    </div>
    )
}

export default ProfilesGrid