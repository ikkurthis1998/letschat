import { createContext, useState } from "react";


export const ChatFormContext = createContext();

const ChatFormContextProvider = (props) => {

    const [chatForm, setChatForm] = useState(false);

    return ( 
        <ChatFormContext.Provider value={{chatForm, setChatForm}}>
            {props.children}
        </ChatFormContext.Provider>
    );
}
 
export default ChatFormContextProvider;