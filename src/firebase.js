// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8xnD_e3mp1SfEyY3pGVzAdFWmQOif5W8",
  authDomain: "firstchatapplication-35a52.firebaseapp.com",
  projectId: "firstchatapplication-35a52",
  storageBucket: "firstchatapplication-35a52.appspot.com",
  messagingSenderId: "602470583092",
  appId: "1:602470583092:web:132fb446caed9b5f59f361",
  measurementId: "G-SSTBW59FTZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();