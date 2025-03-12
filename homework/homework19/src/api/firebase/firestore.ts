// Firebase 초기화
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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

//  // Firestore 인스턴스
const db = getFirestore(app);
// Firebase Storage 인스턴스
const storage = getStorage(app);

export { db, storage }