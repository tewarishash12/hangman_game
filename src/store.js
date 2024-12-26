import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./slices/gameSlice";
import scoreReducer from "./slices/scoreSlice"

const store = configureStore({
    reducer: {
        game: gameReducer,
        score: scoreReducer
    }
})

export default store;