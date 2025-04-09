import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCOcoAW83vVr5oW5HGpy995BhKkjoEuR0A",
  authDomain: "ranked-e8960.firebaseapp.com",
  projectId: "ranked-e8960",
  storageBucket: "ranked-e8960.firebasestorage.app",
  messagingSenderId: "817253221338",
  appId: "1:817253221338:web:b97dc79a784374745e76e3",
  measurementId: "G-S7NN318W7M"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export { auth, provider };
