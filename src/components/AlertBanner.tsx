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
            text: 'คะแนนเสมอกัน(ต้องทำแต้มนำ 2 คะแนน ถึงจะชนะเกม)',
            bgClass: 'bg-orange-500',
            emoji: '⚡'
        },
        FINAL_POINT: {
            text: '29-29 ใครได้แต้มที่ 30 ชนะทันที!',
            bgClass: 'bg-purple-600',
            emoji: '🏆'
        },
        GAME_POINT: {
            text: 'กำลังจะชนะเกม',
            bgClass: 'bg-green-500',
            emoji: '🎯'
        },
        MATCH_POINT: {
            text: 'กำลังจะชนะแมทช์',
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
