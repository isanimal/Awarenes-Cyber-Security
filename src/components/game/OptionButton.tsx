import type { ScenarioOption } from '../../types/game';

export function OptionButton({ option, disabled, selected, onClick }: { option: ScenarioOption; disabled: boolean; selected: boolean; onClick: () => void }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`w-full rounded-lg border p-4 text-left text-sm font-semibold transition ${
        selected ? 'border-teal bg-teal/10 text-navy' : 'border-slate-200 bg-white hover:border-teal hover:bg-slate-50'
      } disabled:cursor-not-allowed`}
    >
      {option.label}
    </button>
  );
}
