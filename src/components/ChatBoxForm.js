import { useContext, useReducer, useState } from 'react';
import { ChatContext } from '../contexts/ChatContext';
import { ChatFormContext } from '../contexts/ChatFormContext';
import { db } from '../firebase_config';
import './ChatBoxForm.css'
import UploadingPicture from './UploadingPicture';

const chatBoxFormReducer = (chatBoxFormState, action) => {
    switch (action.type) {
        case "field":
            return {
                ...chatBoxFormState, [action.field]: action.value
            }
        default:
            return
    }
}

const ChatBoxForm = () => {

    const { setChatForm } = useContext(ChatFormContext);
    const { setChatChanges, chatChanges } = useContext(ChatContext);

    var iniState = {
        photoURL: '',
        name: '',
    }

    if(chatChanges) {
        iniState = {
            photoURL: chatChanges.data().photoURL,
            name: chatChanges.data().name
        }
    }

    const [file, setFile] = useState(null);

    const [chatBoxFormState, chatBoxFormDispatch] = useReducer(chatBoxFormReducer, iniState);

    const updateChatBox = (e) => {
        e.preventDefault();
        if(chatChanges) {
            db.collection('chats').doc(chatChanges.id).set({
                name: chatBoxFormState.name,
                photoURL: chatBoxFormState.photoURL
            }, { merge: true })

        }
        else {
            db.collection('chats').doc().set({
                name: chatBoxFormState.name,
                photoURL: chatBoxFormState.photoURL,
                createdAt: new Date().toLocaleString(), 
                updatedAt: new Date().toLocaleString()
            }, { merge: true })
        }
        setChatForm(false);
        setChatChanges(null);
    }

    return ( 
        <div className="chatbox-form-container" onClick={(e) => {if(e.target.className === "chatbox-form-container"){
            setChatForm(false);setChatChanges(null);
        }}}>
            <form className="chatbox-form-input-container">
                <h1 className="chatbox-form-title">Update ChatBox</h1>
                <label className="chatbox-form-photo-container">
                    {!chatBoxFormState.photoURL && "+" }
                    <input className="chatbox-form-photo-input" type="file" onInput={(e) => setFile(e.target.files[0])} />
                    {file && <UploadingPicture file={file} updateDispatch={chatBoxFormDispatch} />}
                    {chatBoxFormState.photoURL && <img className="chatbox-form-photo" alt="pro-pic" src={chatBoxFormState.photoURL} />}
                </label>
                <label className="chatbox-form-input-name-container">
                    ChatBox Name
                    <input className="chatbox-form-input-name" required placeholder={chatChanges ? chatChanges.data().name : ''} type="text" onChange={(e) => chatBoxFormDispatch({type: "field", field: "name", value: e.target.value})} />
                </label>
                <button type="submit" className="save-button" onClick={(e) => updateChatBox(e)}>Save</button>
            </form>
        </div>
    );
}
 
export default ChatBoxForm;