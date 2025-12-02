// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyCgceR199zi8YUvP6zP4KktA0mu1sTe8NY",
  authDomain: "turf-booking-24954.firebaseapp.com",
  projectId: "turf-booking-24954",
  storageBucket: "turf-booking-24954.firebasestorage.app",
  messagingSenderId: "981601658327",
  appId: "1:981601658327:web:6fe6949a0a135eef941792",
  measurementId: "G-Z5GKN1EKMN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize services
export const auth = getAuth(app);   // <-- export auth instance
export const db = getFirestore(app); 
export const analytics = getAnalytics(app);

export default app;
