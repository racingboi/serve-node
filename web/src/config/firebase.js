import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCA9ydVPmOP0jh53-Iks52RAMf4LuNjn5c",
  authDomain: "ducpro-e304b.firebaseapp.com",
  projectId: "ducpro-e304b",
  storageBucket: "ducpro-e304b.appspot.com",
  messagingSenderId: "657669631490",
  appId: "1:657669631490:web:4478b6b86bf0cc7ad1811b",
  measurementId: "G-96XGPV3JQ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const imageDb = getStorage(app)

// const analytics = getAnalytics(app);