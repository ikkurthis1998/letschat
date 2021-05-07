import { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../contexts/ChatContext';
import { ChatFormContext } from '../contexts/ChatFormContext';
import { ScreenContext } from '../contexts/ScreenContext';
import { db } from '../firebase_config';
import './AllChats.css'

const AllChats = () => {

    const { screenWidth } = useContext(ScreenContext);
    const { setChatForm } = useContext(ChatFormContext);
    const { setChat, setChatId } = useContext(ChatContext);

    const [allchats, setAllChats] = useState(null);

    const createChatBox = () => {
        setChatForm(true);
    }

    useEffect(() => {
        const unsub = db.collection('chats').orderBy("updatedAt", "desc").onSnapshot((snap) => {
            setAllChats(snap.docs);
        });
        return () => unsub();
    }, [])

    const openChat = (chat) => {
        setChatId(chat.id);
        setChat(true);
    }

    return ( 
        <div className={screenWidth > 1023 ? "allchats-container" : "allchats-container-small"}>
            <div className="plus-button-container">
                <button className="plus-button" onClick={() => createChatBox()}>+</button>
            </div>
            <div className="chatbox-list-container">
                {allchats && allchats.map((chat) => {
                    return(
                        <div key={chat.id} className="chat-container" onClick={() => openChat(chat)}>
                            <div className="chat-image-container">
                                <img src={chat.data().photoURL ? chat.data().photoURL : "https://firebasestorage.googleapis.com/v0/b/letschat-reactwithfirebase.appspot.com/o/group%20icon.png?alt=media&token=8207acf0-4bc0-4614-8916-7fc517b7cf4d"} alt='alt-pic' className="chat-image" />
                            </div>
                            <div className="chat-name-container">
                                <p className="chat-name" style={{color: "white"}}>{chat.data().name}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div> 
    );
}
 
export default AllChats;