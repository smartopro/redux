import {types} from "./types.js";

export const increment = () => { return { type: types.INCREMENT } };
export const decrement = () => { return { type: types.DECREMENT } };

export function asyncIncrement () {
    return dispatch => {
        dispatch(blockButtons(true));
        setTimeout(() => {
            dispatch(increment())
            dispatch(blockButtons(false));
        }, 1500);
    }
}

export const changeTheme = newTheme => {
    return {
        type: types.CHANGE_THEME,
        payload: newTheme
    }
}

export const blockButtons = block => {
    return {
        type: types.BLOCK_BUTTONS,
        payload: block
    }
}
