import firebase from 'firebase'
require("@firebase/firestore")

var firebaseConfig = {
    apiKey: "AIzaSyAEIoX1-LAnvV0LNHK725vA4BKmHyqZcq8",
    authDomain: "barter-app-c3ab6.firebaseapp.com",
    databaseURL: "https://barter-app-c3ab6.firebaseio.com",
    projectId: "barter-app-c3ab6",
    storageBucket: "barter-app-c3ab6.appspot.com",
    messagingSenderId: "146204379397",
    appId: "1:146204379397:web:6d2447dff02e3980fdcf6c"
  };

  // Initialize Firebase
  if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
  }
  export default firebase.firestore();