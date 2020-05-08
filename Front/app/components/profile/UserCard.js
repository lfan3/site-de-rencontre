import React from 'react'

const UserCard = (props)=>{
    let {name, birthday, city, sex_orient} = props.info
    let birth = new Date(birthday).getTime()
    let now = Date.now()
    let diff = new Date(now - birth)
    let age = (diff.getFullYear() - 1970).toString()
    return(
        <div>
            <ul>
                <li>{name}</li>
                <li>{age}</li>
                <li>{city}</li>
                <li>{sex_orient}</li>
            </ul>
        </div>

    )
}

export default UserCard