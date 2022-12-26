import React from 'react'
import { useState, useContext } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import Users from './Users';
import Profile from '../images/profile.jpg';
import { AuthContext } from '../context/AuthContext';
import { getDoc, serverTimestamp, setDoc, updateDoc, doc } from 'firebase/firestore';


const Search = () => {
  const [searchUser, setSearchUser] = useState("");
  const [newfriend, setNewFriend] = useState(null);
  const [err, setErr] = useState(false);
  const {loggedInUser} = useContext(AuthContext);

  async function actualSearch() {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", searchUser)
    )
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setNewFriend(doc.data());
        console.log(doc.data());
      })
    } catch (err) {
      setErr(true);
    }
  }

  function handleUserSearch(e) {
    e.code === "Enter" && actualSearch()
  }

  const handleConnection = async() => {
    /* CASE 1 : Users are chatting for the first time 
            make the entry in userChats of loggedInUser collection with userToChat info 
        */
    // Create a unique id by combining both users id so that it
    // is convenient to fetch the chats between them 
    const combinedId = loggedInUser.uid > newfriend.uid ?
      loggedInUser.uid + newfriend.uid :
      newfriend.uid + loggedInUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        // create a chat between the users with their combined id
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "usersChat", loggedInUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: newfriend.uid,
            displayName: newfriend.displayName,
            photoURL: newfriend.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        })

        await updateDoc(doc(db, "usersChat", newfriend.uid), {
          [combinedId + ".userInfo"]: {
            uid: loggedInUser.uid,
            displayName: loggedInUser.displayName,
            photoURL: loggedInUser.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        })
      }
      setSearchUser("");
      setNewFriend(null);
    } catch (err) {
      console.log(err.message);
    }

  }
  return (
    <div className='searchAndResultContainer'>
      <div className='search'>
        <input type="text" placeholder='Find a user' onKeyDown={handleUserSearch}
          onChange={(e) => setSearchUser(e.target.value)} value={searchUser} />
      </div>
      {newfriend && (<div className="user" onClick={handleConnection}>
        <img src={newfriend.photoURL} alt="" />
        <div className="rightsec">
          <span className='name'>{newfriend.displayName}</span>
        </div>
      </div>)}
      {/* {newfriend !== null && newfriend !== undefined ? <Users userDetails={newfriend} /> : ""} */}
    </div>
  )
}

export default Search
