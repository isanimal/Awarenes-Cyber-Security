import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import type { ScenarioOption } from '../../types/game';
import { Button } from '../common/Button';

export function FeedbackPanel({
  option,
  saving,
  saved,
  error,
  onNext,
  onRetry,
}: {
  option: ScenarioOption;
  saving?: boolean;
  saved?: boolean;
  error?: string | null;
  onNext: () => void;
  onRetry?: () => void;
}) {
  const tone = option.feedbackType === 'good' ? 'teal' : option.feedbackType === 'risky' ? 'warning' : 'danger';
  const Icon = option.feedbackType === 'good' ? CheckCircle2 : option.feedbackType === 'risky' ? AlertTriangle : XCircle;
  return (
    <div className={`mt-5 rounded-xl border p-5 ${tone === 'teal' ? 'border-teal bg-teal/5' : tone === 'warning' ? 'border-orange-300 bg-orange-50' : 'border-red-300 bg-red-50'}`}>
      <div className="mb-3 flex items-start gap-3">
        <Icon className={`mt-0.5 h-6 w-6 ${tone === 'teal' ? 'text-teal' : tone === 'warning' ? 'text-warning' : 'text-danger'}`} />
        <div>
          <h4 className="font-bold capitalize text-navy">{option.feedbackType} decision</h4>
          <p className="mt-1 text-sm text-slate-700">{option.explanation}</p>
        </div>
      </div>
      <div className="mb-4 rounded-lg bg-white/70 p-3 text-sm text-slate-700">
        <span className="font-bold">Recommended action: </span>{option.recommendedAction}
      </div>
      {saving && <p className="mb-3 text-sm font-semibold text-slate-600">Menyimpan jawaban ke Supabase...</p>}
      {saved && !saving && <p className="mb-3 text-sm font-semibold text-teal">Jawaban tersimpan.</p>}
      {error && !saving && <p className="mb-3 rounded-lg bg-red-100 p-3 text-sm font-semibold text-danger">{error}</p>}
      <div className="flex flex-wrap gap-2">
        {error && onRetry && <Button variant="ghost" onClick={onRetry}>Retry Save</Button>}
        <Button onClick={onNext} disabled={saving || Boolean(error) || !saved}>{saving ? 'Menyimpan...' : 'Lanjut'}</Button>
      </div>
    </div>
  );
}
