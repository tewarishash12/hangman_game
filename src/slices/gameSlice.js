import { createSlice, nanoid } from "@reduxjs/toolkit";

const gameSlice = createSlice({
    name: "game",
    initialState: {
        gameQues: [
            {
                id: nanoid(),
                word: "planet",
                hint: "A celestial body orbiting a star, like Earth.",
            },
            {
                id: nanoid(),
                word: "ocean",
                hint: "A vast body of saltwater covering most of the Earth.",
            },
            {
                id: nanoid(),
                word: "puzzle",
                hint: "A game or problem designed to test your ingenuity.",
            },
            {
                id: nanoid(),
                word: "bridge",
                hint: "A structure built to span a physical obstacle like a river.",
            },
            {
                id: nanoid(),
                word: "guitar",
                hint: "A musical instrument with strings, often played with a pick.",
            }
        ]
    },
    reducers: {
        display_guessing_word: (state) =>{
            const randomWord = state.gameQues[Math.floor(Math.random()*state.gameQues.length)]
            state.currentWord = randomWord;
            state.blanks = "_ ".repeat(randomWord.word.length).trim();
        }
    }
})

export const { display_guessing_word } = gameSlice.actions;
export default gameSlice.reducer