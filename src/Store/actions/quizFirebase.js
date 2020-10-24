import {addQuizInList, delQuizInList, setFirebasse, setQuizInList} from "./actions";
import {delAllQuestionsFromQuiz} from "./questionFirebase";

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
  return (dispatch, getState) => {
    return new Promise(resolve => {
      let {db} = getState();
      let key = quiz.key;
      let ref = db.ref(key);
      ref.update({...quiz, key: null});
      dispatch(setQuizInList(quiz, index));
      resolve()
    })
  }
}
export function delQuiz(quiz) {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      let {db} = getState();
      let key = quiz.key;
      let ref = db.ref(key);
      ref.remove();
      dispatch(delAllQuestionsFromQuiz(key));
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
    ref.orderByChild("uid").equalTo(user.uid).on("child_added", function(data) {
      const dv = data.val();
      const dk = data.key;
      listQuizes.push({...dv, key: dk});
      dispatch(setFirebasse({listQuizes: [...listQuizes]}));
    });
  }
}
