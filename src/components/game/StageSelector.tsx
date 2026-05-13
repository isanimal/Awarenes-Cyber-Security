import { curriculumManifest } from '../../data/curriculumManifest';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useState } from 'react';

export function StageSelector({ currentStage, completedStages, onSelect }: { currentStage: number; completedStages: number[]; onSelect: (stage: number) => void }) {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  function openByCode() {
    const manifest = curriculumManifest.find((m) => m.trainerCode.toLowerCase() === code.trim().toLowerCase());
    if (!manifest) {
      setMessage({ type: 'error', text: 'Kode trainer tidak ditemukan. Contoh format: TRN-S1.' });
      return;
    }
    setMessage({ type: 'success', text: `Membuka ${manifest.title}.` });
    onSelect(manifest.stageId);
  }

  return (
    <section className="flex-grow p-6 sm:p-10">
      <h2 className="mb-2 text-3xl font-bold text-navy">Stage Selector</h2>
      <p className="mb-6 text-slate-500">Trainer boleh membuka stage manual. Progress tetap ditandai completed/current.</p>
      <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <label className="mb-2 block text-sm font-bold text-slate-700">Trainer Code Navigation</label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-teal"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && openByCode()}
            placeholder="TRN-S1"
          />
          <Button variant="secondary" onClick={openByCode}>Open Stage</Button>
        </div>
        {message && <p className={`mt-2 text-sm font-semibold ${message.type === 'success' ? 'text-teal' : 'text-danger'}`}>{message.text}</p>}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {curriculumManifest.map((m) => {
          const completed = completedStages.includes(m.stageId);
          const current = m.stageId === currentStage;
          return (
            <button key={m.id} onClick={() => onSelect(m.stageId)} className="rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-teal hover:shadow-md">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="rounded bg-navy px-2 py-1 text-xs font-bold text-white">Stage {m.stageId}</span>
                <Badge tone={completed ? 'teal' : current ? 'blue' : 'slate'}>{completed ? 'completed' : current ? 'current' : 'locked'}</Badge>
              </div>
              <h3 className="font-bold text-navy">{m.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{m.moduleChapter} • {m.estimatedSlideRange}</p>
            </button>
          );
        })}
      </div>
      <div className="mt-6"><Button variant="ghost" onClick={() => onSelect(currentStage)}>Lanjut Stage Saat Ini</Button></div>
    </section>
  );
}
