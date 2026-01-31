'use client';

import { Trophy, RotateCcw, Home } from 'lucide-react';

interface GameScoreHistory {
    scoreA: number;
    scoreB: number;
}

interface MatchWinnerModalProps {
    winnerName: string;
    finalSetsA: number;
    finalSetsB: number;
    gameScores: GameScoreHistory[];
    currentGameScore: { scoreA: number; scoreB: number };
    onNewMatch: () => void;
    onBackToSetup: () => void;
}

export default function MatchWinnerModal({
    winnerName,
    finalSetsA,
    finalSetsB,
    gameScores,
    currentGameScore,
    onNewMatch,
    onBackToSetup
}: MatchWinnerModalProps) {
    // รวมคะแนนเกมสุดท้ายด้วย
    const allGameScores = [...gameScores, currentGameScore];

    return (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            {/* Celebration particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-3 h-3 rounded-full animate-bounce"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            backgroundColor: ['#fbbf24', '#f97316', '#ef4444', '#22c55e', '#3b82f6'][i % 5],
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${1 + Math.random()}s`
                        }}
                    />
                ))}
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl shadow-2xl text-center max-w-md w-full border border-slate-700 relative">
                {/* Trophy Icon */}
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6 shadow-xl animate-bounce">
                    <Trophy className="w-12 h-12 text-white" />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-slate-300 mb-2">
                    🎉 CONGRATULATIONS! 🎉
                </h2>

                {/* Winner Name */}
                <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">
                    {winnerName}
                </h1>
                <p className="text-xl text-white font-semibold mb-6">
                    WINS THE MATCH!
                </p>

                {/* Final Score */}
                <div className="bg-slate-700/50 rounded-xl p-4 mb-6">
                    <p className="text-slate-400 text-sm mb-2">Final Score</p>
                    <p className="text-4xl font-black text-white">
                        {finalSetsA} - {finalSetsB}
                    </p>

                    {/* Game Scores */}
                    <div className="flex justify-center gap-3 mt-3">
                        {allGameScores.map((game, i) => (
                            <div key={i} className="bg-slate-600/50 px-3 py-1 rounded-lg">
                                <span className="text-sm text-slate-300">
                                    {game.scoreA}-{game.scoreB}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                    <button
                        onClick={onNewMatch}
                        className="w-full py-4 px-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <RotateCcw className="w-5 h-5" />
                        <span>เริ่มแมตช์ใหม่ (เลือกประเภทใหม่)</span>
                    </button>

                    <button
                        onClick={onBackToSetup}
                        className="w-full py-3 px-6 bg-slate-700 text-slate-300 font-semibold rounded-xl hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
                    >
                        <Home className="w-5 h-5" />
                        <span>กลับหน้าหลัก</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
