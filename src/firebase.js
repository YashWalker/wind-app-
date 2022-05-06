import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDnmiCTil7WT08f1asI3wZWfaoONHuLEsc",
  authDomain: "fir-wood.firebaseapp.com",
  projectId: "fir-wood",
  storageBucket: "fir-wood.appspot.com",
  messagingSenderId: "406986709887",
  appId: "1:406986709887:web:7326c5012ae1ea3204d84a",
  measurementId: "G-RP9W7RGFG0",
};

// initialize firebase app
const app = initializeApp(firebaseConfig);

// export
export const auth = getAuth(app);

export const googleAuthProvider = new GoogleAuthProvider();
