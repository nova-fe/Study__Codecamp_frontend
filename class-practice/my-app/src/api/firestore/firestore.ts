// Firebase 초기화
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0K6i6PQWBkdnHp3rtkbjIojfPOnPTHv0",
  authDomain: "nova-codecamp-board.firebaseapp.com",
  projectId: "nova-codecamp-board",
  storageBucket: "nova-codecamp-board.firebasestorage.app",
  messagingSenderId: "143923364444",
  appId: "1:143923364444:web:7aa0703f1c61f3a7045c99"
};


// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);