import React, {useState, useEffect} from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';

const Message = ({message, name})=>{
    let is_current_user = message.user.trim().toLowerCase() === name ? true : false

    return(
        <div>{message.text} hello </div>
       // is_current_user ? <div>{message.text}</div> :<div>{message.text}</div>
    )

}

const Messages = ({messages, name})=>{
    return(
        <ScrollToBottom>
            {messages.map((message, i)=>(<Message key = {i} message={message} name={name}/>))}
        </ScrollToBottom>
     
    )
 
}

export default Messages