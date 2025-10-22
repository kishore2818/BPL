import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md';
}

export function Badge({ children, variant, size = 'md' }: BadgeProps) {
  const variantClasses = {
    success: 'bg-[#00C896] bg-opacity-10 text-[#00C896]',
    warning: 'bg-[#FFB74D] bg-opacity-10 text-[#B87E33]',
    error: 'bg-[#E63946] bg-opacity-10 text-[#E63946]',
    info: 'bg-[#7B68EE] bg-opacity-10 text-[#7B68EE]',
    neutral: 'bg-gray-100 text-gray-700'
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm'
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-full ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {children}
    </span>
  );
}
