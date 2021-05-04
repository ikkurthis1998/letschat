import { useContext, useState } from "react";
import { ScreenContext } from "../contexts/ScreenContext";
import './Navbar.css';
import { ArrowBarDown, ArrowBarUp } from 'react-bootstrap-icons';
import {Link} from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext";
import { auth } from "../firebase_config";


const Navbar = () => {

    const { authState, setAuthState } = useContext(AuthContext);  
    const { screenWidth } = useContext(ScreenContext);
    const [showNav, setShowNav] = useState(false);

    const toggleNavMenu = () => {
        if (screenWidth < 1023) {
            setShowNav(!showNav);
        }
    }

    const signout = () => {
        auth.signOut()
        setAuthState(null)
        toggleNavMenu()
    }

    return ( 
        <div className="navbar-container">
            <Link to='/'><div className="navbar-brand">
                <p>LetsChat</p>
            </div>
            </Link>
            {screenWidth < 1023 ? showNav ? <ArrowBarUp size={25} className="navbar-toggle" onClick={() => toggleNavMenu()} /> : <ArrowBarDown size={25} className="navbar-toggle" onClick={() => toggleNavMenu()} /> : <></>}
            <div className="break"></div>
            <div className={screenWidth > 1023 ? "navbar-nav-container" : showNav ? "navbar-nav-container nav-container-small show" : "navbar-nav-container nav-container-small"}>
                <Link to='/'><button className="navbar-nav" onClick={() => toggleNavMenu()}>Home</button></Link>
                {!authState && <><Link to='/login'><button className="navbar-nav button" onClick={() => toggleNavMenu()}>LogIn</button></Link>
                <Link to='/signup'><button className="navbar-nav button" onClick={() => toggleNavMenu()}>SignUp</button></Link> </>}
                {authState && <><Link to='/updateprofile'><button className="navbar-nav button" onClick={() => toggleNavMenu()}>Update Profile</button></Link>
                <button className="navbar-nav button" onClick={() => signout()}>SignOut</button></>}
            </div>
        </div>
     );
}
 
export default Navbar;