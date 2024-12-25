import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { display_guessing_word } from "../slices/wordSlice"
import { initialize_blanks } from "../slices/gameSlice";


function HomePage() {
    const dispatch = useDispatch();
    const currentWord = useSelector((state) => state.word.currentWord);

    return (
        <div className="flex h-full">
            <main className="flex-1 bg-gray-900 text-white p-8 overflow-auto h-full">
                <div className="container mx-auto">
                    <div className="flex flex-col items-center justify-center h-full">
                        <h1 className="text-5xl font-extrabold text-center mb-8">Welcome to Hangman Game</h1>
                        <p className="text-lg text-center mb-12">
                            Guess the word before the man is hung! Can you save him?
                        </p>

                        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-12">
                            <h2 className="text-3xl font-bold mb-4 text-center">Game Rules</h2>
                            <ul className="list-disc list-inside text-lg leading-8 text-gray-300">
                                <li>Start with <span className="text-yellow-500">3 lives</span>.</li>
                                <li>Earn <span className="text-green-500">+1 life</span> for each correct guess.</li>
                                <li>Maintain a high score to compete with others.</li>
                            </ul>
                        </div>

                        <div className="flex flex-col items-center gap-6">
                            <Link
                                to='/playgame'
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full text-xl transition-all duration-300"
                                onClick={() => {
                                    dispatch(display_guessing_word())
                                    dispatch(initialize_blanks({ currentWord: currentWord.word }))
                                }}
                            >
                                Play Game
                            </Link>
                            <Link to='/highscore' className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full text-xl transition-all duration-300">
                                View High Scores
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HomePage;
