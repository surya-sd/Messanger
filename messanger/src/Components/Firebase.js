import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase
  .initializeApp({
    apiKey: "AIzaSyAz4J_4n3A1Ob3RowYsdndcbXVLPvC9Q6k",
    authDomain: "messanger-cc0c2.firebaseapp.com",
    projectId: "messanger-cc0c2",
    storageBucket: "messanger-cc0c2.appspot.com",
    messagingSenderId: "310278246536",
    appId: "1:310278246536:web:98b8e51d2a1f796fb68f3d",
  })
  .auth();
