import {setFirebasse} from "./actions";

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
            // console.log(auth, user);
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
          // console.log(auth);
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
        // console.log(auth);
        dispatch(setFirebasse({auth, user: auth.currentUser}))
      })
      .catch(function(error) {
        dispatch(setFirebasse({error}));
        console.log(error.code);
        console.log(error.message);
      })
  }
}
