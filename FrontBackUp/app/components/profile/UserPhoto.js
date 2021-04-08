import React from 'react'

const UserPhoto = (props)=>{
    let photo = props.photo[0]
    return(
        <div>
            <img src={photo.photo_path} alt='profile_image'/>
        </div>
    )
}

export default UserPhoto