import { Compass } from 'lucide-react';
import { Button } from '../common/Button';

export function Onboarding({ onContinue }: { onContinue: () => void }) {
  return (
    <section className="flex flex-grow flex-col justify-center p-6 sm:p-10">
      <div className="mx-auto max-w-3xl">
        <Compass className="mb-4 h-12 w-12 text-teal" />
        <h2 className="mb-4 text-3xl font-bold text-navy">Briefing Singkat</h2>
        <p className="mb-4 text-slate-600">
          Anda akan melewati 7 stage. Setiap stage memiliki learn mode singkat lalu skenario keputusan. Pilihan Anda mengubah skor Security, Operation, Compliance, dan Recovery.
        </p>
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          {['Baca konteks', 'Pilih keputusan', 'Review feedback'].map((item) => (
            <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-bold text-slate-700">{item}</div>
          ))}
        </div>
        <Button onClick={onContinue}>Lanjut ke Stage Selector</Button>
      </div>
    </section>
  );
}
