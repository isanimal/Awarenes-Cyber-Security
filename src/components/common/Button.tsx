import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: ReactNode;
}

const variants: Record<Variant, string> = {
  primary: 'bg-teal text-white hover:bg-teal/90',
  secondary: 'bg-navy text-white hover:bg-slate-800',
  danger: 'bg-danger text-white hover:bg-red-600',
  ghost: 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50',
};

export function Button({ variant = 'primary', icon, className = '', children, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
