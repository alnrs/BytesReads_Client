// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "oxyian-1001.firebaseapp.com",
  projectId: "oxyian-1001",
  storageBucket: "oxyian-1001.appspot.com",
  messagingSenderId: "553711542671",
  appId: "1:553711542671:web:ce29190c1003dd94f9abfa",
  measurementId: "G-TQCW32Z7PG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);