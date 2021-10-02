import firebase from "firebase";

const app = firebase.initializeApp({
  projectId: "piedra-papel-tijera-42533",
  apiKey: "4hI4AE3XDXiubFtJ3dAzCJDR76ItCfycAlzcdQza",
  databaseURL: "https://piedra-papel-tijera-42533-default-rtdb.firebaseio.com",
  authDomain: "piedra-papel-tijera-42533.firebaseapp.com",
});

const rtdb = firebase.database();
const firestore = firebase.firestore();

export { rtdb, firestore };
