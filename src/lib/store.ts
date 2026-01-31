// src/lib/store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { checkGameState, checkMatchWinner, MatchType } from './logic';

interface PlayerState {
    name: string;
    score: number;
    setsWon: number;
}

interface DoublesTeam {
    player1: string;
    player2: string;
}

interface HistoryEntry {
    scoreA: number;
    scoreB: number;
    server: 'A' | 'B';
}

interface GameScoreHistory {
    scoreA: number;
    scoreB: number;
}

interface GameStore {
    // Match Configuration
    matchStarted: boolean;
    matchType: MatchType;

    // Players
    playerA: PlayerState;
    playerB: PlayerState;
    teamA: DoublesTeam | null;
    teamB: DoublesTeam | null;

    // Serve tracking
    currentServer: 'A' | 'B';

    // Game history
    history: HistoryEntry[];
    gameScores: GameScoreHistory[]; // เก็บคะแนนจบของแต่ละเกม

    // Actions
    startMatch: (config: {
        matchType: MatchType;
        playerAName: string;
        playerBName: string;
        teamA?: DoublesTeam;
        teamB?: DoublesTeam;
    }) => void;
    setName: (player: 'A' | 'B', name: string) => void;
    incrementScore: (player: 'A' | 'B') => void;
    undo: () => void;
    resetGame: () => void;
    resetMatch: () => void;
    confirmSetWin: (winner: 'A' | 'B') => void;
    backToSetup: () => void;
}

export const useGameStore = create<GameStore>()(
    persist(
        (set, get) => ({
            // Initial State
            matchStarted: false,
            matchType: 'mens_singles',
            playerA: { name: 'Player A', score: 0, setsWon: 0 },
            playerB: { name: 'Player B', score: 0, setsWon: 0 },
            teamA: null,
            teamB: null,
            currentServer: 'A',
            history: [],
            gameScores: [],

            startMatch: (config) => set({
                matchStarted: true,
                matchType: config.matchType,
                playerA: { name: config.playerAName, score: 0, setsWon: 0 },
                playerB: { name: config.playerBName, score: 0, setsWon: 0 },
                teamA: config.teamA || null,
                teamB: config.teamB || null,
                currentServer: 'A',
                history: [],
                gameScores: [],
            }),

            setName: (player, name) =>
                set((state) => ({
                    [player === 'A' ? 'playerA' : 'playerB']: {
                        ...state[player === 'A' ? 'playerA' : 'playerB'],
                        name,
                    },
                })),

            incrementScore: (player) => {
                const state = get();

                // ตรวจสอบว่าจบแมตช์หรือยัง
                const matchWinner = checkMatchWinner(state.playerA.setsWon, state.playerB.setsWon);
                if (matchWinner) return;

                // ตรวจสอบว่าจบเกมหรือยัง ถ้าจบแล้วห้ามกดเพิ่ม
                const status = checkGameState(
                    state.playerA.score,
                    state.playerB.score,
                    state.playerA.setsWon,
                    state.playerB.setsWon
                );
                if (status === 'WINNER') return;

                // บันทึก History ก่อนเปลี่ยนค่า
                const newHistory: HistoryEntry[] = [...state.history, {
                    scoreA: state.playerA.score,
                    scoreB: state.playerB.score,
                    server: state.currentServer
                }];

                set(() => {
                    const isA = player === 'A';
                    const newScoreA = isA ? state.playerA.score + 1 : state.playerA.score;
                    const newScoreB = !isA ? state.playerB.score + 1 : state.playerB.score;

                    return {
                        history: newHistory,
                        playerA: { ...state.playerA, score: newScoreA },
                        playerB: { ...state.playerB, score: newScoreB },
                        // ใครได้แต้ม คนนั้นเสิร์ฟ (simplified service rule)
                        currentServer: player,
                    };
                });
            },

            undo: () => {
                set((state) => {
                    if (state.history.length === 0) return state;
                    const previous = state.history[state.history.length - 1];
                    const newHistory = state.history.slice(0, -1);
                    return {
                        history: newHistory,
                        playerA: { ...state.playerA, score: previous.scoreA },
                        playerB: { ...state.playerB, score: previous.scoreB },
                        currentServer: previous.server,
                    };
                });
            },

            resetGame: () =>
                set((state) => ({
                    playerA: { ...state.playerA, score: 0 },
                    playerB: { ...state.playerB, score: 0 },
                    currentServer: 'A',
                    history: [],
                })),

            resetMatch: () =>
                set((state) => ({
                    playerA: { ...state.playerA, score: 0, setsWon: 0 },
                    playerB: { ...state.playerB, score: 0, setsWon: 0 },
                    currentServer: 'A',
                    history: [],
                    gameScores: [],
                })),

            confirmSetWin: (winner: 'A' | 'B') => set(state => ({
                gameScores: [...state.gameScores, {
                    scoreA: state.playerA.score,
                    scoreB: state.playerB.score
                }],
                playerA: {
                    ...state.playerA,
                    score: 0,
                    setsWon: winner === 'A' ? state.playerA.setsWon + 1 : state.playerA.setsWon
                },
                playerB: {
                    ...state.playerB,
                    score: 0,
                    setsWon: winner === 'B' ? state.playerB.setsWon + 1 : state.playerB.setsWon
                },
                // เกมใหม่ คนแพ้เกมก่อนได้เสิร์ฟก่อน
                currentServer: winner === 'A' ? 'B' : 'A',
                history: []
            })),

            backToSetup: () => set({
                matchStarted: false,
                matchType: 'mens_singles',
                playerA: { name: 'Player A', score: 0, setsWon: 0 },
                playerB: { name: 'Player B', score: 0, setsWon: 0 },
                teamA: null,
                teamB: null,
                currentServer: 'A',
                history: [],
                gameScores: [],
            }),
        }),
        { name: 'badminton-storage' }
    )
);