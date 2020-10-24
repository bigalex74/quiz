import {
  addQuestionsInList,
  clearQuestionsList,
  delQuestionsInList,
  setFirebasse, setQuestionsInList,
} from "./actions";
import {delAllAnswersFromQuestion} from "./answerFirebase";

export function initQuestionsList(key) {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      let {db} = getState();
      let ref = db.ref('questions');
      dispatch(clearQuestionsList());
      console.log(3, getState());
      let questions = [];
      ref.orderByChild("keyQuiz").equalTo(key).on("child_added", function(data) {
        const dv = data.val();
        const dk = data.key;
        questions.push({...dv, key: dk});
        dispatch(setFirebasse({questions: [...questions]}));
      });
      resolve()
    })
  }
}

export function addQuestion(question, keyQuiz) {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      let {db} = getState();
      let ref = db.ref('questions');
      ref.push({...question, keyQuiz: keyQuiz});
      dispatch(addQuestionsInList(question));
      resolve()
    })
  }
}
export function setQuestion(question, index) {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      let {db} = getState();
      let key = question.key;
      let ref = db.ref('questions/'+key);
      ref.update({...question, key: null});
      dispatch(setQuestionsInList(question, index));
      resolve()
    })
  }
}
export function delQuestion(question) {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      let {db} = getState();
      let key = question.key;
      let ref = db.ref('questions/'+key);
      ref.remove();
      dispatch(delAllAnswersFromQuestion(key));
      dispatch(delQuestionsInList(question.tableData.id));
      resolve()
    })
  }
}
export function delAllQuestionsFromQuiz(key) {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      let {db} = getState();
      let ref = db.ref('questions');
      ref.orderByChild("keyQuiz").equalTo(key).on("child_added", function(data) {
        const dk = data.key;
        let ref = db.ref('questions/'+dk);
        ref.remove();
        dispatch(delAllAnswersFromQuestion(dk));
      });
      resolve()
    })
  }
}
