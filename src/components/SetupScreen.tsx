'use client';

import { useState } from 'react';
import { useGameStore } from '@/lib/store';
import { MatchType, isDoublesMatch, getMatchTypeName } from '@/lib/logic';
import { Users, User, Play } from 'lucide-react';

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
        <div className="min-h-[100dvh] bg-slate-900 flex flex-col relative overflow-hidden">

            {/* Background Gradient */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-[200px] opacity-10" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-[200px] opacity-10" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex-1 flex flex-col px-5 py-8 max-w-lg mx-auto w-full">

                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mb-4 shadow-xl">
                        <span className="text-4xl">🏸</span>
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tight">
                        BADMINTON
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">Scoreboard</p>
                </div>

                {/* Match Type Selection */}
                <div className="mb-6">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 block">
                        ประเภทการแข่งขัน
                    </label>

                    {/* Singles Row (2 columns) */}
                    <div className="grid grid-cols-2 gap-2 mb-2">
                        {matchTypes.filter(m => m.icon === 'single').map(({ type, icon }) => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`p-3 rounded-xl border-2 transition-all ${selectedType === type
                                    ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400'
                                    : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600'
                                    }`}
                            >
                                <div className="flex flex-col items-center gap-1.5">
                                    <User className="w-5 h-5" />
                                    <span className="text-[10px] font-semibold">{getMatchTypeName(type)}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Doubles Row (3 columns) */}
                    <div className="grid grid-cols-3 gap-2">
                        {matchTypes.filter(m => m.icon === 'double').map(({ type, icon }) => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`p-3 rounded-xl border-2 transition-all ${selectedType === type
                                    ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400'
                                    : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600'
                                    }`}
                            >
                                <div className="flex flex-col items-center gap-1.5">
                                    <Users className="w-5 h-5" />
                                    <span className="text-[10px] font-semibold">{getMatchTypeName(type)}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Players */}
                <div className="flex-1 space-y-4">
                    {/* Player A (Blue) */}
                    <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-3 h-3 rounded-full bg-blue-500" />
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                ฝั่ง A (น้ำเงิน)
                            </label>
                        </div>
                        {isDoubles ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <input
                                    type="text"
                                    placeholder="ผู้เล่น 1"
                                    value={teamA.player1}
                                    onChange={(e) => setTeamA({ ...teamA, player1: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                                />
                                <input
                                    type="text"
                                    placeholder="ผู้เล่น 2"
                                    value={teamA.player2}
                                    onChange={(e) => setTeamA({ ...teamA, player2: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                                />
                            </div>
                        ) : (
                            <input
                                type="text"
                                placeholder="ชื่อผู้เล่น หรือ ทีม"
                                value={playerAName}
                                onChange={(e) => setPlayerAName(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
                            />
                        )}
                    </div>

                    {/* VS Divider */}
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-px bg-slate-700" />
                        <span className="text-sm font-black text-slate-600">VS</span>
                        <div className="flex-1 h-px bg-slate-700" />
                    </div>

                    {/* Player B (Red) */}
                    <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                ฝั่ง B (แดง)
                            </label>
                        </div>
                        {isDoubles ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <input
                                    type="text"
                                    placeholder="ผู้เล่น 1"
                                    value={teamB.player1}
                                    onChange={(e) => setTeamB({ ...teamB, player1: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-red-500 focus:outline-none transition-colors"
                                />
                                <input
                                    type="text"
                                    placeholder="ผู้เล่น 2"
                                    value={teamB.player2}
                                    onChange={(e) => setTeamB({ ...teamB, player2: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-red-500 focus:outline-none transition-colors"
                                />
                            </div>
                        ) : (
                            <input
                                type="text"
                                placeholder="ชื่อผู้เล่น หรือ ทีม"
                                value={playerBName}
                                onChange={(e) => setPlayerBName(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:border-red-500 focus:outline-none transition-colors"
                            />
                        )}
                    </div>
                </div>

                {/* Start Button */}
                <div className="mt-6">
                    <button
                        onClick={handleStart}
                        className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900 font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        <Play className="w-5 h-5 fill-current" />
                        <span>เริ่มแมตช์</span>
                    </button>

                    <p className="text-center text-xs text-slate-600 mt-4">
                        Best of 3 • 21 Points • Deuce at 20-20
                    </p>
                </div>
            </div>
        </div>
    );
}
