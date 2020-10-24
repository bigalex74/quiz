import {
  ADD_ANSWERS,
  ADD_QUESTIONS,
  ADD_QUIZ, CLEAR_ANSWERS,
  CLEAR_QUESTIONS, DEL_ANSWERS, DEL_QUESTIONS,
  DEL_QUIZ, SET_ANSWERS,
  SET_FIREBASE, SET_LOADER,
  SET_QUESTIONS,
  SET_QUIZ
} from "../actions/actionTypes";

const initialState = {
  db: null,           // база данных
  auth: null,         // параметр аутентификации пользователя
  error: null,
  user: null,
  listQuizes: [],
  questions: [],
  answers: [],
  loader: false

};


export default function firebaseReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FIREBASE: {
      // console.log('action.params', action.params);
      return {
        ...state, ...action.params
      };
    }
    case SET_LOADER: {
      // console.log('action.params', action.params);
      return {
        ...state, loader: action.params
      };
    }
    case ADD_QUIZ: {
      return {
        ...state
      };
    }
    case SET_QUIZ: {
      let listQuizes = [...state.listQuizes];
      listQuizes[action.payload.index] = action.payload.quiz;
      return {
        ...state, listQuizes: [...listQuizes]
      };
    }
    case DEL_QUIZ: {
      let listQuizes = [...state.listQuizes];
      listQuizes.splice(action.payload.index, 1);
      return {
        ...state, listQuizes: [...listQuizes]
      }
    }
    case CLEAR_QUESTIONS: {
      return {
        ...state, questions: []
      }
    }
    case ADD_QUESTIONS: {
      return {
        ...state
      }
    }
    case SET_QUESTIONS: {
      let questions = [...state.questions];
      questions[action.payload.index] = action.payload.question;
      return {
        ...state, questions: [...questions]
      };
    }
    case DEL_QUESTIONS: {
      let questions = [...state.questions];
      questions.splice(action.payload.index, 1);
      return {
        ...state, questions: [...questions]
      }

    }
    case CLEAR_ANSWERS: {
      return {
        ...state, answers: []
      }
    }
    case ADD_ANSWERS: {
      return {
        ...state
      }
    }
    case SET_ANSWERS: {
      let answers = [...state.answers];
      answers[action.payload.index] = action.payload.answer;
      return {
        ...state, answers: [...answers]
      };
    }
    case DEL_ANSWERS: {
      let answers = [...state.answers];
      answers.splice(action.payload.index, 1);
      return {
        ...state, answers: [...answers]
      }

    }
    default :
      return state
  }
}
