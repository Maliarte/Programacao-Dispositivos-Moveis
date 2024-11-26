
import firebase from "firebase";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCFMr9o8_e0AF9U4f1NIqbx5lkUjrvieAQ",
  authDomain: "fittrack-faeterj.firebaseapp.com",
  databaseURL: "https://fittrack-faeterj-default-rtdb.firebaseio.com",
  projectId: "fittrack-faeterj",
  storageBucket: "fittrack-faeterj.appspot.com",
  messagingSenderId: "700588845228",
  appId: "1:700588845228:web:d882133aac2245a8299709",
  measurementId: "G-J7SX8ZB1ZM"
};

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;