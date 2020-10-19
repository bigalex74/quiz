import {SET_FIREBASE} from "../actions/actionTypes";

const initialState = {
    db: null,           // база данных
    auth: null,         // параметр аутентификации пользователя
    error: null,
    user: null
};


export default function firebaseReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FIREBASE: return {
            ...state, ...action.params
        };
        default : return state
    }
}