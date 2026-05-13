import type { ReactNode } from 'react';
import { isSupabaseConfigured } from '../../lib/supabase';
import type { PlayerProfile } from '../../types/game';
import { Footer } from './Footer';
import { Header } from './Header';

export function AppShell({ children, profile, onReset }: { children: ReactNode; profile?: PlayerProfile | null; onReset?: () => void }) {
  return (
    <div className="flex min-h-screen flex-col bg-wave text-slate-800">
      <Header profile={profile} onReset={onReset} />
      {!isSupabaseConfigured && (
        <div className="no-print border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs font-semibold text-amber-800">
          Local Mode aktif: data hanya tersimpan di browser ini. Untuk dashboard kelas terpusat, konfigurasi Supabase.
        </div>
      )}
      <main className="flex w-full flex-grow flex-col items-center justify-center p-4 sm:p-6">
        <div id="app-container" className="flex min-h-[640px] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
