import React from 'react'
import Add from "../images/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc} from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

export default function Register() {

  const navigate = useNavigate();
  const [btnDisable,setBtnDisable] = useState(false);


  const handleSubmit = async (e) => {
    setBtnDisable(!btnDisable);
    e.preventDefault();
    const displayName = e.target[0].value;
    const userEmail = e.target[1].value;
    const userPassword = e.target[2].value;
    const userFile = e.target[3].files[0];  // This will only take on image/file

    // Now that we have got the data we need to create a user in the firebase sever

    // const auth = getAuth(app);
    const addedUser = await createUserWithEmailAndPassword(auth, userEmail, userPassword);
    const storageRef = ref(storage, displayName);

    const uploadTask = uploadBytesResumable(storageRef, userFile);
    uploadTask.on(
      (error) => {
        alert("Error in uploading profile picture");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
          await updateProfile(addedUser.user, {
            displayName,
            photoURL: downloadURL
          })
          await setDoc(doc(db, "users",addedUser.user.uid),{
            uid : addedUser.user.uid,
            displayName,
            userEmail,
            photoURL: downloadURL
          })

          await setDoc(doc(db,"usersChat",addedUser.user.uid),{});

          setBtnDisable(!btnDisable);
          navigate("/login");
        });
      }
    );
  }
  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <span className="logo">Chat application</span>
        <span className="regTitle">Register</span>
        <form autoComplete='off' onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter display name" />
          <input type="email" placeholder="Enter email address" />
          <input type="password" placeholder="Enter password" />
          <input type="file" id='img' style={{ display: "none" }} />
          <label htmlFor='img' style={{cursor:"pointer"}}>
            <img src={Add} alt="avatar" />
            <span className='avaDesc'>Add a display picture</span>
          </label>
          <button disabled={btnDisable} style={{cursor:btnDisable?"not-allowed":"allowed"}}>Sign up</button>
        </form>
        <span className='formBottom'>Already registered? <Link to="/login" style={{textDecoration:"none"}}>Login</Link></span>
      </div>
    </div>
  )
}
