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
        ],
        currentWord:null,
        blanks:"",
        lives: 4,
        wrongGuesses: [],
        isGameWon: false
    },
    reducers: {
        display_guessing_word: (state) =>{
            const randomWord = state.gameQues[Math.floor(Math.random()*state.gameQues.length)]
            state.currentWord = randomWord;
            state.blanks = "_ ".repeat(randomWord.word.length).trim();
            state.wrongGuesses=[];
            state.isGameWon = false;
            state.lives = 4;
        },
        check_word_guess: (state,{payload}) =>{
            if(state.currentWord.word.includes(payload.word)){
                const blankArray = state.blanks.split(" ");
                const activeWord = state.currentWord.word.split("");

                activeWord.forEach((char, index) => {
                    if(char === payload.word)
                        blankArray[index] = payload.word;
                });
                state.blanks = blankArray.join(' ');
                if(!state.blanks.includes("_")){
                    state.isGameWon = true;
                }
            } else {
                if(!state.wrongGuesses.includes(payload.word)){
                    state.lives -= 1;
                    state.wrongGuesses.push(payload.word);
                }
            }
        }
    }
})

export const { display_guessing_word, check_word_guess } = gameSlice.actions;
export default gameSlice.reducer