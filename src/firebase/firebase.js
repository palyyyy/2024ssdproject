import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAocWZ8tMXxcUf3QH2qZWzIIeb6foxM4sc",
    authDomain: "quoterequest-bd14b.firebaseapp.com",
    projectId: "quoterequest-bd14b",
    storageBucket: "quoterequest-bd14b.firebasestorage.app",
    messagingSenderId: "276759653638",
    appId: "1:276759653638:web:cef3c45a68b8b72c820287",
    measurementId: "G-S4R71G3Z2B"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
