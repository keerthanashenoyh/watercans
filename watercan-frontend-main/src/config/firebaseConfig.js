import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage } from "firebase/storage";  // Import getStorage

const firebaseConfig = {
    apiKey: "AIzaSyD4Za_7lz8GWvLAH2o83QDkkfWtHjXLro0",
    authDomain: "water-can-b31f8.firebaseapp.com",
    projectId: "water-can-b31f8",
    storageBucket: "water-can-b31f8.firebasestorage.app",  
    messagingSenderId: "137271763072",
    appId: "1:137271763072:web:e84a3376efb68cdb068665",
    measurementId: "G-0FEHK6LG21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);  // Initialize storage

export { auth, createUserWithEmailAndPassword, storage };  // Export storage
