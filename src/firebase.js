// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrmyH3Nen_zcHF9fufOkmACWt4fyStKlo",
  authDomain: "adoptionsguiden.firebaseapp.com",
  projectId: "adoptionsguiden",
  storageBucket: "adoptionsguiden.firebasestorage.app",
  messagingSenderId: "952695722214",
  appId: "1:952695722214:web:d3fd4daa59f04f3ac02b27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);