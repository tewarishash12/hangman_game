import { createSlice } from "@reduxjs/toolkit";
import gameQues from "./wordDatabase";

const gameSlice = createSlice({
    name: "game",
    initialState: {
        currentWord: null,
        blanks: "",
        lives: 4,
        allGuesses: [],
        score: 0
    },
    reducers: {
        initialize_game: (state) => {
            const randomWord = gameQues[Math.floor(Math.random() * gameQues.length)]
            state.currentWord = randomWord;
            const blankArray = Array(state.currentWord.word.length).fill("_");
            state.blanks = blankArray.join(" ");
            if (state.lives === 0) {
                state.score = 0;
                state.lives = 4;
            } else if (state.score > 0) {
                state.lives += 1;
            }
            state.allGuesses = [];
        },
        check_word_guess: (state, { payload }) => {
            if (!state.allGuesses.includes(payload.guessedLetter))
                state.allGuesses.push(payload.guessedLetter);

            if (state.currentWord.word.includes(payload.guessedLetter)) {
                const blankArray = state.blanks.split(" ");
                const activeWord = state.currentWord.word.split("");

                activeWord.forEach((char, index) => {
                    if (char === payload.guessedLetter)
                        blankArray[index] = payload.guessedLetter;
                });

                state.blanks = blankArray.join(' ');
            } else {
                state.lives -= 1;
            }
        },
        check_game_won: (state) => {
            if (!state.blanks.includes("_")) {
                state.score += 1;
                state.allGuesses = Array.from("qwertyuiopasdfghjklzxcvbnm");
            } else if(state.lives===0){
                state.allGuesses = Array.from("qwertyuiopasdfghjklzxcvbnm");
            }
        },
        diabled_letters: (state) => {

        }
    }
})

export const { initialize_game, check_word_guess, check_game_won } = gameSlice.actions;
export default gameSlice.reducer