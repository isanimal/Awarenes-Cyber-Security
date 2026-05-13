import { Inbox } from 'lucide-react';

export function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
      <Inbox className="mb-3 h-8 w-8 text-slate-400" />
      <p className="font-bold text-slate-700">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{message}</p>
    </div>
  );
}
