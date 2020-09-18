import './styles.css'
import {createStore} from "./createStore";

const $counter = document.querySelector("#counter");
const $addBtn = document.querySelector("#add");
const $subBtn = document.querySelector("#sub");
const $asyncBtn = document.querySelector("#async");
const $themeBtn = document.querySelector("#theme");

const store = createStore();

$addBtn.addEventListener("click", () => {

});

$subBtn.addEventListener("click", () => {

});

$asyncBtn.addEventListener("click", () => {

});

$themeBtn.addEventListener("click", () => {
    // document.body.classList.toggle("dark");
});
