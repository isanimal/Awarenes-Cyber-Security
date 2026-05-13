import { useEffect, useMemo, useState } from 'react';
import { Download, FileText, LogOut, RefreshCw } from 'lucide-react';
import { scenarios } from '../../data/scenarios';
import { downloadText } from '../../lib/csv';
import { clearTrainerAccess } from '../../lib/trainerAuth';
import { exportAttemptsToCSV, fetchTrainerData, isUsingSupabase } from '../../lib/gameRepository';
import { buildReport } from '../../lib/scoring';
import type { GameAnswerRow, GameAttemptRow } from '../../types/database';
import { Button } from '../common/Button';
import { EmptyState } from '../common/EmptyState';
import { Modal } from '../common/Modal';
import { ContentAlignmentMatrix } from './ContentAlignmentMatrix';
import { CurriculumManifestView } from './CurriculumManifestView';
import { PPTBuilderOutline } from './PPTBuilderOutline';
import { TrainerReportsTable } from './TrainerReportsTable';
import { TrainerStats } from './TrainerStats';

type Tab = 'eval' | 'curriculum' | 'ppt' | 'matrix';

export function TrainerDashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>('eval');
  const [attempts, setAttempts] = useState<GameAttemptRow[]>([]);
  const [answers, setAnswers] = useState<GameAnswerRow[]>([]);
  const [selected, setSelected] = useState<GameAttemptRow | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    setStatus(null);
    try {
      const data = await fetchTrainerData();
      setAttempts(data.attempts);
      setAnswers(data.answers);
      setStatus(`${isUsingSupabase() ? 'Data Supabase' : 'Data localStorage'} diperbarui: ${data.attempts.length} attempt, ${data.answers.length} jawaban.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mengambil data trainer.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const selectedAnswers = useMemo(() => answers.filter((a) => a.attempt_id === selected?.id), [answers, selected]);

  function logout() {
    clearTrainerAccess();
    onLogout();
  }

  function exportCsv() {
    exportAttemptsToCSV().then((csv) => downloadText('STV_Attempts.csv', csv, 'text/csv')).catch((err) => {
      setError(err instanceof Error ? err.message : 'Export CSV gagal.');
    });
    setStatus('Export CSV dimulai.');
  }

  return (
    <section className="flex-grow overflow-y-auto bg-slate-50 p-6 sm:p-8">
      <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold text-navy">Trainer Dashboard</h2>
          <p className="text-slate-500">Evaluasi peserta, curriculum manifest, PPT outline, dan alignment matrix.</p>
          <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${isUsingSupabase() ? 'bg-teal/10 text-teal' : 'bg-amber-100 text-amber-800'}`}>
            {isUsingSupabase() ? 'Connected to Supabase' : 'Local Mode'}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" icon={<RefreshCw className="h-4 w-4" />} onClick={load} disabled={loading}>{loading ? 'Loading...' : 'Refresh'}</Button>
          {attempts.length > 0 && <Button variant="ghost" icon={<Download className="h-4 w-4" />} onClick={exportCsv}>Export CSV</Button>}
          <Button variant="danger" icon={<LogOut className="h-4 w-4" />} onClick={logout}>Logout</Button>
        </div>
      </div>
      <div className="mb-5 flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {[
          ['eval', 'Evaluasi Peserta'],
          ['curriculum', 'Curriculum'],
          ['ppt', 'PPT Outline'],
          ['matrix', 'Alignment Matrix'],
        ].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id as Tab)} className={`rounded-lg px-4 py-2 text-sm font-bold ${tab === id ? 'bg-navy text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>{label}</button>
        ))}
      </div>
      {error && <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-danger">{error}</div>}
      {status && !error && <div className="mb-5 rounded-xl border border-teal/20 bg-teal/10 p-4 text-sm font-semibold text-teal">{status}</div>}
      {tab === 'eval' && (
        <>
          <TrainerStats attempts={attempts} answers={answers} />
          {loading && !attempts.length ? <EmptyState title="Loading data" message={`Mengambil attempts dan answers dari ${isUsingSupabase() ? 'Supabase' : 'localStorage'}.`} /> : <TrainerReportsTable attempts={attempts} onView={setSelected} />}
        </>
      )}
      {tab === 'curriculum' && (
        <>
          <div className="mb-4 flex justify-end">
            <Button variant="secondary" icon={<FileText className="h-4 w-4" />} onClick={() => setTab('ppt')}>Generate PPT Outline</Button>
          </div>
          <CurriculumManifestView />
        </>
      )}
      {tab === 'ppt' && <PPTBuilderOutline />}
      {tab === 'matrix' && <ContentAlignmentMatrix />}
      {selected && (
        <Modal title={`Attempt Detail - ${selected.participant_name}`} onClose={() => setSelected(null)}>
          <AttemptDetail attempt={selected} answers={selectedAnswers} />
        </Modal>
      )}
    </section>
  );
}

function AttemptDetail({ attempt, answers }: { attempt: GameAttemptRow; answers: GameAnswerRow[] }) {
  const report = buildReport({
    security: attempt.security_score,
    operation: attempt.operation_score,
    compliance: attempt.compliance_score,
    recovery: attempt.recovery_score,
  });
  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Info label="Role" value={attempt.participant_role} />
        <Info label="Total Score" value={String(attempt.total_score)} />
        <Info label="Rating" value={attempt.rating || '-'} />
        <Info label="Weakest" value={attempt.weakest_area || '-'} />
      </div>
      <div>
        <h4 className="mb-2 font-bold text-navy">Recommended Action Plan</h4>
        <ul className="list-disc pl-5 text-sm text-slate-700">{report.actionPlan.map((p) => <li key={p}>{p}</li>)}</ul>
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        {answers.length === 0 ? (
          <EmptyState title="Belum ada jawaban" message="Attempt ini belum memiliki jawaban scenario yang tersimpan." />
        ) : (
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-100"><tr>{['Stage', 'Scenario', 'Selected Answer', 'Feedback', 'Score Delta', 'Answered At'].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-100">
            {answers.map((a) => {
              const scenario = scenarios.find((s) => s.id === a.scenario_id);
              return (
                <tr key={a.id}>
                  <td className="px-4 py-3">{a.stage}</td>
                  <td className="px-4 py-3 font-semibold text-navy">{scenario?.title || a.scenario_id}</td>
                  <td className="px-4 py-3">{a.selected_option_label}</td>
                  <td className="px-4 py-3">{a.feedback_type}</td>
                  <td className="px-4 py-3"><code>{JSON.stringify(a.score_delta)}</code></td>
                  <td className="px-4 py-3 text-xs text-slate-500">{new Date(a.answered_at).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        )}
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded-lg bg-slate-50 p-3"><p className="text-xs font-bold uppercase text-slate-500">{label}</p><p className="font-bold text-slate-800">{value}</p></div>;
}
