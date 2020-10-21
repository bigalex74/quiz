import {SET_QUIZ} from "./actionTypes";
import {addQuizInList, delQuizInList, setFirebasse} from "./actions";

export function addQuiz(quiz) {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      let {db, user} = getState();
      let ref = db.ref();
      ref.push({...quiz, uid: user.uid});
      dispatch(addQuizInList(quiz));
      resolve()
    })
  }
}
export function setQuiz(quiz, index) {
  // console.log(quiz,index);
  return {
    type: SET_QUIZ,
    payload: {quiz, index}
  }
}
export function delQuiz(quiz) {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      let {db} = getState();
      let key = quiz.key;
      let ref = db.ref(key);
      ref.remove();
      dispatch(delQuizInList(quiz.tableData.id));
      resolve()
    })
  }
}
export function initDataUser() {
  return (dispatch, getState) => {
    dispatch(setFirebasse({listQuizes: []}));
    let {db, user} = getState();
    let ref = db.ref();
    let listQuizes = [];
    // console.log('user uid', user.uid);
    ref.orderByChild("uid").equalTo(user.uid).on("child_added", function(data) {
      const dv = data.val();
      const dk = data.key;
      listQuizes.push({...dv, key: dk});
      // console.log(listQuizes);
      dispatch(setFirebasse({listQuizes: [...listQuizes]}));
    });
  }
}
