import { createContext, useState } from "react";


export const ChatContext = createContext();

const ChatContextProvider = (props) => {

    const [chat, setChat] = useState(false);
    const [chatId, setChatId] = useState(null);
    const [chatChanges, setChatChanges] = useState(null);

    return ( 
        <ChatContext.Provider value={{chat, setChat, chatId, setChatId, chatChanges, setChatChanges}}>
            {props.children}
        </ChatContext.Provider>
    );
}
 
export default ChatContextProvider;