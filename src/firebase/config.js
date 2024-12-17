import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWy9_mdVSgA8Nv1DVrm25EMbbsBF4IAy4",
  authDomain: "ssd-project-2024.firebaseapp.com",
  databaseURL: "https://ssd-project-2024-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ssd-project-2024",
  storageBucket: "ssd-project-2024.appspot.com",
  messagingSenderId: "381161776184",
  appId: "1:381161776184:web:22d6f4d0dec72c4db8b2cd",
  measurementId: "G-GKMSFGYBPD" // Optional, only for analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services to use in your project
export const auth = getAuth(app); // Authentication
export const db = getFirestore(app); // Firestore Database
export const storage = getStorage(app); // File Storage
