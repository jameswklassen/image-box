import * as firebase from 'firebase';

// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAPEl-hY5NNTQjtA-0vFdaOVVx9AlNGz0Y",
  authDomain: "image-box-16305.firebaseapp.com",
  databaseURL: "https://image-box-16305.firebaseio.com",
  projectId: "image-box-16305",
  storageBucket: "gs://image-box-16305.appspot.com/",
    messagingSenderId: "62527557058",
    appId: "1:62527557058:web:f243e5b10e7531c1"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const storage = firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();
  const db = firebase.firestore()

  export {
      firebase,
      storage,
      provider,
      db
  }