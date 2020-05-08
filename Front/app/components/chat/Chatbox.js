import React, {useEffect, useState}from 'react'
import {Route} from 'react-router-dom'
import queryString from 'query-string'
import {API_URL} from '../../config'
import io from 'socket.io-client'
import './chatbox.css'
import { ENETUNREACH } from 'constants'


//wen we click on messagebtn, show the chatbox
//if messagebtn is click, show this component 
//in profile page.
/*utility functions*/

const userA = localStorage.getItem('userId')

const ChatHead = (props)=>{
    let leaveChat = props.leaveChat
    return(
        <div className='row'>
            <div className='col-6'>
                {props.name}
            </div>
            <div 
                className='col-1 offset-col-11 close-cross'
                onClick={leaveChat}>
                x
            </div>
        </div>
    )
}

const ChatBody = (props)=>{
    const messages = props.messages
    const multipleLines = ()=>{

    }
    return(
        <div>
            {
                messages.map((each, index)=>{
                    console.log(each, userA)
                    
                    return(
                        <div key={index} className='row'>
                        {each.userA === userA 
                        ?<div className='col-sm-10 offset-sm-2 messages-right' style={{backgroundColor: 'yellow'}}>{each.txt}</div>
                        : <div className='col-sm-10  messages-left bg-blue' >{each.txt}</div>
                        }  
                        </div>
                        )
                })
            }
        </div>
    )
}
const ChatInput = (props)=>{
    let sendMessage = props.sendMessage
    let setMessage = props.setMessage
   // console.log(props)
    let message = props.message
    const changeHandler = (e)=>{
        let txt = e.target.value
        setMessage(txt)
    }
    return(
        <div className='row'>
            <div className='col-12 no-padding'>
                <textarea 
                    className='txt-area'
                    placeholder='press Enter to send message' 
                    type='text' 
                    onKeyPress={e =>e.key === 'Enter' && sendMessage(e)} 
                    value={message} 
                    onChange={changeHandler}
                />
            </div>
            {/*
   <div className='col-2 no-padding'>
   <button onClick={sendMessage}>send</button>
</div>*/
            }
         
        </div>
    )
}
let socket

const Chatbox = ({location, name, room})=>{
    //props === location from route
    //comment quitter la chat pour socket emit disconenct?
    //console.log(location)
    //let search = location.search
    //let {name, room} = queryString.parse(search)
   console.log('room', room)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    //connection to socket and create the new user
    useEffect(()=>{
        socket = io(API_URL)
        socket.emit('joint', {userA, name, room})
        return()=>{
            socket.emit('disconnect')
            socket.off()
        }
    },[API_URL, location.search])
    //update the messages
    useEffect(()=>{
        socket.on('message', (message, cb)=>{
            //console.log('inside the useEffect mesage')
            //console.log(message)
            setMessages([...messages, message])
        })
    }, [messages])
    //console.log(messages)
    const sendMessage = ((e)=>{
        e.preventDefault()
        console.log('i am inside')
        socket.emit('sendMessage', message, ()=>{
            setMessage('')})
    })
    const leaveChat = ()=>{
        socket.emit('disconnect')
    }
    
    return(
        <div className='container-fluid no-padding'>
            <div className='row h-100'>
                <div className = 'col-12'>
                    <div className = 'row h-10 bg-blue'>
                        <div className = 'col-12'>
                            <ChatHead name={name}/>
                        </div>
                    </div>
                    <div className = 'row h-70'>
                        <div className='col-12'>
                            <ChatBody messages = {messages}/>
                        </div>
                    </div>
                    <div className = 'row h-20 no-padding'>
                        <div className = 'col-12'>
                            <ChatInput 
                            message = {message} 
                            setMessage = {setMessage}
                            sendMessage={sendMessage}
                            />
                        </div>
                    </div>
               
                </div>
            </div>
        </div>
    )
}

export default Chatbox