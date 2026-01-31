'use client';

import { GameState } from '@/lib/logic';

interface AlertBannerProps {
    gameState: GameState;
}

export default function AlertBanner({ gameState }: AlertBannerProps) {
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
            bgClass: 'bg-orange-500',
            emoji: '⚡'
        },
        GAME_POINT: {
            text: 'GAME POINT',
            bgClass: 'bg-green-500',
            emoji: '🎯'
        },
        MATCH_POINT: {
            text: 'MATCH POINT',
            bgClass: 'bg-red-500',
            emoji: '🔥'
        }
    };

    const config = configs[gameState];

    return (
        <div className={`${config.bgClass} px-3 py-1.5 rounded-full flex items-center gap-2 animate-pulse shadow-lg`}>
            <span className="text-sm">{config.emoji}</span>
            <span className="text-white font-bold text-xs md:text-sm tracking-wider">
                {config.text}
            </span>
        </div>
    );
}
