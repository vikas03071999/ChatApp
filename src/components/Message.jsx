import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Message = ({message,senderId,date,attachedFile}) => {
  const { loggedInUser } = useContext(AuthContext);
  const { chatToUser } = useContext(ChatContext);
  const ref = useRef();

  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:"smooth"})
  },[message]);
  return (
    <div ref={ref} className={`message ${senderId=== loggedInUser.uid && "own"}`}>
      <div className="messageInfo">
        <img src={senderId === loggedInUser.uid ? loggedInUser.photoURL : chatToUser.user.photoURL } alt="" />
        <span>Just now</span>
      </div>
      <div className="messageContent">
        {message && <p>{message}</p>}
        {attachedFile  && <img src={attachedFile} alt="" />}
      </div>
    </div>
  )
}

export default Message
