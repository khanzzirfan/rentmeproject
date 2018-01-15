import firebase from "firebase";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBXEndzbpuchdaWtYM0biOUZUwLicdHGKg",
  authDomain: "rentme-35946.firebaseapp.com",
  databaseURL: "https://rentme-35946.firebaseio.com",
  projectId: "rentme-35946",
  storageBucket: "",
  messagingSenderId: "778736646249"
};
firebase.initializeApp(config);

export default firebase;
