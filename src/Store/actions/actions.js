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

        }
        resolve()
      });

    })
    // Your web app's Firebase configuration
  }
}
export function signUp(name, lname, email, password) {
  return function(dispatch, getState) {
    return new Promise((resolve, reject) => {
      let {auth} = getState();
      auth.createUserWithEmailAndPassword(email, password)
        .then(user=>{
          auth.currentUser.updateProfile({
            displayName: name + ' ' + lname
          }).then(function() {
            // Update successful.
            console.log(auth, user);
            dispatch(setFirebasse({auth, user: {...auth.currentUser, displayName: name + ' ' + lname}}));
            resolve()
          }, function(error) {
            // An error happened.
            console.log(error);
            reject(error);
          });
        })
        .catch(function(error) {
            dispatch(setFirebasse({error}));
            console.log(error.code);
            console.log(error.message);
            reject(error);
          }
        )
    })
    ;
  }
}
export function signIn(email, password) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let {auth} = getState();
      auth.signInWithEmailAndPassword(email, password)
        .then(()=>{
          console.log(auth);
          dispatch(setFirebasse({auth, user: auth.currentUser}));
          resolve();
        })
        .catch(function(error) {
          dispatch(setFirebasse({error}));
          console.log(error.code);
          console.log(error.message);
          reject(error);
        })
    })
  }
}
export function signOut() {
  return (dispatch, getState) => {
    let {auth} = getState();
    auth.signOut()
      .then(()=>{
        console.log(auth);
        dispatch(setFirebasse({auth, user: auth.currentUser}))
      })
      .catch(function(error) {
        dispatch(setFirebasse({error}));
        console.log(error.code);
        console.log(error.message);
      })
  }
}
