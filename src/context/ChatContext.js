import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({children}) => {
    const { loggedInUser } = useContext(AuthContext);
    const INITIAL_STATE = {
        chatId: "null",
        user: {}
    }

    const chatReducer = (state,action) => {
        switch(action.type){
            case "CHANGE_USER": {
                return {
                    user: action.payload,
                    chatId: loggedInUser.uid > action.payload.uid ?
                            loggedInUser.uid + action.payload.uid :
                            action.payload.uid + loggedInUser.uid
                }
            }
            default:
                return state
        }
    }

    const [state,dispatch] = useReducer(chatReducer,INITIAL_STATE);
    return (
        <ChatContext.Provider value={ {chatToUser:state, dispatch} } >
            {children}
        </ChatContext.Provider>
    );
}

