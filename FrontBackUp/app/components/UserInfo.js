import React from 'react'

function UserInfo(props){
    let user = props.user
    return(
        <div className='flex-center bg-blue'>
            <ul className='flex-colum'>
                <li>{user.name}</li>
                <li>{user.age}</li>
                <li>{user.city}</li>
            </ul>
        </div>
    )
}

export default UserInfo
