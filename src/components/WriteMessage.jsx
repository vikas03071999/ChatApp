import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { ChatContext } from '../context/ChatContext'
import AttachSymbol from '../images/attach.png'
import ImageAttachSynbol from '../images/img.png'
import {v4 as uuid} from "uuid"
import { AuthContext } from '../context/AuthContext'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../firebase'

const WriteMessage = () => {
  const [text, setText] = useState("");
  const [btnDisable,setBtnDisable] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const { chatToUser } = useContext(ChatContext);
  const { loggedInUser } = useContext(AuthContext);

   
  const handleSend = async() => {
      setBtnDisable(true);
      setText("");
      if(attachment){
        const storageRef = ref(storage,uuid());

        const uploadTask = uploadBytesResumable(storageRef,attachment);

        uploadTask.on(
          (error) => {

          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{
              await updateDoc(doc(db,"chats",chatToUser.chatId),{
                messages: arrayUnion({
                  id: uuid(),
                  message: text,
                  senderId: loggedInUser.uid,
                  date: Timestamp.now(),
                  attachedFile: downloadURL
                })
              })
              
            })
          }
        )
      } else{
        await updateDoc(doc(db,"chats",chatToUser.chatId),{
          messages: arrayUnion({
            id: uuid(),
            message: text,
            senderId: loggedInUser.uid,
            date: Timestamp.now()
          })
        })
      }
      
      await updateDoc(doc(db,"usersChat",loggedInUser.uid),{
        [chatToUser.chatId+".lastMessage"] : {
          text
        },
        [chatToUser.chatId+".date"]: serverTimestamp()
      })

      await updateDoc(doc(db,"usersChat",chatToUser.user.uid),{
        [chatToUser.chatId+".lastMessage"] : {
          text
        },
        [chatToUser.chatId+".date"]: serverTimestamp()
      })

      
      setBtnDisable(false);
      setAttachment(null);

  }
  return (
    <div className='writeMessage'>
      <input type="text" placeholder='Write a message here ...' onChange={e=>setText(e.target.value)} value={text}/>
      <div className='send'>
        <img src={AttachSymbol} alt="" />
        <input type="file" id="file" style={{display:"none"}} onChange={e=>setAttachment(e.target.files[0])}/>
        <label htmlFor="file">
            <img src={ImageAttachSynbol} alt="" />
        </label>
        <button onClick={handleSend} disabled={btnDisable} style={{cursor:`${btnDisable}?"not-allowed":"allowed"`}}>Send</button>
      </div>
    </div>
  )
}

export default WriteMessage
