import {
  ADD_ANSWERS,
  ADD_QUESTIONS,
  ADD_QUIZ, CLEAR_ANSWERS,
  CLEAR_QUESTIONS, DEL_ANSWERS,
  DEL_QUESTIONS,
  DEL_QUIZ, SET_ANSWERS,
  SET_FIREBASE, SET_LOADER,
  SET_QUESTIONS,
  SET_QUIZ
} from "./actionTypes";

export function setFirebasse(params) {
  return {
    type: SET_FIREBASE,
    params
  }
}
export function setLoader(params) {
  return {
    type: SET_LOADER,
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
export function clearQuestionsList() {
  return {
    type: CLEAR_QUESTIONS
  }
}
export function addQuestionsInList(question) {
  return {
    type: ADD_QUESTIONS,
    question
  }
}
export function setQuestionsInList(question, index) {
  return {
    type: SET_QUESTIONS,
    payload: {question, index}
  }
}
export function delQuestionsInList(index) {
  return {
    type: DEL_QUESTIONS,
    payload: {index}
  }
}
export function clearAnswersList() {
  return {
    type: CLEAR_ANSWERS
  }
}
export function addAnswersInList(answer) {
  return {
    type: ADD_ANSWERS,
    answer
  }
}
export function setAnswersInList(answer, index) {
  return {
    type: SET_ANSWERS,
    payload: {answer, index}
  }
}
export function delAnswersInList(index) {
  return {
    type: DEL_ANSWERS,
    payload: {index}
  }
}
