import { createSlice } from "@reduxjs/toolkit";
import gameQues from "./wordDatabase";

const gameSlice = createSlice({
    name: "game",
    initialState: {
        currentWord: null,
        blanks: "",
        lives: 4,
        allGuesses: [],
        score: 0,
        usedWords: []
    },
    reducers: {
        initialize_game: (state) => {
            const avaliableWords = gameQues.filter(ques => !state.usedWords.includes(ques.id));

            const randomWord = avaliableWords[Math.floor(Math.random() * avaliableWords.length)]
            state.currentWord = randomWord;
            state.usedWords.push(randomWord.id)

            const blankArray = Array(state.currentWord.word.length).fill("_");
            state.blanks = blankArray.join(" ");

            if (state.lives === 0) {
                state.score = 0;
                state.lives = 4;
                state.usedWords = [];
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
            } else if (state.lives === 0) {
                state.allGuesses = Array.from("qwertyuiopasdfghjklzxcvbnm");
            }
        },
        restart_game: (state) => {
            state.currentWord = null;
            state.blanks = "";
            state.lives = 4;
            state.allGuesses = [];
            state.score = 0;
            state.usedWords = [];
        }
    }
})

export const { initialize_game, check_word_guess, check_game_won, restart_game } = gameSlice.actions;
export default gameSlice.reducer