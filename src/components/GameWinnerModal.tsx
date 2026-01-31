'use client';

import { Play, Trophy } from 'lucide-react';

interface GameWinnerModalProps {
    winnerName: string;
    winnerColor: 'blue' | 'red';
    scoreA: number;
    scoreB: number;
    currentSet: number;
    onNextSet: () => void;
}

export default function GameWinnerModal({
    winnerName,
    winnerColor,
    scoreA,
    scoreB,
    currentSet,
    onNextSet
}: GameWinnerModalProps) {
    return (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4">
            <div className="bg-white text-slate-900 p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full">
                {/* Trophy */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${winnerColor === 'blue' ? 'bg-blue-100' : 'bg-red-100'
                    }`}>
                    <Trophy className={`w-8 h-8 ${winnerColor === 'blue' ? 'text-blue-600' : 'text-red-600'
                        }`} />
                </div>

                {/* Title */}
                <p className="text-slate-500 text-sm mb-1">Game {currentSet} Winner</p>
                <h1 className={`text-2xl font-black mb-4 ${winnerColor === 'blue' ? 'text-blue-600' : 'text-red-600'
                    }`}>
                    {winnerName}
                </h1>

                {/* Score */}
                <div className="bg-slate-100 rounded-xl p-4 mb-6">
                    <p className="text-slate-500 text-xs mb-1">Game Score</p>
                    <p className="text-3xl font-black">
                        <span className="text-blue-600">{scoreA}</span>
                        <span className="text-slate-400 mx-2">-</span>
                        <span className="text-red-600">{scoreB}</span>
                    </p>
                </div>

                {/* Button */}
                <button
                    onClick={onNextSet}
                    className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                    <Play className="w-5 h-5 fill-current" />
                    <span>เริ่มเกมถัดไป</span>
                </button>
            </div>
        </div>
    );
}
