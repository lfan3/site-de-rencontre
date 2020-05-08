import React, {useEffect, useState} from 'react'
import ProfilesGrid from '../components/ProfilesGrid'
import {Route} from 'react-router-dom'
import Axios from 'axios'
import {authPost, authGet} from '../utiles/auth'

let userA = localStorage.getItem('userId')

const Matched = ()=>{
    const [matched, setMatched] = useState([])
    const [empty, setEmpty] = useState('')
    const [load, setLoad] = useState(true)

    useEffect(()=>{
        //??useful?
        setEmpty('')
        postData().then((data)=>{
            if(data){
                let users = data
                setMatched([...matched, data])
                console.log(users)
            }else{
                setEmpty('no matched yet')
                console.log('no matched yet')
            }
            setLoad(false)
        })
    },[matched])

    const postData = async()=>{
        let param = `matched/${userA}`
        let auth = authGet(param)
        let res = await Axios(auth)
        return res.data
    }
    return(
        <ProfilesGrid />
    )
}
/*
const ProfilesGrid = ({users, loading, url})=>{
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
*/
export default Matched