import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/auth'


//conexão com firebase

var firebaseConfig = {
    apiKey: "AIzaSyBiwOs8TnQQ3ASs4rTmXyLiU3BbmgA8ILE",
    authDomain: "chat-10b7e.firebaseapp.com",
    projectId: "chat-10b7e",
    storageBucket: "chat-10b7e.appspot.com",
    messagingSenderId: "820200538771",
    appId: "1:820200538771:web:134063d4d8145554368366",
    measurementId: "G-T7W5PBP5DN"
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
}
else{
    app.firebase.app()
}

const auth = firebase.auth();
const db = firebase.firestore();
const chatsRef = db.collection("MESSAGE_THREADS");


export {db,  auth, chatsRef};

// const chatsRef = db.collection("chats");

// return chatsRef;

