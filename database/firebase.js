import firebase from 'firebase';

import 'firebase/firestore';

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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const db = firebase.firestore();

export default {
    firebase,
    db,
}
