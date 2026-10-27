import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// add firebase config here
var firebaseConfig = {
    apiKey: "AIzaSyBimmpwxc9YHADwTa7NKQspu0kJPy49gHg",
    authDomain: "parkingmode-5ca9d.firebaseapp.com",
    databaseURL: "https://parkingmode-5ca9d-default-rtdb.firebaseio.com",
    projectId: "parkingmode-5ca9d",
    storageBucket: "parkingmode-5ca9d.appspot.com",
    messagingSenderId: "502013198217",
    appId: "1:502013198217:web:1ad40776bb00de9eaa2b58",
    measurementId: "G-T2FHRJX1DE"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();

export { auth, db };
export default { firebase, auth, db };
