import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import {setFirebasse} from "./actions";
import {initDataUser} from "./quizFirebase";

export function initFirebase() {
  return (dispatch) => {
    return new Promise((resolve) => {
      const firebaseConfig = {
        apiKey: "AIzaSyDenwr8WvOXeFCVtxcQT0x0DYzU64NBTsg",
        authDomain: "react-dip.firebaseapp.com",
        databaseURL: "https://react-dip.firebaseio.com",
        projectId: "react-dip",
        storageBucket: "react-dip.appspot.com",
        messagingSenderId: "1028821584667",
        appId: "1:1028821584667:web:70f1064583b68d084da1be"
      };
      // Initialize Firebase
      const app = firebase.initializeApp(firebaseConfig);
      const auth = app.auth();
      dispatch(setFirebasse({
        db: app.database(),
        auth: auth
      }));
      auth.onAuthStateChanged(function(user) {
        if (user) {
          dispatch(setFirebasse({user}));
          dispatch(initDataUser());
        }
        resolve()
      });

    })
    // Your web app's Firebase configuration
  }
}
