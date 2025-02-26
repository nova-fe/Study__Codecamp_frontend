// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn9vU0siYXT5ulbfuPO5q_GLeCvpeYGBw",
  authDomain: "codecamp-firestore-test.firebaseapp.com",
  projectId: "codecamp-firestore-test",
  storageBucket: "codecamp-firestore-test.firebasestorage.app",
  messagingSenderId: "568015578060",
  appId: "1:568015578060:web:cb79a7245a4884e7747369"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);