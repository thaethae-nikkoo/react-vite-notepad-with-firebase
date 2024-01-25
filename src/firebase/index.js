// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXAqU_WbXLKsWTW8auccB6y89LCMUOaaM",
  authDomain: "vite-memory-notepad.firebaseapp.com",
  projectId: "vite-memory-notepad",
  storageBucket: "vite-memory-notepad.appspot.com",
  messagingSenderId: "664742794035",
  appId: "1:664742794035:web:272c312df06775d275a446",
  measurementId: "G-XN9MLPH55S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let db = getFirestore(app);
let auth = getAuth(app);
let storage = getStorage(app);

export { db, auth, storage };
