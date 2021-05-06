import { useContext, useEffect, useReducer } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../firebase_config';
import './AuthForm.css';
import UploadingPicture from './UploadingPicture';


const updateProfileReducer = (updateprofileState, action) => {
    switch (action.type) {
        case "field":
            return {
                ...updateprofileState, [action.field]: action.value
            }
        default:
            return
    }
}

const UpdateProfile = () => {

    const iniState = {
        file: null,
        displayName: '',
        progress: 0,
        isLoading: false,
        error: false
    }

    const [updateprofileState, updateprofileDispatch] = useReducer(updateProfileReducer, iniState);
    const {authState} = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        
        if(authState) {
            updateprofileDispatch({type: "field", field: "isLoading", value: true});
            if(authState.displayName){
                updateprofileDispatch({type: "field", field: "displayName", value: authState.displayName});
            }
            if(authState.photoURL) {
                updateprofileDispatch({type: "field", field: "photoURL", value: authState.photoURL});
            }
            updateprofileDispatch({type: "field", field: "isLoading", value: false});
        }
    }, [authState])

    const UpdateProfile = (e) => {
        e.preventDefault();
        updateprofileDispatch({type: "field", field: "isLoading", value: true});
        updateprofileDispatch({type: "field", field: "error" , value: ""})
        
        auth.currentUser.updateProfile({
            displayName : updateprofileState.displayName,
            photoURL : updateprofileState.photoURL
        }).then(() => {
            updateprofileDispatch({type: "field", field: "isLoading", value: false});
        }).catch((error) => {
            updateprofileDispatch({type: "field", field: "error" , value: error.message});
            updateprofileDispatch({type: "field", field: "isLoading", value: false});
        });
        history.push('/');
    }

    if (!authState) {
        return <Redirect to='/' />
    } else {
    return ( 
        <div className="form-container">
            <h1 className="form-heading">UpdateProfile</h1>
            {updateprofileState.error && <div className="error-container">
                 <p className="error-message">{updateprofileState.error}</p>
            </div>}
            <form className="form" onSubmit={(e) => UpdateProfile(e)}>
                <div className="input-group">
                    <label className="file-label">
                        <div className='photo-container'>
                            {updateprofileState.progress === 0 && !authState.photoURL && <>+</>}
                            {updateprofileState.file && <UploadingPicture file={updateprofileState.file} updateDispatch={updateprofileDispatch}/>}
                            {updateprofileState.photoURL && <img className='profile-pic' alt='oops! something is missing here' src={updateprofileState.photoURL}/>}
                        </div>
                        <input type="file" className="input-file" onInput={(e) => updateprofileDispatch({type: "field", field: "file", value: e.target.files[0]})} /> 
                    </label>
                </div>
                <div className="input-group">
                    <label className="input-label">
                        Display Name
                    </label>
                    <input type="text" className="input-field" placeholder={authState.displayName && authState.displayName} onChange={(e) => updateprofileDispatch({type: "field", field: "displayName", value: e.target.value})} />
                </div>
                <button type="submit" className="submit-button">{updateprofileState.isLoading ? "Loading..." : "UpdateProfile"}</button>
            </form>
        </div>
    );}
}
 
export default UpdateProfile;