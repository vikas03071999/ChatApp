import { doc, onSnapshot } from 'firebase/firestore';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext} from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';
import Profile from '../images/profile.jpg';

const Users = () => {
    const { loggedInUser } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const {dispatch} = useContext(ChatContext);
    useEffect(() => {
        function getUsers() {
            const unsub = onSnapshot(doc(db, "usersChat", loggedInUser.uid), (doc) => {
                setUsers(doc.data());
            })

            return () => {
                unsub();
            }
        }

        loggedInUser.uid && getUsers();

    }, [loggedInUser.uid]);

    const handleSelect = async(selectedUser) =>{
        dispatch({
            type: "CHANGE_USER",
            payload: selectedUser
        })
    }

    return (
        <div className='allUsers'>
            {
                Object.entries(users)?.sort((a,b)=> b[1].date - a[1].date).map((user) => (
                    <div className="user" key={user[0]} onClick={()=>handleSelect(user[1].userInfo)}>
                        <img src={user[1].userInfo.photoURL} alt="" />
                        <div className="rightsec">
                            <span className='name'>{user[1].userInfo.displayName}</span>
                            <span className='msg'>{user[1].lastMessage?.text}</span>
                        </div>
                    </div>
                ))
            }

            {/* <div className="user">
            <img src={Profile} alt="" />
            <div className="rightsec">
                <span className='name'>Vikas</span>
                <span className='msg'>See you</span>
            </div>
        </div>
        <div className="user">
            <img src={Profile} alt="" />
            <div className="rightsec">
                <span className='name'>Vikas</span>
                <span className='msg'>See you</span>
            </div>
        </div>
        <div className="user">
            <img src={Profile} alt="" />
            <div className="rightsec">
                <span className='name'>Vikas</span>
                <span className='msg'>See you</span>
            </div>
        </div> */}
        </div>
    )
}

export default Users
