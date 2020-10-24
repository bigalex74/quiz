import {
  addAnswersInList,
  clearAnswersList,
  delAnswersInList,
  setAnswersInList,
  setFirebasse,
} from "./actions";

export function initAnswerList(key) {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      let {db} = getState();
      let ref = db.ref('answers');
      dispatch(clearAnswersList());
      let answers = [];
      ref.orderByChild("keyQuestion").equalTo(key).on("child_added", function(data) {
        const dv = data.val();
        const dk = data.key;
        answers.push({...dv, key: dk});
        dispatch(setFirebasse({answers: [...answers]}));
      });
      resolve()
    })
  }
}

export function addAnswer(answer, keyQuestion) {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      let {db} = getState();
      let ref = db.ref('answers');
      ref.push({...answer, keyQuestion: keyQuestion});
      dispatch(addAnswersInList(answer));
      resolve()
    })
  }
}
export function setAnswer(answer, index) {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      let {db} = getState();
      let key = answer.key;
      let ref = db.ref('answers/'+key);
      ref.update({...answer, key: null});
      dispatch(setAnswersInList(answer, index));
      resolve()
    })
  }
}
export function delAnswer(answer) {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      let {db} = getState();
      let key = answer.key;
      let ref = db.ref('answers/'+key);
      ref.remove();
      dispatch(delAnswersInList(answer.tableData.id));
      resolve()
    })
  }
}
export function delAllAnswersFromQuestion(key) {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      let {db} = getState();
      let ref = db.ref('answers');
      ref.orderByChild("keyQuestion").equalTo(key).on("child_added", function(data) {
        const dk = data.key;
        let ref = db.ref('answers/'+dk);
        ref.remove();
      });
      resolve()
    })
  }
}
