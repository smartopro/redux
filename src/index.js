// import './styles.css'
//
// const $counter = document.querySelector("#counter");
// const $addBtn = document.querySelector("#add");
// const $subBtn = document.querySelector("#sub");
// const $asyncBtn = document.querySelector("#async");
// const $themeBtn = document.querySelector("#theme");
//
// let state = 0;
//
// function render() {
//     $counter.textContent = state+"";
// }
//
// $addBtn.addEventListener("click", () => {
//     state++;
//     render();
// });
//
// $subBtn.addEventListener("click", () => {
//     state--;
//     render();
// });
//
// $asyncBtn.addEventListener("click", () => {
//     setTimeout(() => {
//         state++;
//         render();
//     }, 2000);
// });
//
// $themeBtn.addEventListener("click", () => {
//     document.body.classList.toggle("dark");
//     render();
// });
//
// render();

import './styles.css'
// import {createStore} from "./createStore.js";
import {applyMiddleware, createStore, compose} from "redux";
import thunk from "redux-thunk";
import logger from 'redux-logger';
import {rootReducer} from "./redux/rootReducer.js";
import {increment, decrement, asyncIncrement, changeTheme} from "./redux/actions.js";
import {types} from "./redux/types.js";


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
