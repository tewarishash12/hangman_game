import React from "react";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux"
import { display_guessing_word, check_word_guess } from "../slices/gameSlice";

function Hangman({ isCollapsed, setIsCollapsed }) {
    const dispatch = useDispatch();
    const virtualKeyboard = "qwertyuiopasdfghjklzxcvbnm";
    const currentWord = useSelector((state) => state.game.currentWord);
    const blanks = useSelector((state) => state.game.blanks);
    const lives = useSelector((state) => state.game.lives);
    const wrongGuesses = useSelector((state) => state.game.wrongGuesses);
    const checkWin = useSelector((state) => state.game.isGameWon);

    if (!currentWord) {
        dispatch(display_guessing_word());
    }

    function guessedWord(word) {
        dispatch(check_word_guess({ word: word }));
    }

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
                        <p>{lives} lives left to find answer</p>
                    </div>

                    <div className="grid grid-cols-7 gap-4">
                        {lives>0 && (virtualKeyboard.split("").map((letter, index) => (
                            <button
                                key={index}
                                className={`py-2 px-4 rounded-md font-semibold
                                    ${lives<=0 || checkWin ? 
                                        "bg-gray-500 cursor-not-allowed" : 
                                        wrongGuesses.includes(letter) || blanks.includes(letter)
                                        ? "bg-gray-500 cursor-not-allowed"
                                        : "bg-blue-500 hover:bg-blue-600"
                                    }`}
                                value={letter}
                                onClick={(e) => guessedWord(e.target.value)}
                                disabled={wrongGuesses.includes(letter) || blanks.includes(letter)}
                            >
                                {letter}
                            </button>
                        )))}
                    </div>

                    <div className="mt-8 text-center">
                        {lives === 0 &&
                            <>
                                <p className="text-red-500 text-2xl font-bold">Game Over! The word was {currentWord.word}.</p>
                                <button
                                    className="mt-4 bg-green-500 hover:bg-green-600 py-2 px-6 rounded-md text-xl font-semibold"
                                    onClick={()=>dispatch(display_guessing_word())}
                                >
                                    Play Again
                                </button>
                            </>
                        }
                        {checkWin &&
                            <>
                                <p className="text-blue-500 text-2xl font-bold">Congrats you guessed the correct word</p>
                                <button
                                    className="mt-4 bg-green-500 hover:bg-green-600 py-2 px-6 rounded-md text-xl font-semibold"
                                    onClick={()=>dispatch(display_guessing_word())}
                                >
                                    Play Again
                                </button>
                            </>
                        }
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Hangman;