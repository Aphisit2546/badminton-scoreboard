'use client';

import { useState } from 'react';
import { useGameStore } from '@/lib/store';
import { MatchType, isDoublesMatch, getMatchTypeName } from '@/lib/logic';
import { Volleyball, Users, User, ChevronRight } from 'lucide-react';

interface SetupScreenProps {
    onStart: () => void;
}

const matchTypes: { type: MatchType; icon: 'single' | 'double' }[] = [
    { type: 'mens_singles', icon: 'single' },
    { type: 'womens_singles', icon: 'single' },
    { type: 'mens_doubles', icon: 'double' },
    { type: 'womens_doubles', icon: 'double' },
    { type: 'mixed_doubles', icon: 'double' },
];

export default function SetupScreen({ onStart }: SetupScreenProps) {
    const store = useGameStore();

    const [selectedType, setSelectedType] = useState<MatchType>('mens_singles');
    const [playerAName, setPlayerAName] = useState('');
    const [playerBName, setPlayerBName] = useState('');
    const [teamA, setTeamA] = useState({ player1: '', player2: '' });
    const [teamB, setTeamB] = useState({ player1: '', player2: '' });

    const isDoubles = isDoublesMatch(selectedType);

    const handleStart = () => {
        const finalPlayerAName = isDoubles
            ? (teamA.player1 && teamA.player2 ? `${teamA.player1} / ${teamA.player2}` : 'Team A')
            : (playerAName.trim() || 'Player A');

        const finalPlayerBName = isDoubles
            ? (teamB.player1 && teamB.player2 ? `${teamB.player1} / ${teamB.player2}` : 'Team B')
            : (playerBName.trim() || 'Player B');

        store.startMatch({
            matchType: selectedType,
            playerAName: finalPlayerAName,
            playerBName: finalPlayerBName,
            teamA: isDoubles ? teamA : undefined,
            teamB: isDoubles ? teamB : undefined,
        });
        onStart();
    };

    return (
        <div className="min-h-[100dvh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4 shadow-xl">
                    <Volleyball className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-4xl font-black text-white mb-2">
                    🏸 BADMINTON
                </h1>
                <p className="text-slate-400 text-lg">Scoreboard</p>
            </div>

            {/* Match Type Selection */}
            <div className="w-full max-w-md mb-8">
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    ประเภทการแข่งขัน
                </h2>
                <div className="grid grid-cols-2 gap-3">
                    {matchTypes.map(({ type, icon }) => (
                        <button
                            key={type}
                            onClick={() => setSelectedType(type)}
                            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 ${selectedType === type
                                    ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400'
                                    : 'border-slate-600 bg-slate-800/50 text-slate-300 hover:border-slate-500'
                                }`}
                        >
                            {icon === 'single' ? (
                                <User className="w-5 h-5" />
                            ) : (
                                <Users className="w-5 h-5" />
                            )}
                            <span className="font-medium text-sm">
                                {getMatchTypeName(type)}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Player Names */}
            <div className="w-full max-w-md space-y-6 mb-8">
                {/* Player/Team A */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                            ฝั่ง A (น้ำเงิน)
                        </h2>
                    </div>
                    {isDoubles ? (
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="ชื่อผู้เล่น 1"
                                value={teamA.player1}
                                onChange={(e) => setTeamA({ ...teamA, player1: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                            />
                            <input
                                type="text"
                                placeholder="ชื่อผู้เล่น 2"
                                value={teamA.player2}
                                onChange={(e) => setTeamA({ ...teamA, player2: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        </div>
                    ) : (
                        <input
                            type="text"
                            placeholder="ชื่อผู้เล่น A"
                            value={playerAName}
                            onChange={(e) => setPlayerAName(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                        />
                    )}
                </div>

                {/* Player/Team B */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                            ฝั่ง B (แดง)
                        </h2>
                    </div>
                    {isDoubles ? (
                        <div className="space-y-2">
                            <input
                                type="text"
                                placeholder="ชื่อผู้เล่น 1"
                                value={teamB.player1}
                                onChange={(e) => setTeamB({ ...teamB, player1: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-red-500 focus:outline-none transition-colors"
                            />
                            <input
                                type="text"
                                placeholder="ชื่อผู้เล่น 2"
                                value={teamB.player2}
                                onChange={(e) => setTeamB({ ...teamB, player2: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-red-500 focus:outline-none transition-colors"
                            />
                        </div>
                    ) : (
                        <input
                            type="text"
                            placeholder="ชื่อผู้เล่น B"
                            value={playerBName}
                            onChange={(e) => setPlayerBName(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-800 border-2 border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-red-500 focus:outline-none transition-colors"
                        />
                    )}
                </div>
            </div>

            {/* Start Button */}
            <button
                onClick={handleStart}
                className="w-full max-w-md py-4 px-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
            >
                <span>🚀 เริ่มแมตช์</span>
                <ChevronRight className="w-5 h-5" />
            </button>

            {/* Footer Info */}
            <p className="text-slate-500 text-sm mt-6 text-center">
                Best of 3 Games • 21 Points per Game
            </p>
        </div>
    );
}
