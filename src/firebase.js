
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD4nD9MsNV_24cn82V1WpDm7j5RpjSv668",
  authDomain: "workshoptest-6b5c7.firebaseapp.com",
  projectId: "workshoptest-6b5c7",
  storageBucket: "workshoptest-6b5c7.appspot.com",
  messagingSenderId: "128468232030",
  appId: "1:128468232030:web:2aeda6c6ff2f42e2ca51cf",
  measurementId: "G-TK1DW05QLB"
};

const app = initializeApp(firebaseConfig);
export const firestore=getFirestore(app);
export const auth=getAuth(app);