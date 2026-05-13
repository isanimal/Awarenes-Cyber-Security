import type { ReportSummary, ScoreDelta, ScoreKey, Scores } from '../types/game';

export const initialScores: Scores = {
  security: 50,
  operation: 50,
  compliance: 50,
  recovery: 50,
};

const labels: Record<ScoreKey, string> = {
  security: 'Security',
  operation: 'Operation',
  compliance: 'Compliance',
  recovery: 'Recovery',
};

export function applyScoreDelta(scores: Scores, delta: ScoreDelta): Scores {
  return {
    security: clamp(scores.security + delta.security),
    operation: clamp(scores.operation + delta.operation),
    compliance: clamp(scores.compliance + delta.compliance),
    recovery: clamp(scores.recovery + delta.recovery),
  };
}

export function calculateTotalScore(scores: Scores): number {
  return Math.round((scores.security + scores.operation + scores.compliance + scores.recovery) / 4);
}

export function buildReport(scores: Scores): ReportSummary {
  const totalScore = calculateTotalScore(scores);
  const sorted = (Object.entries(scores) as Array<[ScoreKey, number]>).sort((a, b) => b[1] - a[1]);
  const strongestArea = `${labels[sorted[0][0]]} (${sorted[0][1]})`;
  const weakestArea = `${labels[sorted[sorted.length - 1][0]]} (${sorted[sorted.length - 1][1]})`;
  const weakestKey = sorted[sorted.length - 1][0];

  return {
    totalScore,
    rating: getRating(totalScore),
    strongestArea,
    weakestArea,
    badge: getBadge(totalScore),
    actionPlan: getActionPlan(weakestKey),
  };
}

export function getRating(totalScore: number): string {
  if (totalScore >= 85) return 'Excellent Resilience';
  if (totalScore >= 70) return 'Good Awareness';
  if (totalScore >= 50) return 'Needs Improvement';
  return 'High Risk Behavior';
}

function getBadge(totalScore: number): string {
  if (totalScore >= 85) return 'Maritime Cyber Champion';
  if (totalScore >= 70) return 'Resilient Crew';
  if (totalScore >= 50) return 'Awareness Builder';
  return 'Priority Coaching Required';
}

function getActionPlan(area: ScoreKey): string[] {
  const plans: Record<ScoreKey, string[]> = {
    security: ['Perkuat MFA untuk vendor dan akun kritikal.', 'Latih verifikasi email/tautan sebelum membuka lampiran.', 'Tinjau segmentasi jaringan IT/OT.'],
    operation: ['Tetapkan jalur eskalasi agar keamanan tidak mematikan operasi.', 'Latih keputusan containment yang tetap menjaga clearance dan safety.', 'Buat prosedur manual sementara untuk dokumen kritikal.'],
    compliance: ['Simpan evidence audit: akses, backup test, dan log perubahan.', 'Petakan kontrol ke NIST CSF dan standar maritim.', 'Tentukan aturan komunikasi insiden ke pihak eksternal.'],
    recovery: ['Uji restore backup secara berkala.', 'Dokumentasikan root cause sebelum recovery.', 'Jalankan lessons learned dan rencana perbaikan 30 hari.'],
  };
  return plans[area];
}

function clamp(value: number): number {
  return Math.max(0, Math.min(100, value));
}
