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
import { RotateCcw, Undo2, Home, Smartphone } from 'lucide-react';

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

      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700 relative z-20 safe-area-top">
        {/* Left: Match Info */}
        <div className="flex items-center gap-2">
          <span className="text-yellow-400 font-bold text-lg">🏸</span>
          <span className="text-sm text-slate-400 hidden sm:inline">
            {getMatchTypeName(store.matchType)}
          </span>
        </div>

        {/* Center: Alert Banner */}
        <AlertBanner gameState={gameState} />

        {/* Right: Set Score */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <span className="text-xs text-slate-500 block">SET</span>
            <span className="text-sm font-bold">{currentSet}/3</span>
          </div>
          <div className="flex gap-1">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${store.playerA.setsWon > 0 ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-500'
              }`}>
              {store.playerA.setsWon}
            </div>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${store.playerB.setsWon > 0 ? 'bg-red-600 text-white' : 'bg-slate-700 text-slate-500'
              }`}>
              {store.playerB.setsWon}
            </div>
          </div>
        </div>
      </header>

      {/* Score Area */}
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

        {/* VS Divider */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-900 border-4 border-slate-700 rounded-full flex items-center justify-center shadow-xl">
            <span className="font-black text-lg text-slate-500">VS</span>
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

      {/* Game Winner Modal */}
      {gameState === 'WINNER' && !matchWinner && (
        <GameWinnerModal
          winnerName={gameWinner === 'A' ? store.playerA.name : store.playerB.name}
          winnerColor={gameWinner === 'A' ? 'blue' : 'red'}
          scoreA={store.playerA.score}
          scoreB={store.playerB.score}
          currentSet={currentSet}
          onNextSet={handleNextSet}
        />
      )}

      {/* Match Winner Modal */}
      {matchWinner && (
        <MatchWinnerModal
          winnerName={matchWinner === 'A' ? store.playerA.name : store.playerB.name}
          winnerColor={matchWinner === 'A' ? 'blue' : 'red'}
          finalSetsA={store.playerA.setsWon}
          finalSetsB={store.playerB.setsWon}
          gameScores={store.gameScores}
          currentGameScore={{ scoreA: store.playerA.score, scoreB: store.playerB.score }}
          onNewMatch={() => store.resetMatch()}
          onBackToSetup={() => store.backToSetup()}
        />
      )}

      {/* Footer Controls */}
      <footer className="bg-slate-800 px-4 py-3 border-t border-slate-700 safe-area-bottom">
        <div className="flex justify-center gap-3 md:gap-6 max-w-lg mx-auto">
          {/* Undo */}
          <button
            onClick={store.undo}
            disabled={store.history.length === 0 || gameState === 'WINNER' || !!matchWinner}
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center hover:bg-slate-600 transition-colors">
              <Undo2 className="w-5 h-5" />
            </div>
            <span className="text-[10px]">ย้อนกลับคะแนน</span>
          </button>

          {/* Reset Game */}
          <button
            onClick={() => { if (confirm('รีเซ็ตเกมปัจจุบัน?')) store.resetGame(); }}
            disabled={!!matchWinner}
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center hover:bg-slate-600 transition-colors">
              <RotateCcw className="w-5 h-5" />
            </div>
            <span className="text-[10px]">รีเซ็ตเกมปัจจุบัน</span>
          </button>

          {/* Reset Match */}
          <button
            onClick={() => { if (confirm('รีเซ็ตแมตช์ทั้งหมด?')) store.resetMatch(); }}
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors"
          >
            <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center hover:bg-orange-500 transition-colors">
              <RotateCcw className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px]">รีเซ็ตแมตช์ทั้งหมด</span>
          </button>

          {/* Back to Setup */}
          <button
            onClick={() => { if (confirm('กลับหน้าตั้งค่า?')) store.backToSetup(); }}
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors"
          >
            <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center hover:bg-slate-600 transition-colors">
              <Home className="w-5 h-5" />
            </div>
            <span className="text-[10px]">กลับหน้าตั้งค่า</span>
          </button>
        </div>

        {/* Hint */}
        <p className="text-center text-[10px] text-slate-600 mt-2 flex items-center justify-center gap-1">
          <Smartphone className="w-3 h-3" />
          กดบริเวณสีเพื่อเพิ่มคะแนน
        </p>
      </footer>
    </main>
  );
}