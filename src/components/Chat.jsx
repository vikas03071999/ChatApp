import React from 'react'
import VideoIcon from '../images/cam.png'
import AddFriendIcon from '../images/add.png'
import MoreIcon from '../images/more.png'
import Messages from './Messages'
import WriteMessage from './WriteMessage'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'


const Chat = () => {

  const { chatToUser } = useContext(ChatContext);
  console.log(chatToUser);


  return (
    <div className='chat'>
      <div className="chatTopbar">
        <span>{chatToUser.user.displayName}</span>
        <div className="chatIcons">
          <img src={VideoIcon} alt="" />
          <img src={AddFriendIcon} alt="" />
          <img src={MoreIcon} alt="" />
        </div>
      </div>
      <Messages />
      <WriteMessage />
    </div>
  )
}

export default Chat
