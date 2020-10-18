import firebase from 'firebase';

import {SET_FIREBASE} from "./actionTypes";

export function setFirebasse(params) {
  return {
    type: SET_FIREBASE,
    params
  }
}

export function initFirebase() {
  return (dispatch) => {
    // Your web app's Firebase configuration
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
    dispatch(setFirebasse({
      db: app.database(),
      auth: app.auth()
    }))
  }
}
