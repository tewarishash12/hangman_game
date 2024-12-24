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
        wrongGuesses: []
    },
    reducers: {
        display_guessing_word: (state) =>{
            const randomWord = state.gameQues[Math.floor(Math.random()*state.gameQues.length)]
            state.currentWord = randomWord;
            state.blanks = "_ ".repeat(randomWord.word.length).trim();
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
            } else {
                if(!state.wrongGuesses.includes(payload.word)){
                    state.lives -= 1;
                    state.wrongGuesses.push(payload.word);
                }
            }
        },
        check_win_condition: (state, {payload}) =>{
            if(state.lives !==0 && payload.blanks === state.currentWord){

            }
        }
    }
})

export const { display_guessing_word,check_word_guess } = gameSlice.actions;
export default gameSlice.reducer