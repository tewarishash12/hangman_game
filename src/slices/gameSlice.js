import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
    name: "game",
    initialState: {
        blanks:"",
        lives: 4,
        wrongGuesses: [],
        score: 0
    },
    reducers: {
        initialize_blanks: (state, {payload}) =>{
            state.blanks = "_ ".repeat(payload.currentWord.length).trim();
            if(state.lives===0){
                state.score = 0;
                state.lives = 4;
            } else if(state.score>0) {
                state.lives += 1;
            }
            state.wrongGuesses = [];
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
            } else {
                if(!state.wrongGuesses.includes(payload.guessedLetter)){
                    state.lives -= 1;
                    state.wrongGuesses.push(payload.guessedLetter);
                }
            }
        },
        check_game_won: (state) =>{
            if(!state.blanks.includes("_")){
                state.score += 1;
            }
        }
    }
})

export const { initialize_blanks,check_word_guess,check_game_won } = gameSlice.actions;
export default gameSlice.reducer