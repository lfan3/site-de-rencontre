import React, {useEffect, useState} from 'react'
import {Route} from 'react-router-dom'
import Axios from 'axios'
import {authPost, authGet} from '../utiles/auth'
import TagsCard from '../components/profile/TagsCard'
import UserDes from '../components/profile/UserDes'
import Upsider from '../components/profile/Upsider'
import Chatbox from '../components/chat/Chatbox'
import Header from '../components/header/Header'
import '../components/chat/chatbox.css'
//user hook in this component

const SimpleDiv =  ()=>{
    return(
        <div style={{border : '5px yellow solid'}}>I am a simple dive</div>
    )
}
const userA = localStorage.getItem('userId')
const Profile = ({match})=>{ 
    const userId = match.params.userId
    const [userInfo, setUserInfo] = useState({})
    //pp profile photo
    const [pp, setpp] = useState('')
    const [tags, setTags] = useState([])
    const [des, setDes] = useState('')
    const [load, setLoad] = useState(true)
    const [mutual, setMutual] = useState({mutual : false, room: null})
    const [error, setError] = useState('')
    const [like, setLike] = useState(false)
    const name = userInfo.name
    const [show, setShow] = useState(false)
    useEffect(()=>{
        postDatas().then((values)=>{
            setUserInfo(values[0])
            setTags(values[1])
            setpp(values[2])
            setDes(values[3])
            setMutual(values[4])
            setLoad(false)
        }).catch((e)=>setError(e))
    }, [userId])
    const likeClickHandler = ()=>{
        addData().then((res)=>{
            let data = res.data
            if(data === 'one'){
                setLike(true)
            }
            else if(data ==='two')
                setMutual(true)
        })
    }
    const unmatchClickHandler = ()=>{
        console.log('unmacht clicked')
        removeLike().then((res)=>{
            console.log('remove' + res)
            if(res.data === true)
                setMutual(false)
        })   
    }
    const postDatas = async()=>{
        let param = `profile/${userId}`
        let data = {userA}
        let auth = authPost(param, data)
        let res = await Axios(auth)
        return res.data
    }
    const addData = async()=>{
        let param = `addlike`
        let data = {userA, userB : userId}
        let auth = authPost(param, data)
        let res = await Axios(auth)
        return res
    }
    const removeLike = async()=>{
        let param = 'removelike'
        let data = {userA, userB : userId}
        let auth = authPost(param, data)
        let res = await Axios(auth)
        return res
    }    
    const showChatbox = ()=>{
        setShow(true)
    }

    return(
        <div className = 'bg-gray container-fluid'>
            {load
            ? <div className='row'>
                <div className='col-12'>
                    Loading ... 
                </div>
            </div>
            : <div className='row'>
                <div className='col-12'>
                    <div className='row'>
                        <div className='col-12'>
                            <Header userA={userA}/>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <Upsider 
                                {...match}
                                photo={pp} 
                                userInfo={userInfo}
                                likeClickHandler = {likeClickHandler}
                                mutual = {mutual}
                                unmatchClickHandler = {unmatchClickHandler}
                                like = {like}
                                name={name}
                                userA = {userA}
                                userB = {userId}
                                showChatbox = {showChatbox}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <UserDes des = {des}/>
                        </div>
                    </div>
                    <div className='row col-12'>
                        <div className='col-12'>
                            <TagsCard tags = {tags}/>
                        </div>
                    </div>
                    {show&&
                    <div className = 'chatPosition col-4 offset-6' style={{marginRight : '10px'}}>
                            <Chatbox 
                                location = {location}
                                userA={userA} 
                                name={name}
                                room={mutual.room}
                            />
                    </div>
                    }
                    {/*
                    <Route 
                        path={`/main/:userId/chat`}
                        render ={({location})=>(
                        <div className = 'chatPosition col-4 offset-6' style={{marginRight : '10px'}}>
                            <Chatbox location = {location} userA={userA}/>
                         </div>
                        )}
                    />
                        */}
 
                </div>
             </div>
        }
           
        </div>
    )
}

export default Profile