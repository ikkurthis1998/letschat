import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ChatContext } from '../contexts/ChatContext';
import { ChatFormContext } from '../contexts/ChatFormContext';
import { ScreenContext } from '../contexts/ScreenContext';
import { db } from '../firebase_config';
import './ChatBox.css';

const ChatBox = () => {

    const { setChatId, chatId, setChat, setChatChanges } = useContext(ChatContext);

    const [chatDetails, setChatDetails] = useState(null);

    const [message, setMessage] = useState(null);

    const [chatMessages, setChatMessages] = useState(null);

    const { screenWidth } = useContext(ScreenContext);

    const { setChatForm } = useContext(ChatFormContext);

    const { authState } = useContext(AuthContext);
    
    useEffect(() => {
        const unsub = db.collection('chats').doc(chatId).onSnapshot((snap) => {
            // console.log(snap.data())
            setChatDetails(snap);
        });
        const unsubagain = db.collection('chats').doc(chatId).collection('messages').orderBy("createdAt", "asc").onSnapshot((snap) => {
            setChatMessages(snap.docs);
        })
        return () => {unsub(); unsubagain()}
    }, [chatId])

    const sendMessage = (e) => {
        setMessage(null);
        e.preventDefault();
        db.collection('chats').doc(chatId).collection('messages').add({
            message: message,
            createdAt: new Date().toLocaleString(),
            sentBy: authState.uid,
            photoURL: authState.photoURL
        }).catch((error) => {
            alert(error.message)
        });
        db.collection('chats').doc(chatId).set({
            updatedAt: new Date().toLocaleString()
        }, { merge: true });
    }

    useEffect(() => {
        const scroll = document.querySelector(".scroll-to-view");
        scroll.scrollIntoView()
    })

    // console.log(chatId)
    return ( 
        <div className='chatbox-container'>
            <div className='title-container'>
                {screenWidth < 1023 &&  <div className="back-to-allchats" onClick={() => {setChat(false); setChatId(null)}}>
                                            {"<"}
                                        </div>
                }
                <div className='chat-photo-container' onClick={() => {setChatChanges(chatDetails);setChatForm(true)}}>
                    {chatDetails && <img alt='chat-pic' className='chat-pic' src={chatDetails.data().photoURL} />}
                </div>
                <div className='title-input-container'>
                    {chatDetails && <p>{chatDetails.data().name}</p> }
                </div>
            </div>
            <div className="chat-area">
                <div className='chat-space'>
                    <div className="dummy-message"></div>
                    {chatMessages && chatMessages.map((message) => {
                        var lastUpdated = '';
                        if((new Date() - new Date(message.data().createdAt))/1000 < 60) {
                            lastUpdated = ((new Date() - new Date(message.data().createdAt))/1000).toFixed() + ' seconds ago';
                        } else if((new Date() - new Date(message.data().createdAt))/1000 > 60 && (new Date() - new Date(message.data().createdAt))/1000 < 60*60) {
                            lastUpdated = ((new Date() - new Date(message.data().createdAt))/(1000*60)).toFixed() + ' minutes ago';
                        } else if((new Date() - new Date(message.data().createdAt))/1000 > 60*60 && (new Date() - new Date(message.data().createdAt))/1000 < 24*60*60) {
                            lastUpdated = ((new Date() - new Date(message.data().createdAt))/(1000*60*60)).toFixed() + ' hours ago';
                        } else if((new Date() - new Date(message.data().createdAt))/1000 > 24*60*60) {
                            lastUpdated = new Date(message.data().createdAt).toLocaleDateString();
                        } 
                        if(message.data().sentBy === authState.uid){
                            return(
                                <div key={message.id} className="chat-message-container sent-by-me">
                                    <div className="message-sent-by-me-container">
                                        <p className="message-sent-by-me">{message.data().message}</p>
                                        <p className="chat-time">{lastUpdated}</p>
                                    </div>
                                    <div className="chat-message-image-container">
                                        <img className="chat-message-image" alt='chat-pic' src={message.data().photoURL} />
                                    </div>
                                </div>
                            )
                        } else {
                            return(
                                <div key={message.id} className="chat-message-container sent-by-others">
                                    <div className="chat-message-image-container">
                                        <img alt='chat-pic' className="chat-message-image" src={message.data().photoURL} />
                                    </div>
                                    <div className="message-sent-by-others-container">
                                        <p className="message-sent-by-others">{message.data().message}</p>
                                        <p className="chat-time">{lastUpdated}</p>
                                    </div>
                                </div>
                            ) 
                        }
                    })}
                    <div className="scroll-to-view"></div>
                </div>
                <form className='send-message-container' onSubmit={(e) => sendMessage(e)}>
                    <input className='message-input' type='text' required value={message ? message : ''} onChange={(e) => setMessage(e.target.value)} />
                    <button className='send-button' type="submit" >Send</button>
                </form>
            </div>
        </div>
    );
}
 
export default ChatBox;