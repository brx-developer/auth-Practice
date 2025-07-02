// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVcFenn9sy4vemSkubTS4paJORZMFssrM",
  authDomain: "astro-auth-5058c.firebaseapp.com",
  projectId: "astro-auth-5058c",
  storageBucket: "astro-auth-5058c.firebasestorage.app",
  messagingSenderId: "1083878769159",
  appId: "1:1083878769159:web:d5fc906b046a82839ea0a2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.languageCode = "es";

export const firebase = {
  app,
  auth,
};
