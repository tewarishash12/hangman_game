import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { initialize_game, check_word_guess, check_game_won } from "../slices/gameSlice";

function Hangman() {
    const dispatch = useDispatch();
    const currentWord = useSelector((state) => state.game.currentWord);
    const blanks = useSelector((state) => state.game.blanks);
    const lives = useSelector((state) => state.game.lives);
    const wrongGuesses = useSelector((state) => state.game.wrongGuesses);
    const score = useSelector((state)=> state.game.score)

    if (!currentWord) {
        dispatch(initialize_game());
    }

    function guessedLetter(letter) {
        dispatch(check_word_guess({ guessedLetter: letter }));
        dispatch(check_game_won())
    }

    return (
        <div className="flex h-full">
            <main className="flex-1 bg-gray-900 text-white p-8 overflow-auto h-full">
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

                    <div className="mb-4">
                        <p>Score: {score}</p>
                    </div>

                    <div className="flex justify-center items-center gap-y-2 flex-col h-[20vh] ">
                        <div className="grid grid-cols-10 gap-4">
                            {["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map((letter, index) => (
                                <button
                                    key={index}
                                    className={`py-2 px-4 rounded-md font-semibold
                                    ${lives <= 0 || (lives>0 && !blanks.includes("_"))
                                            ? "bg-gray-500 cursor-not-allowed"
                                            : wrongGuesses.includes(letter) || blanks.includes(letter)
                                                ? "bg-gray-500 cursor-not-allowed"
                                                : "bg-blue-500 hover:bg-blue-600"
                                        }`}
                                    value={letter}
                                    onClick={(e) => guessedLetter(e.target.value)}
                                    disabled={
                                        lives <= 0 || (lives>0 && !blanks.includes("_"))
                                            ? "qwertyuiopasdfghjklzxcvbnm".includes(letter)
                                            : wrongGuesses.includes(letter) || blanks.includes(letter)
                                    }
                                >
                                    {letter}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-9 gap-4">
                            {["a", "s", "d", "f", "g", "h", "j", "k", "l"].map((letter, index) => (
                                <button
                                    key={index}
                                    className={`py-2 px-4 rounded-md font-semibold
                                        ${lives <= 0 || (lives>0 && !blanks.includes("_"))
                                            ? "bg-gray-500 cursor-not-allowed"
                                            : wrongGuesses.includes(letter) || blanks.includes(letter)
                                                ? "bg-gray-500 cursor-not-allowed"
                                                : "bg-blue-500 hover:bg-blue-600"
                                        }`}
                                    value={letter}
                                    onClick={(e) => guessedLetter(e.target.value)}
                                    disabled={
                                        lives <= 0 || (lives>0 && !blanks.includes("_"))
                                            ? "qwertyuiopasdfghjklzxcvbnm".includes(letter)
                                            : wrongGuesses.includes(letter) || blanks.includes(letter)
                                    }
                                >
                                    {letter}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-4">
                            {["z", "x", "c", "v", "b", "n", "m"].map((letter, index) => (
                                <button
                                    key={index}
                                    className={`py-2 px-4 rounded-md font-semibold
                                    ${lives <= 0 || (lives>0 && !blanks.includes("_"))
                                            ? "bg-gray-500 cursor-not-allowed"
                                            : wrongGuesses.includes(letter) || blanks.includes(letter)
                                                ? "bg-gray-500 cursor-not-allowed"
                                                : "bg-blue-500 hover:bg-blue-600"
                                        }`}
                                    value={letter}
                                    onClick={(e) => guessedLetter(e.target.value)}
                                    disabled={
                                        lives <= 0 || (lives>0 && !blanks.includes("_"))
                                            ? "qwertyuiopasdfghjklzxcvbnm".includes(letter)
                                            : wrongGuesses.includes(letter) || blanks.includes(letter)
                                    }
                                >
                                    {letter}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        {lives === 0 && blanks.includes("_") &&
                            <>
                                <p className="text-red-500 text-2xl font-bold">Game Over! The word was {currentWord.word}.</p>
                                <button
                                    className="mt-4 bg-green-500 hover:bg-green-600 py-2 px-6 rounded-md text-xl font-semibold"
                                    onClick={() => {
                                        dispatch(initialize_game())
                                    }}
                                >
                                    Play Again
                                </button>
                            </>
                        }
                        {lives>0 && !blanks.includes("_") &&
                            <>
                                <p className="text-blue-500 text-2xl font-bold">Congrats you guessed the correct word</p>
                                <button
                                    className="mt-4 bg-green-500 hover:bg-green-600 py-2 px-6 rounded-md text-xl font-semibold"
                                    onClick={() => {
                                        dispatch(initialize_game())
                                    }}
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