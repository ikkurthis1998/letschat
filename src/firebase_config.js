import firebase from 'firebase/app';
import 'firebase/auth';

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

export { auth };