import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./slices/gameSlice";
import wordReducer from "./slices/wordSlice"

const store = configureStore({
    reducer: {
        word: wordReducer,
        game: gameReducer
    }
})

export default store;