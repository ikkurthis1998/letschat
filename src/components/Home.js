import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";
import { ChatFormContext } from "../contexts/ChatFormContext";
import { ScreenContext } from "../contexts/ScreenContext";
import { auth } from "../firebase_config";
import AllChats from "./AllChats";
import ChatBox from "./ChatBox";
import ChatBoxForm from "./ChatBoxForm";
import './Home.css'

const Home = () => {

    const { authState, setAuthState } = useContext(AuthContext);
    const { screenWidth } = useContext(ScreenContext);
    const { chat, setChat } = useContext(ChatContext);
    const { chatForm} = useContext(ChatFormContext);

    const [ isLoading, setIsLoding ] = useState(false);

    // setChatForm(true);
    
    const signout = () => {
        auth.signOut();
        setAuthState(null);
        setChat(false);
    }

    const guestLogin = () => {
        setIsLoding(true);
        auth.signInWithEmailAndPassword("letschat@chat.com", "test123").then(
            () => {
                setIsLoding(false);
            }
        ).catch((error) => {
            alert(error.message);
        });
    }
    

    if(!authState) {
        return (
            <div className='play-ground'>
                <div className="home-screen">
                    <h1 style={{fontWeight: "100"}}>LetsChat</h1>
                    <Link to='/login'><button className="button button-home">LogIn</button></Link>
                    <Link to='/signup'><button className="button button-home">SignUp</button></Link>
                    <button className="button button-home" onClick={() => guestLogin()}>{isLoading ? "Loading..." : "Guest Login"}</button>
                </div>
            </div>
        );
    } else if (authState && screenWidth > 1023) {
        return (
            <div className='play-ground'>
                <div className='side-container'>
                    <div className='profile-container'>
                        <Link to='/updateprofile'>
                            <div className='profile-photo-container'>
                                <img alt='profile-pic' className='profile-pic-home' src={authState.photoURL} />
                            </div>
                        </Link>
                        <div className="display-name-container">
                            <p className="display-name">{authState.displayName}</p>
                            <button className="button" onClick={() => signout()}>SignOut</button>
                        </div>
                    </div>
                    <AllChats />
                </div> 
                {chat && <ChatBox />}
                {chatForm && <ChatBoxForm />}
            </div>
        );
    } else if (authState && screenWidth < 1023) {
        return (
            <div className='play-ground'>
            {
                chat ? <ChatBox /> : <div className='side-container-small'>
                                        <div className='profile-container-small'>
                                            <Link to='/updateprofile'>
                                                <div className='profile-photo-container-small'>
                                                    <img alt='profile-pic' className='profile-pic-home' src={authState.photoURL} />
                                                </div>
                                            </Link>
                                            <div className='profile-details-container-small'>
                                                <p>{authState.displayName}</p>
                                                <button className="button" onClick={() => signout()}>SignOut</button>
                                            </div>
                                        </div>
                                        <AllChats />
                                    </div>
            }
            {chatForm && <ChatBoxForm />}
            </div>
        );
    }
}
 
export default Home;