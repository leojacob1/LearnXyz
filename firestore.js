import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCa3lG-OTPNc_yweBeqPxKXo5-HmUXvElY",
  authDomain: "learn-xyz-takehome.firebaseapp.com",
  projectId: "learn-xyz-takehome",
  storageBucket: "learn-xyz-takehome.appspot.com",
  messagingSenderId: "802107432634",
  appId: "1:802107432634:web:274008dee702727465ec83"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;