import React, { useContext } from 'react';
import { auth } from '../firebase';
import Profile from '../images/profile.jpg'
import { signOut } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';
const Navbar = () => {
  
  const {loggedInUser} = useContext(AuthContext);
  return (
    <div className='navbar'>
      <span className="logo">Chat app</span>
      <div className="rightnavarea">
        <img src={loggedInUser.photoURL} alt="" />
        <span className="name">{loggedInUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar
