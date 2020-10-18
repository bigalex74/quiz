import {SET_FIREBASE} from "../actions/actionTypes";

const initialState = {
    db: null,           // база данных
    auth: null          // параметр аутентификации пользователя
};


export default function firebaseReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FIREBASE: return {
            ...state, db: action.params.db, auth: action.params.auth
        };
        default : return state
    }
}