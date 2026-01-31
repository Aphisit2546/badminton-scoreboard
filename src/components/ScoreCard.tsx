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
    // Animation state
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

    // Logic การแสดงฝั่งเสิร์ฟ
    const serveSide = getServeSide(score);

    const bgGradient = color === 'blue'
        ? 'bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800'
        : 'bg-gradient-to-br from-red-600 via-red-700 to-red-800';

    const textClass = color === 'blue' ? 'text-blue-100' : 'text-red-100';
    const accentColor = color === 'blue' ? 'bg-blue-400' : 'bg-red-400';

    return (
        <div
            onClick={disabled ? undefined : onClick}
            className={`relative flex flex-col items-center justify-between flex-1 h-full p-4 md:p-6 transition-all duration-200 select-none ${bgGradient} ${winner ? 'ring-8 ring-yellow-400 z-10' : ''
                } ${disabled ? 'opacity-60 cursor-not-allowed' : 'active:scale-[0.98] cursor-pointer hover:brightness-110'
                }`}
        >
            {/* Serve Side Highlight */}
            {isServing && (
                <div className={`absolute top-0 left-0 right-0 h-1 ${accentColor} animate-pulse`} />
            )}

            {/* Header: Name & Sets */}
            <div className={`w-full flex justify-between items-start ${textClass}`}>
                <div className="flex flex-col">
                    <span className="text-lg md:text-2xl font-bold opacity-90 truncate max-w-[150px] md:max-w-xs">
                        {name}
                    </span>
                    <div className="flex gap-1.5 mt-2">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className={`w-4 h-4 rounded-full shadow-sm transition-all duration-300 ${i < sets
                                        ? 'bg-yellow-400 scale-110'
                                        : 'bg-white/20'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
                {winner && <Trophy className="text-yellow-400 w-8 h-8 md:w-10 md:h-10 animate-bounce" />}
            </div>

            {/* Main Score */}
            <div className="flex-1 flex items-center justify-center my-4">
                <span
                    className={`text-[7rem] md:text-[10rem] lg:text-[12rem] font-black leading-none text-white drop-shadow-lg transition-transform duration-300 ${animating ? 'scale-110' : 'scale-100'
                        }`}
                >
                    {score}
                </span>
            </div>

            {/* Serve Indicator */}
            <div className="w-full flex justify-between items-center text-xs md:text-sm font-semibold uppercase tracking-wider">
                <div className={`flex items-center gap-1 px-2 py-1 rounded transition-all ${isServing && serveSide === 'LEFT'
                        ? 'bg-white/30 text-white'
                        : 'text-white/30'
                    }`}>
                    <span className="w-2 h-2 rounded-full bg-current" />
                    <span>L</span>
                </div>

                {isServing && (
                    <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        <span className="text-white font-bold">SERVE</span>
                    </div>
                )}

                <div className={`flex items-center gap-1 px-2 py-1 rounded transition-all ${isServing && serveSide === 'RIGHT'
                        ? 'bg-white/30 text-white'
                        : 'text-white/30'
                    }`}>
                    <span>R</span>
                    <span className="w-2 h-2 rounded-full bg-current" />
                </div>
            </div>
        </div>
    );
}