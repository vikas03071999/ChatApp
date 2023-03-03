import { doc, onSnapshot } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import { db } from '../firebase'
import Message from './Message'
import WriteMessage from './WriteMessage'

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
  console.log(messages);

  return (
    <div className='messages'>
      {
        chatToUser.chatId === "null" && <span className='noUserSelectedToChatView'>Click on the user to see or start a conversation</span>
      }
      {
        chatToUser.chatId !== "null" && messages.map(msg=>(
          <Message attachedFile={msg.attachedFile} message={msg.message} senderId={msg.senderId} date={msg.date} key={msg.id} />
        ))
      }
      {/* {
        chatToUser.chatId !== "null" && <WriteMessage />
      } */}
    </div>
  )
}

export default Messages
