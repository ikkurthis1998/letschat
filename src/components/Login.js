import { useContext, useReducer } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../firebase_config';
import './AuthForm.css';


const loginReducer = (loginState, action) => {
    switch (action.type) {
        case "field":
            return {
                ...loginState, [action.field]: action.value
            }
        default:
            return
    }
}

const Login = () => {

    const iniState = {
        email: '',
        password: '',
        isLoading: false,
        error: false
    }

    const [loginState, loginDispatch] = useReducer(loginReducer, iniState);
    const {authState} = useContext(AuthContext);

    const login = (e) => {
        e.preventDefault();
        loginDispatch({type: "field", field: "isLoading", value: true});
        loginDispatch({type: "field", field: "error" , value: ""})
        
        auth.signInWithEmailAndPassword(loginState.email, loginState.password).then(() => {
            loginDispatch({type: "field", field: "isLoading", value: false});
        }).catch((error) => {
            loginDispatch({type: "field", field: "error" , value: error.message});
            loginDispatch({type: "field", field: "isLoading", value: false});
        });
    }

    if(authState){
        return <Redirect to='/' />
    } else {
    return ( 
        <div className="form-container">
            <h1 className="form-heading">LogIn</h1>
            {loginState.error && <div className="error-container">
                 <p className="error-message">{loginState.error}</p>
            </div>}
            <form className="form" onSubmit={(e) => login(e)}>
                <div className="input-group">
                    <label className="input-label">
                        Email
                    </label>
                    <input type="email" className="input-field" onChange={(e) => loginDispatch({type: "field", field: "email", value: e.target.value})} /> 
                </div>
                <div className="input-group">
                    <label className="input-label">
                        Password
                    </label>
                    <input type="password" className="input-field" onChange={(e) => loginDispatch({type: "field", field: "password", value: e.target.value})} />
                </div>
                <button type="submit" className="submit-button">{loginState.isLoading ? "Loading..." : "LogIn"}</button>
            </form>
            <p style={{margin: "auto"}}>Don't have an account? <Link to='/signup'>SignUp</Link></p>
        </div>
    );}
}
 
export default Login;