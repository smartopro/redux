import './styles.css'
import {applyMiddleware, createStore, compose} from "redux";
import thunk from "redux-thunk";
import logger from 'redux-logger';
import {rootReducer} from "./redux/rootReducer.js";
import {increment, decrement, asyncIncrement, changeTheme} from "./redux/actions.js";

const $counter = document.querySelector("#counter");
const $addBtn = document.querySelector("#add");
const $subBtn = document.querySelector("#sub");
const $asyncBtn = document.querySelector("#async");
const $themeBtn = document.querySelector("#theme");

// const logger = state => {
//     return next => {
//         return action => {
//             console.log("Action: ", action);
//             console.log("State: ", state);
//             return next(action);
//         }
//     }
// }

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk, logger),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

$addBtn.addEventListener("click", () => {
    store.dispatch(increment())
});

$subBtn.addEventListener("click", () => {
    store.dispatch(decrement())
});

$asyncBtn.addEventListener("click", () => {
    store.dispatch(asyncIncrement());
});

$themeBtn.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("light") ? "dark" : "light";
    store.dispatch(changeTheme(newTheme));
});

store.subscribe(() => {
    const state = store.getState();

    // render store
    $counter.textContent = state.counter;
    document.body.className = state.theme.value;
    [$addBtn, $subBtn, $themeBtn, $asyncBtn].forEach(item => item.disabled = state.theme.disabled);
});

store.dispatch({type: "INIT_APPLICATION"})
