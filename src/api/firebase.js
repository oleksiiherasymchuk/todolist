import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDSFZ5_sUyBAGzWcPBnjn4djdQIn88-ybk",
  authDomain: "todolist-8da32.firebaseapp.com",
  projectId: "todolist-8da32",
  storageBucket: "todolist-8da32.appspot.com",
  messagingSenderId: "447971860373",
  appId: "1:447971860373:web:2bebcb5d4a8e7ab248e09c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export default app