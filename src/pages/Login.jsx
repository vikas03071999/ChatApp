import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react'
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Login() {
  const [err,setErr] = useState(false);
  const [btnDisable,setBtnDisable] = useState(false);
  const navigate = useNavigate();
  async function handleLogin(e){
    setBtnDisable(!btnDisable);
    e.preventDefault();

    const userEmail = e.target[0].value;
    const userPassword = e.target[1].value;
    try{
      const signInResponse = await signInWithEmailAndPassword(auth,userEmail,userPassword);
      console.log("Signed in user details:");
      console.log(signInResponse.user);
      setBtnDisable(!btnDisable)
      navigate("/");
    } catch(err){
      setErr(true);
      console.log("Error while signing in");
    }
  }
  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <span className="logo">Chat application</span>
        <span className="regTitle">Login</span>
        {err ? <span style={{color:"red"}}>Invalid email or password !!</span>: ""}
        <form autoComplete='off' onSubmit={handleLogin}>
            <input type="email" placeholder="Enter email address" onChange={()=>{setBtnDisable(false);setErr(false)}}/>
            <input type="password" placeholder="Enter password" onChange={()=>{setBtnDisable(false);setErr(false)}}/>
            <button disabled={btnDisable} style={{cursor:`${btnDisable}?"not-allowed":"allowed"`}}>Login</button>
        </form>
        <span className='formBottom'>Don't have an acount yet? <Link to="/Register" style={{textDecoration:"none"}}>Register</Link></span>
      </div>
    </div>
  )
}
