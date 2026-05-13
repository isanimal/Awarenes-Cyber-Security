import { useState } from 'react';
import { Ship } from 'lucide-react';
import { Button } from '../common/Button';
import type { Mode, PlayerProfile } from '../../types/game';

const roles = ['Deck / Nautical', 'Engine / Technical', 'Port Operation', 'Office / Crewing', 'IT / Cyber Security', 'Management', 'Other'];

export function PlayerSetup({ loading, error, onSubmit }: { loading: boolean; error?: string | null; onSubmit: (profile: PlayerProfile) => void }) {
  const [mode, setMode] = useState<Mode>('individual');
  const [name, setName] = useState('');
  const [role, setRole] = useState(roles[0]);
  const [teamMembers, setTeamMembers] = useState('');
  const [localError, setLocalError] = useState('');

  function submit() {
    const participantName = name.trim();
    const participantRole = mode === 'team' ? teamMembers.trim() : role;
    if (!participantName || !participantRole) {
      setLocalError('Nama dan role/divisi wajib diisi.');
      return;
    }
    setLocalError('');
    onSubmit({
      participantName,
      participantRole,
      mode,
      teamName: mode === 'team' ? participantName : undefined,
    });
  }

  return (
    <section className="mx-auto flex w-full max-w-xl flex-grow flex-col justify-center p-6 sm:p-10">
      <div className="mb-6 text-center">
        <Ship className="mx-auto mb-3 h-12 w-12 text-teal" />
        <h2 className="text-3xl font-bold text-navy">Participant Setup</h2>
        <p className="mt-2 text-slate-500">Tidak perlu registrasi. Isi identitas training untuk laporan trainer.</p>
      </div>
      <div className="mb-5 grid grid-cols-2 rounded-lg bg-slate-100 p-1">
        <button className={`rounded-md py-2 text-sm font-bold ${mode === 'individual' ? 'bg-white text-navy shadow-sm' : 'text-slate-500'}`} onClick={() => setMode('individual')}>Individual</button>
        <button className={`rounded-md py-2 text-sm font-bold ${mode === 'team' ? 'bg-white text-navy shadow-sm' : 'text-slate-500'}`} onClick={() => setMode('team')}>Team</button>
      </div>
      <label className="mb-2 text-sm font-bold text-slate-700">{mode === 'team' ? 'Nama Tim / Kelas' : 'Nama Peserta'}</label>
      <input className="mb-4 rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-teal" value={name} onChange={(e) => setName(e.target.value)} placeholder={mode === 'team' ? 'Contoh: Tim Alpha' : 'Masukkan nama Anda'} />
      <label className="mb-2 text-sm font-bold text-slate-700">{mode === 'team' ? 'Anggota Tim / Divisi' : 'Peran / Divisi'}</label>
      {mode === 'team' ? (
        <input className="mb-4 rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-teal" value={teamMembers} onChange={(e) => setTeamMembers(e.target.value)} placeholder="Contoh: Deck, Engine, IT" />
      ) : (
        <select className="mb-4 rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-teal" value={role} onChange={(e) => setRole(e.target.value)}>
          {roles.map((r) => <option key={r}>{r}</option>)}
        </select>
      )}
      {(localError || error) && <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm font-semibold text-danger">{localError || error}</p>}
      <Button onClick={submit} disabled={loading}>{loading ? 'Membuat attempt...' : 'Mulai Game'}</Button>
    </section>
  );
}
