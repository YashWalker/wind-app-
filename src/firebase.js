//import * as firebase from "firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDnmiCTil7WT08f1asI3wZWfaoONHuLEsc",
  authDomain: "fir-wood.firebaseapp.com",
  projectId: "fir-wood",
  storageBucket: "fir-wood.appspot.com",
  messagingSenderId: "406986709887",
  appId: "1:406986709887:web:7326c5012ae1ea3204d84a",
  measurementId: "G-RP9W7RGFG0",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
