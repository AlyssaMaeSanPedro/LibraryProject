// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOYNcvC21KSy7MbEiLLXTkuYYdNHLT_g8",
  authDomain: "auth-library-9950e.firebaseapp.com",
  projectId: "auth-library-9950e",
  storageBucket: "auth-library-9950e.appspot.com",
  messagingSenderId: "865962194893",
  appId: "1:865962194893:web:c075a859bc04c6ff6cb684"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);