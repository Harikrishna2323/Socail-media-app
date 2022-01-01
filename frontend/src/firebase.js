// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlEw9SjPtFv7-9_r0g-zSAs7sb3dell-k",
  authDomain: "socials-73982.firebaseapp.com",
  projectId: "socials-73982",
  storageBucket: "socials-73982.appspot.com",
  messagingSenderId: "588911071187",
  appId: "1:588911071187:web:2cb8ea5ffcb195b816e926",
  measurementId: "G-1MKVNNJ43N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
