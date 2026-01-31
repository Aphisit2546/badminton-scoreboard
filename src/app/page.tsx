// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useGameStore } from '@/lib/store';
import { checkGameState, checkMatchWinner, getMatchTypeName } from '@/lib/logic';
import ScoreCard from '@/components/ScoreCard';
import SetupScreen from '@/components/SetupScreen';
import AlertBanner from '@/components/AlertBanner';
import GameWinnerModal from '@/components/GameWinnerModal';
import MatchWinnerModal from '@/components/MatchWinnerModal';
import { RotateCcw, History, Home, Info } from 'lucide-react';

export default function BadmintonScoreboard() {
  const store = useGameStore();

  // Hydration fix for zustand persist
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // Show setup screen if match not started
  if (!store.matchStarted) {
    return <SetupScreen onStart={() => { }} />;
  }

  // Derived State
  const gameState = checkGameState(
    store.playerA.score,
    store.playerB.score,
    store.playerA.setsWon,
    store.playerB.setsWon
  );

  const matchWinner = checkMatchWinner(store.playerA.setsWon, store.playerB.setsWon);
  const gameWinner = gameState === 'WINNER'
    ? (store.playerA.score > store.playerB.score ? 'A' : 'B')
    : null;

  const handleScore = (player: 'A' | 'B') => {
    if (gameState === 'WINNER' || matchWinner) return;
    store.incrementScore(player);
  };

  const handleNextSet = () => {
    if (store.playerA.score > store.playerB.score) {
      store.confirmSetWin('A');
    } else {
      store.confirmSetWin('B');
    }
  };

  const currentSet = store.playerA.setsWon + store.playerB.setsWon + 1;

  return (
    <main className="h-[100dvh] w-full flex flex-col bg-slate-900 text-white overflow-hidden relative">

      {/* 1. Status Bar (Top) */}
      <header className="flex items-center justify-between px-4 py-3 bg-slate-800/90 backdrop-blur-sm border-b border-slate-700 relative z-20">
        <div className="flex items-center gap-2">
          <span className="text-yellow-400 font-bold text-lg md:text-xl">🏸</span>
          <div className="flex flex-col md:flex-row md:items-center md:gap-2">
            <span className="text-sm text-slate-400">
              {getMatchTypeName(store.matchType)}
            </span>
          </div>
        </div>

        {/* Status Alert */}
        <AlertBanner gameState={gameState} className="top-2" />

        {/* Set Counter */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-slate-500 block">SET</span>
            <span className="text-lg font-bold text-white">{currentSet}</span>
          </div>
          <div className="flex gap-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${store.playerA.setsWon > 0 ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-500'
              }`}>
              {store.playerA.setsWon}
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${store.playerB.setsWon > 0 ? 'bg-red-500 text-white' : 'bg-slate-700 text-slate-500'
              }`}>
              {store.playerB.setsWon}
            </div>
          </div>
        </div>
      </header>

      {/* 2. Score Area (Split Screen) */}
      <div className="flex-1 flex flex-col md:flex-row relative">

        {/* Player A (Blue) */}
        <ScoreCard
          name={store.playerA.name}
          score={store.playerA.score}
          sets={store.playerA.setsWon}
          color="blue"
          isServing={store.currentServer === 'A'}
          onClick={() => handleScore('A')}
          winner={gameWinner === 'A'}
          disabled={gameState === 'WINNER' || !!matchWinner}
        />

        {/* VS Badge (Center) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="bg-slate-900 border-4 border-slate-700 rounded-full w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-2xl">
            <span className="font-black text-lg md:text-xl text-slate-500">VS</span>
          </div>
        </div>

        {/* Player B (Red) */}
        <ScoreCard
          name={store.playerB.name}
          score={store.playerB.score}
          sets={store.playerB.setsWon}
          color="red"
          isServing={store.currentServer === 'B'}
          onClick={() => handleScore('B')}
          winner={gameWinner === 'B'}
          disabled={gameState === 'WINNER' || !!matchWinner}
        />
      </div>

      {/* 3. Game Winner Modal (ยังไม่จบแมตช์) */}
      {gameState === 'WINNER' && !matchWinner && (
        <GameWinnerModal
          winnerName={gameWinner === 'A' ? store.playerA.name : store.playerB.name}
          scoreA={store.playerA.score}
          scoreB={store.playerB.score}
          currentSet={currentSet}
          onNextSet={handleNextSet}
        />
      )}

      {/* 4. Match Winner Modal */}
      {matchWinner && (
        <MatchWinnerModal
          winnerName={matchWinner === 'A' ? store.playerA.name : store.playerB.name}
          finalSetsA={store.playerA.setsWon}
          finalSetsB={store.playerB.setsWon}
          gameScores={store.gameScores}
          currentGameScore={{ scoreA: store.playerA.score, scoreB: store.playerB.score }}
          onNewMatch={() => store.resetMatch()}
          onBackToSetup={() => store.backToSetup()}
        />
      )}

      {/* 5. Controls Footer */}
      <footer className="bg-slate-800/90 backdrop-blur-sm p-4 pb-6 md:pb-4 border-t border-slate-700 flex justify-center gap-4 md:gap-8 relative z-10">
        <button
          onClick={store.undo}
          disabled={store.history.length === 0 || gameState === 'WINNER' || !!matchWinner}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <div className="p-3 bg-slate-700 rounded-full hover:bg-slate-600 transition-colors">
            <History size={20} />
          </div>
          <span className="text-xs">Undo</span>
        </button>

        <button
          onClick={() => { if (confirm('รีเซ็ตเกมปัจจุบัน?')) store.resetGame() }}
          disabled={!!matchWinner}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <div className="p-3 bg-slate-700 rounded-full hover:bg-slate-600 transition-colors">
            <RotateCcw size={20} />
          </div>
          <span className="text-xs">Reset Game</span>
        </button>

        <button
          onClick={() => { if (confirm('รีเซ็ตแมตช์ทั้งหมด?')) store.resetMatch() }}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors"
        >
          <div className="p-3 bg-orange-600 rounded-full hover:bg-orange-500 transition-colors">
            <RotateCcw size={20} />
          </div>
          <span className="text-xs">Reset Match</span>
        </button>

        <button
          onClick={() => { if (confirm('กลับหน้าตั้งค่า?')) store.backToSetup() }}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors"
        >
          <div className="p-3 bg-slate-700 rounded-full hover:bg-slate-600 transition-colors">
            <Home size={20} />
          </div>
          <span className="text-xs">Setup</span>
        </button>
      </footer>

      {/* Rules Info Tooltip */}
      <div className="absolute bottom-20 right-4 text-slate-500 text-xs flex items-center gap-1">
        <Info size={12} />
        <span>กดบริเวณสีเพื่อเพิ่มคะแนน</span>
      </div>

    </main>
  );
}