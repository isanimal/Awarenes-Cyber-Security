import type { GameAttemptRow } from '../types/database';

export function attemptsToCsv(attempts: GameAttemptRow[]): string {
  const headers = [
    'participant_name',
    'participant_role',
    'mode',
    'team_name',
    'total_score',
    'security_score',
    'operation_score',
    'compliance_score',
    'recovery_score',
    'rating',
    'strongest_area',
    'weakest_area',
    'status',
    'completed_at',
  ];
  const rows = attempts.map((a) =>
    headers.map((key) => csvCell(String(a[key as keyof GameAttemptRow] ?? ''))).join(','),
  );
  return [headers.join(','), ...rows].join('\n');
}

export function downloadText(filename: string, content: string, mime = 'text/plain'): void {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function csvCell(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}
