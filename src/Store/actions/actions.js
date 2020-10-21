import {ADD_QUIZ, DEL_QUIZ, SET_FIREBASE, SET_QUIZ} from "./actionTypes";

export function setFirebasse(params) {
  return {
    type: SET_FIREBASE,
    params
  }
}

export function addQuizInList(quiz) {
  return {
    type: ADD_QUIZ,
    quiz
  }
}
export function setQuizInList(quiz, index) {
  return {
    type: SET_QUIZ,
    payload: {quiz, index}
  }
}
export function delQuizInList(index) {
  return {
    type: DEL_QUIZ,
    payload: {index}
  }
}
