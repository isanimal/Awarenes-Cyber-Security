import { Eye } from 'lucide-react';
import type { GameAttemptRow } from '../../types/database';
import { Button } from '../common/Button';
import { EmptyState } from '../common/EmptyState';

export function TrainerReportsTable({ attempts, onView }: { attempts: GameAttemptRow[]; onView: (attempt: GameAttemptRow) => void }) {
  if (!attempts.length) return <EmptyState title="Belum ada peserta yang menyelesaikan game." message="Data akan muncul setelah peserta mulai game dan Supabase terhubung." />;
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full whitespace-nowrap text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-100 text-slate-600">
            <tr>
              {['Nama', 'Role', 'Mode', 'Team', 'Total', 'Rating', 'Strongest', 'Weakest', 'Status', 'Completed', 'Detail'].map((h) => <th key={h} className="px-4 py-3 font-bold">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {attempts.map((a) => (
              <tr key={a.id}>
                <td className="px-4 py-3 font-bold text-navy">{a.participant_name}</td>
                <td className="px-4 py-3 text-slate-600">{a.participant_role}</td>
                <td className="px-4 py-3 uppercase text-slate-500">{a.mode}</td>
                <td className="px-4 py-3">{a.team_name || '-'}</td>
                <td className="px-4 py-3 font-bold">{a.total_score}</td>
                <td className="px-4 py-3 font-semibold text-teal">{a.rating || '-'}</td>
                <td className="px-4 py-3">{a.strongest_area || '-'}</td>
                <td className="px-4 py-3 text-danger">{a.weakest_area || '-'}</td>
                <td className="px-4 py-3">{a.status}</td>
                <td className="px-4 py-3 text-xs text-slate-500">{a.completed_at ? new Date(a.completed_at).toLocaleString() : '-'}</td>
                <td className="px-4 py-3"><Button variant="ghost" icon={<Eye className="h-4 w-4" />} onClick={() => onView(a)}>View</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
