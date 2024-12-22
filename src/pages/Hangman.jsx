import React from "react";
import Sidebar from "../components/Sidebar";
import { useDispatch,useSelector } from "react-redux"
import {display_guessing_word} from "../slices/gameSlice";

function Hangman({ isCollapsed, setIsCollapsed }) {

    const dispatch = useDispatch();
    const currentWord = useSelector((state)=> state.game.currentWord);
    const blanks = useSelector((state)=>state.game.blanks);

    dispatch(display_guessing_word());

    return (
        <div className="flex">
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <main className="flex-1 bg-gray-900 text-white p-8 overflow-auto">
                <div className="flex flex-col items-center justify-center h-full">
                    <h1 className="text-4xl font-bold mb-6">Hangman Game</h1>
                    
                    <div className="mb-4 text-2xl">
                        <p>{blanks}</p>
                    </div>

                    {currentWord && <div className="mb-4 text-2xl">
                        <p>{currentWord.hint}</p>
                    </div>}
                    
                    <div className="mb-6">
                        <p>Wrong Guesses: 2/6</p>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-4">
                        {"abcdefghijklmnopqrstuvwxyz".split("").map((letter, index) => (
                            <button
                                key={index}
                                className={`py-2 px-4 rounded-md font-semibold ${
                                    ["a", "b", "c"].includes(letter)
                                        ? "bg-gray-500 cursor-not-allowed"
                                        : "bg-blue-500 hover:bg-blue-600"
                                }`}
                                disabled={["a", "b", "c"].includes(letter)}
                            >
                                {letter}
                            </button>
                        ))}
                    </div>
                    
                    <div className="mt-8 text-center">
                        <p className="text-red-500 text-2xl font-bold">Game Over! The word was "react".</p>
                        <button
                            className="mt-4 bg-green-500 hover:bg-green-600 py-2 px-6 rounded-md text-xl font-semibold"
                        >
                            Play Again
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Hangman;
