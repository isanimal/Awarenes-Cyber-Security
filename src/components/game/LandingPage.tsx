import { ArrowRight, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { Button } from '../common/Button';

export function LandingPage({ onStart, onTrainer }: { onStart: () => void; onTrainer: () => void }) {
  return (
    <section className="flex flex-grow flex-col items-center justify-center bg-navy p-10 text-center text-white sm:p-16">
      <ShieldCheck className="mb-6 h-20 w-20 text-teal" />
      <h2 className="mb-4 text-4xl font-bold">Secure the Voyage</h2>
      <h3 className="mb-6 text-xl font-semibold text-lightblue sm:text-2xl">Maritime Cyber Resilience Awareness Game</h3>
      <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-300">
        Game awareness berbasis skenario untuk memahami risiko siber di kapal, pelabuhan, vendor, dan sistem operasional maritim.
      </p>
      <Button onClick={onStart} icon={<ArrowRight className="h-4 w-4" />}>Mulai Simulasi</Button>
      <button onClick={onTrainer} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-white">
        <LayoutDashboard className="h-4 w-4" /> Trainer Mode
      </button>
    </section>
  );
}
