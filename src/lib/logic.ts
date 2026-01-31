// src/lib/logic.ts

export const MAX_POINTS = 21;
export const MAX_DEUCE_POINTS = 30;
export const SETS_TO_WIN = 2;

export type GameState = 'PLAYING' | 'DEUCE' | 'FINAL_POINT' | 'GAME_POINT' | 'MATCH_POINT' | 'WINNER';
export type MatchType = 'mens_singles' | 'womens_singles' | 'mens_doubles' | 'womens_doubles' | 'mixed_doubles';

// เช็คสถานะเกมปัจจุบัน
export const checkGameState = (
    scoreA: number,
    scoreB: number,
    setsA: number = 0,
    setsB: number = 0
): GameState => {
    const maxScore = Math.max(scoreA, scoreB);
    const minScore = Math.min(scoreA, scoreB);
    const diff = maxScore - minScore;

    // กรณีชนะขาด (ถึง 30 หรือ ถึง 21 แล้วห่าง 2 แต้ม)
    if (maxScore >= 30 || (maxScore >= MAX_POINTS && diff >= 2)) {
        return 'WINNER';
    }

    // กรณี 29-29 (Final Point - ใครได้ 30 ชนะทันที)
    if (scoreA === 29 && scoreB === 29) {
        return 'FINAL_POINT';
    }

    // กรณี Deuce (20-20 ขึ้นไป)
    if (scoreA >= 20 && scoreB >= 20) {
        return 'DEUCE';
    }

    // กรณี Game Point / Match Point
    // Match Point = ฝ่ายใดฝ่ายหนึ่งชนะไป 1 set แล้ว และกำลังจะชนะเกมนี้
    if ((maxScore >= 20 && diff >= 1)) {
        const leadingPlayer = scoreA > scoreB ? 'A' : 'B';
        const leaderSets = leadingPlayer === 'A' ? setsA : setsB;

        // ถ้าคนนำมี 1 set แล้ว = Match Point
        if (leaderSets === 1) {
            return 'MATCH_POINT';
        }
        return 'GAME_POINT';
    }

    return 'PLAYING';
};

// คำนวณฝั่งเสิร์ฟ (คู่=ขวา, คี่=ซ้าย)
export const getServeSide = (score: number): 'RIGHT' | 'LEFT' => {
    return score % 2 === 0 ? 'RIGHT' : 'LEFT';
};

// เช็คผู้ชนะแมตช์
export const checkMatchWinner = (setsA: number, setsB: number): 'A' | 'B' | null => {
    if (setsA >= SETS_TO_WIN) return 'A';
    if (setsB >= SETS_TO_WIN) return 'B';
    return null;
};

// เช็คผู้ชนะเกม
export const checkGameWinner = (scoreA: number, scoreB: number): 'A' | 'B' | null => {
    const state = checkGameState(scoreA, scoreB);
    if (state !== 'WINNER') return null;
    return scoreA > scoreB ? 'A' : 'B';
};

// ชื่อประเภทการแข่งขัน
export const getMatchTypeName = (type: MatchType): string => {
    const names: Record<MatchType, string> = {
        'mens_singles': 'ชายเดี่ยว',
        'womens_singles': 'หญิงเดี่ยว',
        'mens_doubles': 'ชายคู่',
        'womens_doubles': 'หญิงคู่',
        'mixed_doubles': 'คู่ผสม'
    };
    return names[type];
};

// เช็คว่าเป็นประเภทคู่หรือไม่
export const isDoublesMatch = (type: MatchType): boolean => {
    return type.includes('doubles');
};