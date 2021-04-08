import React, {useEffect} from 'react'
import {Link, Route} from 'react-router-dom'

const NormalBtns = ({likeClickHandler, likeText})=>{
    return(
    <div>
    <button type="button" onClick={likeClickHandler} className="btn btn-lg btn-success">{likeText}</button>
    <Link to = '/main'>
        <button type="button" className="btn btn-lg btn-danger">Pass</button>
    </Link>
    </div>
    )
}
const MutualLikeBtns = ({unmatchClickHandler, showChatbox, url,name,room})=>{
    return(
    <div>
        <button type="button" onClick={unmatchClickHandler} className="btn btn-lg btn-success">unmacht</button>
        <button 
            type="button" 
            className="btn btn-lg btn-warning"
            onClick={showChatbox}
        >Message</button>
        {/*
        <Link to={`${url}/chat?name=${name}&room=${room}`}>
        </Link>*/
        }
        <Link to = '/main'>
            <button type="button" className="btn btn-lg btn-danger">Back</button>
        </Link>
    </div>
    )
}
const Buttons = (props)=>{
    let {userA, userB, likeClickHandler, showChatbox, name, mutual, unmatchClickHandler, like, url} = props.props
    /* interesting bug, must get all the data/api from the parent elements
        const getDatas = async()=>{
            let param = `profile/${userB}`
            let auth = authGet(param)
            let res = await Axios(auth)
            return res.data
    }*/
    const likeText = like ? 'liked' : 'like'
    const room = mutual.room
    return(
        <div className='bg-gray'>
            {(userB === userA) 
            ? null 
            :(
                mutual === false 
                ? <NormalBtns likeClickHandler={likeClickHandler} likeText={likeText}/>
                : <MutualLikeBtns 
                    unmatchClickHandler={unmatchClickHandler}
                    url={url}
                    name ={name}
                    room={room}
                    showChatbox = {showChatbox}
                    />
            )
            }
        </div>
    )
}


export default Buttons