import { createContext, useEffect, useMemo, useState } from 'react';
import { auth } from '../firebase_config';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    
    const iniState = useMemo(() => {
        return null
    }, [])

    const [authState, setAuthState] = useState(iniState);

    useEffect(() => {
        auth.onAuthStateChanged((userAuth) => {
            if(userAuth) setAuthState(userAuth.providerData[0]);
            // else setAuthState(iniState);
        });
    }, [iniState]);

    console.log(authState)

    return ( 
        <AuthContext.Provider value={{authState, setAuthState}}>
            {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;