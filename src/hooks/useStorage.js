import { useEffect, useReducer } from "react";
import { storage } from "../firebase_config";

const storageReducer = (storageState, action) => {
    switch (action.type) {
        case "field":
            return {
                ...storageState, [action.field]: action.value
            }
        default:
            return
    }
}

const useStorage = (file) => {
    
    const iniState = {
        progress: 0,
        error: '',
        photoURL: ''
    }

    // console.log(file)
    
    const [storageState, storageDispatch] = useReducer(storageReducer, iniState);

    useEffect(() => {

        const storageRef = storage.ref(file.name);

        storageRef.child(file.name).put(file).on('state_changed', 
        (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            storageDispatch({type: "field", field: "progress", value: progress})
        //   console.log('Upload is ' + progress + '% done');
        }, 
        (error) => {
            storageDispatch({type: "field", field: "error", value: error.message})
        }, 
        () => {
            storageRef.child(file.name).getDownloadURL().then((downloadURL) => {
            // console.log('File available at', downloadURL);
            storageDispatch({type: "field", field: "photoURL", value: downloadURL})
            });
        }
        );
    }, [file]);

    return storageState;
}
 
export default useStorage;