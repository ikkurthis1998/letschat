import { useContext, useReducer } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../firebase_config';
import './AuthForm.css';

const signupReducer = (signupState, action) => {
    switch (action.type) {
        case "field":
            return {
                ...signupState, [action.field]: action.value
            }
    }
}

const SignUp = () => {

    const iniState = {
        email: '',
        password: '',
        confirmPassword: '', 
        isLoading: false,
        error: false
    }

    const [signupState, signupDispatch] = useReducer(signupReducer, iniState);
    const {authState} = useContext(AuthContext);

    const signup = (e) => {
        e.preventDefault();
        signupDispatch({type: "field", field: "isLoading", value: true});
        signupDispatch({type: "field", field: "error" , value: ""})
        if (signupState.password !== signupState.confirmPassword) {
            signupDispatch({type: "field", field: "isLoading", value: false});
            return signupDispatch({type: "field", field: "error" , value: "Passwords do not match"})
        }
        auth.createUserWithEmailAndPassword(signupState.email, signupState.password).then(() => {
            signupDispatch({type: "field", field: "isLoading", value: false});
        }).catch((error) => {
            signupDispatch({type: "field", field: "error" , value: error.message});
            signupDispatch({type: "field", field: "isLoading", value: false});
        });
    }
    // console.log(auth.currentUser.providerData[0]);

    if(authState){
        return <Redirect to='/' />
    } else {
    return ( 
        <div className="form-container">
            <h1 className="form-heading">SignUp</h1>
            {signupState.error && <div className="error-container">
                 <p className="error-message">{signupState.error}</p>
            </div>}
            <form className="form" onSubmit={(e) => signup(e)}>
                <div className="input-group">
                    <label className="input-label">
                        Email
                    </label>
                    <input type="email" className="input-field" onChange={(e) => signupDispatch({type: "field", field: "email", value: e.target.value})} /> 
                </div>
                <div className="input-group">
                    <label className="input-label">
                        Password
                    </label>
                    <input type="password" className="input-field" onChange={(e) => signupDispatch({type: "field", field: "password", value: e.target.value})} />
                </div>
                <div className="input-group">
                    <label className="input-label">
                        Confirm Password
                    </label>
                    <input type="password" className="input-field" onChange={(e) => signupDispatch({type: "field", field: "confirmPassword", value: e.target.value})} />
                </div>
                <button type="submit" className="submit-button">{signupState.isLoading ? "Loading..." : "SignUp"}</button>
            </form>
        </div>
    );}
}
 
export default SignUp;