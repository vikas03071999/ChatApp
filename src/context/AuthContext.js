import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [loggedInUser, setLoggedInUser] = useState({});

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            setLoggedInUser(user);
        });

        console.log(loggedInUser);

        return ()=>{
            unsubscribe();
        }
    },[]);
    
    return(
        <AuthContext.Provider value={{loggedInUser}}>
            {children}
        </AuthContext.Provider>
    );

}
