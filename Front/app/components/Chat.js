import React, {useState, useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import Info from './Info'
import InputBar from './InputBar'
import Messages from './Messages'
import './Chat.css'

let socket

const Chat = ({location})=>{
    

    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const ENDPOINT = 'http://localhost:5000'

    useEffect(()=>{
        var {name, room} = queryString.parse(location.search)
        //generate an uniq id then send it to the back in the like table(id, onepersonid, anotherpersonid, uniqueid)
        //const options = { transports: ['websocket'] };
        setName(name)
        setRoom(room)
        socket = io(ENDPOINT)
        socket.emit('join', {name, room}, ()=>{
        })
        return()=>{
            socket.emit('disconnect')
            socket.off()
        }
          
    }, [ENDPOINT, location.search])

    useEffect(()=>{
        socket.on('message', (message, cb)=>{
            setMessages([...messages, message])
        })
        //the last argument in userEffect must be const, so []
    }, [messages])
    
    const sendMessage = (e)=>{
        e.preventDefault()
        if(message !== '')
            socket.emit('sendMessage', message, ()=>setMessage(''))
    }
    return(
       <div className='outerContainer'>
           <div className = 'container'>
               <Info room = {room}/>
               <Messages messages = {messages} name = {name}/>
            <InputBar 
                message = {message}
                setMessage = {setMessage}
                sendMessage = {sendMessage}
            />
           </div>
       </div>
    )
}

export default Chat