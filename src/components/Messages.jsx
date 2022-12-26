import { doc, onSnapshot } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase'
import Message from './Message'

const Messages = () => {
  const [messages,setMessages] = useState([]);
  const { chatToUser } = useContext(ChatContext);
  useEffect(()=>{
    const unsub = onSnapshot(doc(db,"chats",chatToUser.chatId),(doc)=>{
      doc.exists() && setMessages(doc.data().messages);
    })

    return () => {
      unsub();
    }
  },[chatToUser.chatId]);
  console.log("INSIDE MESSAES COMPONENT");
  console.log(messages);

  return (
    <div className='messages'>
      {
        messages.map(msg=>(
          <Message attachedFile={msg.attachedFile} message={msg.message} senderId={msg.senderId} date={msg.date} key={msg.id} />
        ))
      }
    </div>
  )
}

export default Messages
