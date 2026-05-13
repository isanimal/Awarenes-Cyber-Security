import { curriculumManifest } from '../data/curriculumManifest';
import type { PlayerProfile, ReportSummary } from '../types/game';

export function reportSummaryText(profile: PlayerProfile, report: ReportSummary): string {
  return [
    `Secure the Voyage Final Report`,
    `Peserta: ${profile.participantName}`,
    `Role/Divisi: ${profile.participantRole}`,
    `Mode: ${profile.mode}`,
    `Total Score: ${report.totalScore}`,
    `Rating: ${report.rating}`,
    `Strongest Area: ${report.strongestArea}`,
    `Weakest Area: ${report.weakestArea}`,
    `Action Plan: ${report.actionPlan.join('; ')}`,
  ].join('\n');
}

export function generatePptOutline(): string {
  let slide = 1;
  return curriculumManifest
    .flatMap((item) => [
      `MODULE: ${item.title} (${item.moduleChapter})`,
      ...item.suggestedSlideTitles.map((s) => {
        const text = [
          `Slide ${slide}: ${s.title}`,
          `Main points:`,
          ...s.points.map((p) => `- ${p}`),
          `Trainer point: ${item.trainerTalkingPoints[0] || 'Hubungkan dengan realita operasional kapal.'}`,
          `Connected game: Stage ${item.stageId}`,
          `Visual: ${item.visualSuggestion}`,
        ].join('\n');
        slide += 1;
        return text;
      }),
    ])
    .join('\n\n');
}
