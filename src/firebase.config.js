// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import {getAuth} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc6WdocK0qXHyCmGauZgoU4pMazN7Iusc",
  authDomain: "japansitecheckboxes.firebaseapp.com",
  projectId: "japansitecheckboxes",
  storageBucket: "japansitecheckboxes.appspot.com",
  messagingSenderId: "474337163127",
  appId: "1:474337163127:web:aba8c1c4c985d5d96f5372"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(); 

export const database = getFirestore(app); 




