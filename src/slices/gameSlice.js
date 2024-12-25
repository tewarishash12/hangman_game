import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
    name: "game",
    initialState: {
        blanks:"",
        lives: 4,
        wrongGuesses: [],
        isGameWon: false
    },
    reducers: {
        initialize_blanks: (state, {payload}) =>{
            state.blanks = "_ ".repeat(payload.currentWord.length).trim();
            state.lives = 4;
            state.wrongGuesses = [];
            state.isGameWon = false;
        },
        check_word_guess: (state,{payload}) =>{
            if(payload.currentWord.includes(payload.guessedLetter)){
                const blankArray = state.blanks.split(" ");
                const activeWord = payload.currentWord.split("");

                activeWord.forEach((char, index) => {
                    if(char === payload.guessedLetter)
                        blankArray[index] = payload.guessedLetter;
                });

                state.blanks = blankArray.join(' ');
                if(!state.blanks.includes("_")){
                    state.isGameWon = true;
                }
            } else {
                if(!state.wrongGuesses.includes(payload.guessedLetter)){
                    state.lives -= 1;
                    state.wrongGuesses.push(payload.guessedLetter);
                }
            }
        }
    }
})

export const { initialize_blanks,check_word_guess } = gameSlice.actions;
export default gameSlice.reducer