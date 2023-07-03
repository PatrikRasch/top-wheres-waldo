import { initializeApp } from "firebase/app"; // Function used every time you start a new app in firebase
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// This is what connects your app to your backend
const firebaseConfig = {
  apiKey: "AIzaSyBOclg3HNk1wOKMG16_YmpBpGjFk_w_Oas",
  authDomain: "top-waldo-7283a.firebaseapp.com",
  projectId: "top-waldo-7283a",
  storageBucket: "top-waldo-7283a.appspot.com",
  messagingSenderId: "20685193284",
  appId: "1:20685193284:web:830ed93dbca2e63bf4bc11",
};

const app = initializeApp(firebaseConfig); // app now contains all your info
console.log(app);

export const auth = getAuth(app); // This gets authentication for your app
export const googleProvider = new GoogleAuthProvider(); // This gets Google login authentication
export const db = getFirestore(app);
export const storage = getStorage(app);
