'use client';

import { GameState } from '@/lib/logic';

interface AlertBannerProps {
    gameState: GameState;
    className?: string;
}

export default function AlertBanner({ gameState, className = '' }: AlertBannerProps) {
    if (gameState === 'PLAYING' || gameState === 'WINNER') {
        return null;
    }

    const configs: Record<Exclude<GameState, 'PLAYING' | 'WINNER'>, {
        text: string;
        bgClass: string;
        emoji: string;
    }> = {
        DEUCE: {
            text: 'DEUCE',
            bgClass: 'bg-gradient-to-r from-orange-500 to-yellow-500',
            emoji: '⚡'
        },
        GAME_POINT: {
            text: 'GAME POINT',
            bgClass: 'bg-gradient-to-r from-green-500 to-emerald-500',
            emoji: '🎯'
        },
        MATCH_POINT: {
            text: 'MATCH POINT',
            bgClass: 'bg-gradient-to-r from-red-500 to-pink-500',
            emoji: '🔥'
        }
    };

    const config = configs[gameState];

    return (
        <div className={`absolute left-1/2 -translate-x-1/2 z-30 ${className}`}>
            <div className={`${config.bgClass} px-4 py-2 rounded-full shadow-lg animate-pulse flex items-center gap-2`}>
                <span className="text-lg">{config.emoji}</span>
                <span className="text-white font-bold text-sm md:text-base tracking-wider">
                    {config.text}
                </span>
                <span className="text-lg">{config.emoji}</span>
            </div>
        </div>
    );
}
