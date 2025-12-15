//  Fiirebase opsætning 
// samler firebase-opstart ét sted
// så resten af appen bare kan importere databasen

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// firebase indstillinger 
// oplysninger der fortæller firebase hvilket projekt der bruges
const firebaseConfig = {
  apiKey: "AIzaSyBrmyH3Nen_zcHF9fufOkmACWt4fyStKlo",
  authDomain: "adoptionsguiden.firebaseapp.com",
  projectId: "adoptionsguiden",
  storageBucket: "adoptionsguiden.firebasestorage.app",
  messagingSenderId: "952695722214",
  appId: "1:952695722214:web:d3fd4daa59f04f3ac02b27"
};

// opstart af firebase 
const app = initializeApp(firebaseConfig);

// database 
// firestore-connection der bruges i hele projektet
export const db = getFirestore(app);
