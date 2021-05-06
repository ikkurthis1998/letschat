import {  useEffect } from "react";
import useStorage from "../hooks/useStorage";

const UploadingPicture = ({file, updateDispatch}) => {
    // console.log(file)
    const storageState = useStorage(file);
    // console.log(storageState)
    // console.log(file)
    useEffect(() => {
        updateDispatch({type: "field", field: "photoURL", value: storageState.photoURL})
    }, [updateDispatch, storageState.photoURL])

    return ( 
        <div>
            {storageState.progress > 0 && !storageState.photoURL && <p>uploading...</p>}
        </div>
    );
}
 
export default UploadingPicture;