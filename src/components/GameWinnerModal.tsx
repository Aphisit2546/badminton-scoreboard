'use client';

import { Trophy, ChevronRight } from 'lucide-react';

interface GameWinnerModalProps {
    winnerName: string;
    scoreA: number;
    scoreB: number;
    currentSet: number;
    onNextSet: () => void;
}

export default function GameWinnerModal({
    winnerName,
    scoreA,
    scoreB,
    currentSet,
    onNextSet
}: GameWinnerModalProps) {
    return (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl shadow-2xl text-center max-w-sm w-full border border-slate-700">
                {/* Trophy */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-4 shadow-lg">
                    <Trophy className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h2 className="text-xl text-slate-400 mb-1">Game {currentSet} Winner</h2>
                <h1 className="text-2xl md:text-3xl font-black text-white mb-4">
                    {winnerName}
                </h1>

                {/* Score */}
                <div className="bg-slate-700/50 rounded-xl p-4 mb-6">
                    <p className="text-slate-400 text-sm mb-1">Game Score</p>
                    <p className="text-4xl font-black text-white">
                        {scoreA} - {scoreB}
                    </p>
                </div>

                {/* Next Set Button */}
                <button
                    onClick={onNextSet}
                    className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
                >
                    <span>เริ่มเกมถัดไป</span>
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
