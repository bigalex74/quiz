import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import {setFirebasse, setLoader} from "./actions";
import {getAllQuiz, initDataUser} from "./quizFirebase";
import {isTeacher} from "../helper";

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
      dispatch(setLoader(true));
      const app = firebase.initializeApp(firebaseConfig);
      const auth = app.auth();
      dispatch(setFirebasse({
        db: app.database(),
        auth: auth
      }));
      auth.onAuthStateChanged(async function(user) {
        if (user) {
          await dispatch(setFirebasse({user}));
          if (isTeacher(user.email))
           await dispatch(initDataUser());
          else
           await dispatch(getAllQuiz());
        }
        dispatch(setLoader(false));
        resolve()
      });

    })
    // Your web app's Firebase configuration
  }
}
