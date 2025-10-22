import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  disabled = false,
  className = '',
  type = 'button'
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-[#2C7BE5] text-white hover:bg-[#0E5CAD] focus:ring-[#2C7BE5]',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-600',
    success: 'bg-[#00C896] text-white hover:bg-[#00B080] focus:ring-[#00C896]',
    warning: 'bg-[#FFB74D] text-gray-900 hover:bg-[#FFA726] focus:ring-[#FFB74D]',
    error: 'bg-[#E63946] text-white hover:bg-[#DC2F3C] focus:ring-[#E63946]',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-400'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      {children}
    </button>
  );
}
