// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGpHtpktFpS5yNwmUi8--LZimCFpvIqOc",
  authDomain: "whatsapp-clone-69d0e.firebaseapp.com",
  projectId: "whatsapp-clone-69d0e",
  storageBucket: "whatsapp-clone-69d0e.appspot.com",
  messagingSenderId: "79259274224",
  appId: "1:79259274224:web:c34ab1272afa7fbd23ab35",
  measurementId: "G-FQ4KQTZB4J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
const auth = getAuth();
auth.languageCode = 'it';
provider.setCustomParameters({
  'login_hint': 'user@example.com'
});
export default getFirestore();
export {provider};