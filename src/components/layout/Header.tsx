import { Anchor, RotateCcw } from 'lucide-react';
import type { PlayerProfile } from '../../types/game';

export function Header({ profile, onReset }: { profile?: PlayerProfile | null; onReset?: () => void }) {
  return (
    <header className="no-print relative z-10 flex items-center justify-between bg-navy px-6 py-4 text-white shadow-md">
      <div className="flex items-center gap-3">
        <Anchor className="text-teal" />
        <h1 className="hidden text-xl font-bold tracking-wide sm:block">Secure the Voyage</h1>
        <h1 className="text-xl font-bold tracking-wide sm:hidden">STV</h1>
      </div>
      {profile && (
        <div className="flex items-center gap-3 text-sm">
          <span className="hidden font-semibold text-slate-300 sm:block">{profile.participantName}</span>
          <span className="max-w-[130px] truncate rounded bg-teal px-2 py-1 text-xs font-bold text-white">
            {profile.mode === 'team' ? 'Team Mode' : profile.participantRole}
          </span>
          <button className="text-slate-300 hover:text-white" onClick={onReset} aria-label="Reset game">
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>
      )}
    </header>
  );
}
