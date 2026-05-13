import { useState } from 'react';
import { LockKeyhole } from 'lucide-react';
import { verifyTrainerPasscode } from '../../lib/trainerAuth';
import { Button } from '../common/Button';

export function TrainerLogin({ onSuccess }: { onSuccess: () => void }) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function submit() {
    if (!passcode.trim()) {
      setError('Passcode wajib diisi.');
      return;
    }
    setLoading(true);
    if (verifyTrainerPasscode(passcode)) {
      setError('');
      onSuccess();
    } else {
      setError('Passcode trainer salah.');
    }
    setLoading(false);
  }

  return (
    <section className="mx-auto flex w-full max-w-md flex-grow flex-col justify-center p-6">
      <LockKeyhole className="mx-auto mb-4 h-12 w-12 text-teal" />
      <h2 className="mb-2 text-center text-3xl font-bold text-navy">Trainer Access</h2>
      <p className="mb-5 text-center text-sm text-slate-500">Classroom passcode gate. Bukan enterprise-grade auth.</p>
      <input className="mb-3 rounded-lg border border-slate-300 px-4 py-3 text-center font-semibold outline-none focus:ring-2 focus:ring-teal" type="password" value={passcode} onChange={(e) => setPasscode(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submit()} placeholder="Masukkan passcode" />
      {error && <p className="mb-3 rounded-lg bg-red-50 p-3 text-sm font-semibold text-danger">{error}</p>}
      <Button onClick={submit} disabled={loading}>{loading ? 'Checking...' : 'Open Dashboard'}</Button>
    </section>
  );
}
