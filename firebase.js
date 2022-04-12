// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBeS6BJgo0GB1A2YV4kdr-PudSqpI4lSo",
  authDomain: "devtwi-a481c.firebaseapp.com",
  projectId: "devtwi-a481c",
  storageBucket: "devtwi-a481c.appspot.com",
  messagingSenderId: "332477332849",
  appId: "1:332477332849:web:6074f3dafe04a35f4c4ad0",
  measurementId: "G-9JWSB78HQY"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();


export default app;
export { db, storage };