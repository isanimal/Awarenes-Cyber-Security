import { Copy, Download } from 'lucide-react';
import { useState } from 'react';
import { downloadText } from '../../lib/csv';
import { generatePptOutline } from '../../lib/report';
import { Button } from '../common/Button';

export function PPTBuilderOutline() {
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const outline = generatePptOutline();

  async function copyOutline() {
    try {
      await navigator.clipboard.writeText(outline);
      setStatus({ type: 'success', text: 'PPT outline berhasil disalin.' });
    } catch {
      setStatus({ type: 'error', text: 'Gagal menyalin PPT outline. Browser tidak mengizinkan clipboard.' });
    }
  }

  function downloadOutline() {
    downloadText('STV_PPT_Outline.txt', outline);
    setStatus({ type: 'success', text: 'Download PPT outline dimulai.' });
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap justify-between gap-2">
        <h3 className="text-xl font-bold text-navy">PPT Builder Outline</h3>
        <div className="flex gap-2">
          <Button variant="ghost" icon={<Copy className="h-4 w-4" />} onClick={copyOutline}>Copy PPT Outline</Button>
          <Button variant="ghost" icon={<Download className="h-4 w-4" />} onClick={downloadOutline}>Download .txt</Button>
        </div>
      </div>
      {status && <p className={`mb-4 rounded-lg p-3 text-sm font-semibold ${status.type === 'success' ? 'bg-teal/10 text-teal' : 'bg-red-50 text-danger'}`}>{status.text}</p>}
      <pre className="max-h-[520px] overflow-auto whitespace-pre-wrap rounded-lg bg-slate-950 p-4 text-sm text-slate-100">{outline}</pre>
    </div>
  );
}
