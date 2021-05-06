import { createContext, useEffect, useMemo, useState } from 'react';
import { auth, db } from '../firebase_config';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    
    const iniState = useMemo(() => {
        return null
    }, [])

    const [authState, setAuthState] = useState(iniState);

    useEffect(() => {
        auth.onAuthStateChanged((userAuth) => {
            // console.log(userAuth)
            if(userAuth) {
                setAuthState(userAuth.providerData[0]);
            } 
            // console.log(authState)
            if(authState) {
                db.collection('users').doc(authState.uid).set(
                    {
                        displayName: authState.displayName,
                        email: authState.email,
                        uid: authState.uid,
                        photoURL: authState.photoURL,
                        phoneNumber: authState.phoneNumber,
                        providerId: authState.providerId
                    }
                    );
            }
            // else setAuthState(iniState);
        });
    }, [iniState, authState]);

    // console.log(authState)

    return ( 
        <AuthContext.Provider value={{authState, setAuthState}}>
            {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;