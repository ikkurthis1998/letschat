import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyAKuzUmOWFAEuYQWuPamDvKudTDJNnq4Q8",
    authDomain: "letschat-reactwithfirebase.firebaseapp.com",
    projectId: "letschat-reactwithfirebase",
    storageBucket: "letschat-reactwithfirebase.appspot.com",
    messagingSenderId: "293574222810",
    appId: "1:293574222810:web:44d7950fbfc19357d356e3"
  };

firebase.initializeApp(firebaseConfig);  

const auth = firebase.auth();
const storage = firebase.storage();
const db = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;



export { auth, storage, db, timestamp };