'use client';

import { RotateCcw, Home, Trophy } from 'lucide-react';

interface GameScoreHistory {
    scoreA: number;
    scoreB: number;
}

interface MatchWinnerModalProps {
    winnerName: string;
    winnerColor: 'blue' | 'red';
    finalSetsA: number;
    finalSetsB: number;
    gameScores: GameScoreHistory[];
    currentGameScore: { scoreA: number; scoreB: number };
    onNewMatch: () => void;
    onBackToSetup: () => void;
}

export default function MatchWinnerModal({
    winnerName,
    winnerColor,
    finalSetsA,
    finalSetsB,
    gameScores,
    currentGameScore,
    onNewMatch,
    onBackToSetup
}: MatchWinnerModalProps) {
    // Only include current game if it has actual scores (not 0-0)
    const hasCurrentGameScore = currentGameScore.scoreA > 0 || currentGameScore.scoreB > 0;
    const allGameScores = hasCurrentGameScore
        ? [...gameScores, currentGameScore]
        : gameScores;

    return (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-hidden">
            {/* Celebration particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-3 h-3 rounded-full animate-bounce"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            backgroundColor: ['#eab308', '#f97316', '#ef4444', '#22c55e', '#3b82f6'][i % 5],
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${1 + Math.random()}s`
                        }}
                    />
                ))}
            </div>

            <div className="relative bg-white text-slate-900 p-8 rounded-3xl shadow-2xl text-center max-w-md w-full">
                {/* Trophy */}
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6 shadow-xl animate-bounce">
                    <Trophy className="w-12 h-12 text-white" />
                </div>

                {/* Title */}
                <p className="text-slate-500 text-sm mb-1">🎊 Champion 🎊</p>
                <h1 className={`text-3xl font-black mb-2 ${winnerColor === 'blue' ? 'text-blue-600' : 'text-red-600'
                    }`}>
                    {winnerName}
                </h1>
                <p className="text-slate-400 mb-6">ชนะการแข่งขัน!</p>

                {/* Final Score */}
                <div className="bg-slate-100 rounded-2xl p-5 mb-6">
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-3">Final Score</p>
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="text-5xl font-black text-blue-600">{finalSetsA}</div>
                        <div className="text-2xl text-slate-400">-</div>
                        <div className="text-5xl font-black text-red-600">{finalSetsB}</div>
                    </div>

                    {/* Game-by-game scores */}
                    <div className="flex justify-center gap-2 flex-wrap">
                        {allGameScores.map((game, i) => (
                            <div key={i} className="bg-white px-3 py-1.5 rounded-lg text-sm shadow">
                                <span className="text-blue-600 font-bold">{game.scoreA}</span>
                                <span className="text-slate-400 mx-1">-</span>
                                <span className="text-red-600 font-bold">{game.scoreB}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                    <button
                        onClick={onNewMatch}
                        className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-bold rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        <RotateCcw className="w-5 h-5" />
                        <span>แมตช์ใหม่ (ผู้เล่นเดิม)</span>
                    </button>

                    <button
                        onClick={onBackToSetup}
                        className="w-full py-3 bg-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-300 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        <Home className="w-5 h-5" />
                        <span>กลับหน้าตั้งค่า</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
