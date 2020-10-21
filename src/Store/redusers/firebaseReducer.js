import {ADD_QUIZ, DEL_QUIZ, SET_FIREBASE, SET_QUIZ} from "../actions/actionTypes";

const initialState = {
  db: null,           // база данных
  auth: null,         // параметр аутентификации пользователя
  error: null,
  user: null,
  listQuizes: []
};


export default function firebaseReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FIREBASE: {
      // console.log('action.params', action.params);
      return {
        ...state, ...action.params
      };
    }
    case ADD_QUIZ: {
      // let listQuizes = [...state.listQuizes];
      // console.log('listQuizes',listQuizes);
      // listQuizes.push(action.quiz);
      return {
        ...state //, listQuizes: [...listQuizes]
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
    default :
      return state
  }
}
