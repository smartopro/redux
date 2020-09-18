import {types} from "./types.js";
import {combineReducers} from "redux";

function counterReducer(state = 0, action) {
    switch (action.type) {
        case types.INCREMENT: return state + 1;
        case types.DECREMENT: return state - 1;
        default: return state;
    }
}

function themeReducer(state = { value: "light" }, action) {
    switch(action.type) {
        case types.CHANGE_THEME: return {...state, value: action.payload};
        case types.BLOCK_BUTTONS: return {...state, disabled: action.payload};
        default: return state;
    }
}

export const rootReducer = combineReducers({
    counter: counterReducer,
    theme: themeReducer
})
