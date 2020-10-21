import {ADD_QUIZ, DEL_QUIZ, SET_QUIZ} from "./actionTypes";

export function addQuiz(quiz) {
  // return (dispatch, getState) => {
  //   let {auth} = getState();
  //   auth.signOut()
  //     .then(()=>{
  //       console.log(auth);
  //       dispatch(setFirebasse({auth, user: auth.currentUser}))
  //     })
  //     .catch(function(error) {
  //       dispatch(setFirebasse({error}));
  //       console.log(error.code);
  //       console.log(error.message);
  //     })
  // }
  return {
    type: ADD_QUIZ,
    quiz
  }
}
export function setQuiz(quiz, index) {
  // console.log(quiz,index);
  return {
    type: SET_QUIZ,
    payload: {quiz, index}
  }
}
export function delQuiz(index) {
  // console.log(index);
  return {
    type: DEL_QUIZ,
    payload: {index}
  }
}
