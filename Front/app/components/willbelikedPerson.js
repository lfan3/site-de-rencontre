import React, {useState, useEffect} from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';
import io from 'socket.io-client'

const ENDPOINT = 'http://localhost:5000'


const InfoBar = ({info})=>{
    const {name, room} = info
    console.log('info' + info)
    return(
        <div>
            <p>Welcome {name} enters inside {room}</p>
        </div>
    )
}
const Message = ({message, nameP})=>{
    let {user, text} = message
    console.log(user)
    console.log('inside message')
    let username = user.trim().toLowerCase()
    return(
        nameP === username
        ? <div style={{color : 'blue'}}>{text}</div>
        : <div style={{color : 'red'}}>{text}</div>
    )
}
const Messages = ({messages, nameP})=>{
    console.log('in the Messages')
    console.log(messages)

    return(
        <div style={{height : "200px"}}>
        <ScrollToBottom >
            <div>{JSON.stringify(messages)}</div>
        </ScrollToBottom>
        </div>
   )
}

const InputBar = ({message, setMessage})=>{
  
    const changeHander = (e)=>{
        setMessage(e.target.value)
    }
    const keyHandler = (e)=>{
        if(e.key === 'Enter'){
            socket.emit('sendMessage', message)
            setMessage('')
        }
    }
    const sendMessage = (e)=>{
        e.preventDefault()
        socket.emit('sendMessage', message)
        setMessage('')
    }
    return(
        <div>
            <input type='text' 
                value={message}
                onChange = {changeHander}
                onKeyPress = {keyHandler}
            />
            <button onClick={sendMessage}>
                Send Message
            </button>
        </div>
    )
}


//click like and then send room to database
//show chat componnet, the begin chat should like inside the chat compoenent
const Toto = ()=>{
    
    const nameP= 'toto'
    const name = 'lulu'
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [start, setStart] = useState(false)
    const room = 'abc'
    let socket = io(ENDPOINT)

    const startChat = (e)=>{
        e.preventDefault()
        socket.emit('join', {name, room})
    }
    useEffect(()=>{
        socket.on('message', (message)=>{
            setMessages([...messages, message])
        })
    }, [messages])

  console.log(messages)
  if(messages.length !== 0){
    messages.map((message)=>console.log(message.user))

  }
    return(
        <div> 
            <p>
            i am toto,
            i will be liked by lulu
            </p>
                <div>
             
                <div>
                {messages.length !== 0 &&
                <Messages 
                    messages = {messages}
                    nameP = {nameP}/>
                }
                <InputBar
                    message = {message}
                    setMessage = {setMessage}
                    setMessages = {setMessages}/>
                </div>
               </div>
            
        </div>
    )
}



export default Toto