import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0CDxQ4zHfKMivxfd5p9NXLQ2wsEn-ro0",
  authDomain: "app-firebase-learn-f5e4f.firebaseapp.com",
  projectId: "app-firebase-learn-f5e4f",
  storageBucket: "app-firebase-learn-f5e4f.firebasestorage.app",
  messagingSenderId: "149700966358",
  appId: "1:149700966358:web:94322bdc2c3fb5b3c99677"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

