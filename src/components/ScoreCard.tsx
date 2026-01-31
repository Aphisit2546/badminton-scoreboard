'use client';

import { useEffect, useState, useRef } from 'react';
import { getServeSide } from '@/lib/logic';
import { Trophy } from 'lucide-react';

interface ScoreCardProps {
    name: string;
    score: number;
    sets: number;
    color: 'blue' | 'red';
    isServing: boolean;
    onClick: () => void;
    winner?: boolean;
    disabled?: boolean;
}

export default function ScoreCard({
    name,
    score,
    sets,
    color,
    isServing,
    onClick,
    winner,
    disabled
}: ScoreCardProps) {
    const [animating, setAnimating] = useState(false);
    const prevScoreRef = useRef(score);

    useEffect(() => {
        if (score !== prevScoreRef.current && score > prevScoreRef.current) {
            setAnimating(true);
            const timer = setTimeout(() => setAnimating(false), 300);
            prevScoreRef.current = score;
            return () => clearTimeout(timer);
        }
        prevScoreRef.current = score;
    }, [score]);

    const serveSide = getServeSide(score);

    const bgGradient = color === 'blue'
        ? 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800'
        : 'bg-gradient-to-br from-red-600 via-red-700 to-red-800';

    const accentColor = color === 'blue' ? 'bg-blue-400' : 'bg-red-400';

    return (
        <button
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            className={`
                relative flex-1 flex flex-col items-center justify-between p-4 md:p-6 
                transition-all duration-200 select-none overflow-hidden
                ${bgGradient}
                ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer active:scale-[0.98] hover:brightness-110'}
                ${winner ? 'ring-4 ring-yellow-400 z-10' : ''}
            `}
        >
            {/* Serve Indicator Line */}
            {isServing && (
                <div className={`absolute top-0 left-0 right-0 h-1 ${accentColor} animate-pulse`} />
            )}

            {/* Header */}
            <div className="relative z-10 w-full flex justify-between items-start text-white">
                <div className="flex flex-col items-start">
                    <span className="text-base md:text-xl font-bold truncate max-w-[120px] md:max-w-[200px] opacity-90">
                        {name}
                    </span>
                    {/* Sets Won */}
                    <div className="flex gap-1.5 mt-2">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${i < sets
                                        ? 'bg-yellow-400 scale-100'
                                        : 'bg-white/20 scale-75'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Winner Badge */}
                {winner && (
                    <Trophy className="text-yellow-400 w-8 h-8 md:w-10 md:h-10 animate-bounce" />
                )}
            </div>

            {/* Score */}
            <div className="relative z-10 flex-1 flex items-center justify-center my-2 md:my-4">
                <span
                    className={`
                        text-[6rem] md:text-[9rem] lg:text-[11rem] 
                        font-black leading-none text-white drop-shadow-lg
                        transition-transform duration-300
                        ${animating ? 'scale-110' : 'scale-100'}
                    `}
                >
                    {score}
                </span>
            </div>

            {/* Serve Side Indicator */}
            <div className="relative z-10 w-full flex justify-between items-center text-xs md:text-sm font-bold uppercase text-white/60">
                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg transition-all ${isServing && serveSide === 'LEFT' ? 'bg-white/20 text-white' : ''
                    }`}>
                    <div className={`w-2 h-2 rounded-full ${isServing && serveSide === 'LEFT' ? accentColor : 'bg-white/30'
                        }`} />
                    <span>L</span>
                </div>

                {isServing && (
                    <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        <span className="text-white">SERVE</span>
                    </div>
                )}

                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg transition-all ${isServing && serveSide === 'RIGHT' ? 'bg-white/20 text-white' : ''
                    }`}>
                    <span>R</span>
                    <div className={`w-2 h-2 rounded-full ${isServing && serveSide === 'RIGHT' ? accentColor : 'bg-white/30'
                        }`} />
                </div>
            </div>
        </button>
    );
}