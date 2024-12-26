import React from 'react'
import { useSelector } from 'react-redux'

function HighScore() {
    // Accessing the high scores from the Redux store
    const highScores = useSelector(state => state.score.highScore);
    console.log(highScores)

    return (
        <div className="p-8 bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-6 text-center">High Scores</h1>
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg w-full max-w-md">
                {highScores && highScores.length === 0 ? (
                    <p className="text-xl text-center text-gray-400">No high scores yet.</p>
                ) : (
                    <ol className="space-y-4">
                        {highScores.map(({ id, score }, index) => (
                            <li
                                key={id}
                                className="flex justify-between items-center text-lg bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition"
                            >
                                <span className="font-semibold text-gray-300">#{index + 1}</span>
                                <span className="text-gray-100">{score}</span>
                            </li>
                        ))}
                    </ol>
                )}
            </div>
        </div>
    )
}

export default HighScore;