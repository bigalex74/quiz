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
    case SET_FIREBASE:
      return {
        ...state, ...action.params
      };
    case ADD_QUIZ: {
      let listQuizes = [...state.listQuizes];
      listQuizes.push(action.quiz);
      return {
        ...state, listQuizes: [...listQuizes]
      };
    }
    case SET_QUIZ: {
      let listQuizes = [...state.listQuizes];
      listQuizes[action.payload.index] = action.payload.quiz;
      // console.log(listQuizes);
      return {
        ...state, listQuizes: [...listQuizes]
      };
    }
    case DEL_QUIZ: {
      let listQuizes = [...state.listQuizes];
      // console.log('del', listQuizes, action.payload.index);
      listQuizes.splice(action.payload.index, 1);
      // console.log('del', listQuizes);
      // console.log(listQuizes);
      return {
        ...state, listQuizes: [...listQuizes]
      }
    }
    default :
      return state
  }
}
