import { atom, createStore } from "jotai";

const mainStore = createStore()

const darkMode = atom(false);

export default mainStore
export {
    darkMode,
}