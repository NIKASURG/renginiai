// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGutSVQxXdN6kyH-mHHPFXQcZWtpGd4ug",
  authDomain: "miestevykstantysrenginei.firebaseapp.com",
  projectId: "miestevykstantysrenginei",
  storageBucket: "miestevykstantysrenginei.firebasestorage.app",
  messagingSenderId: "689045823394",
  appId: "1:689045823394:web:d48b55e7c530f1b6b19cfb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);