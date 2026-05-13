import type { ReactNode } from 'react';

export function Badge({ children, tone = 'slate' }: { children: ReactNode; tone?: 'teal' | 'blue' | 'orange' | 'red' | 'slate' }) {
  const tones = {
    teal: 'bg-teal/10 text-teal border-teal/30',
    blue: 'bg-sky-100 text-sky-700 border-sky-200',
    orange: 'bg-orange-100 text-orange-700 border-orange-200',
    red: 'bg-red-100 text-red-700 border-red-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  };
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${tones[tone]}`}>{children}</span>;
}
