import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialHighScores = JSON.parse(localStorage.getItem("highScores")) || [];

const scoreSlice = createSlice({
    name:"score",
    initialState: {
        highScore: initialHighScores,
    },
    reducers: {
        check_score: (state,{payload}) =>{
            state.highScore.push({id: nanoid(), score: payload.score});
            state.highScore.sort((a,b)=> b.score-a.score);

            if(state.highScore.length>3)
                state.highScore.pop();

            localStorage.setItem("highScores", JSON.stringify(state.highScore))
        }
    }
})

export const {check_score} = scoreSlice.actions;
export default scoreSlice.reducer;