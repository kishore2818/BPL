import { ChangeEvent } from 'react';

interface InputProps {
  label?: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  className = ''
}: InputProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-[#E63946] ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C7BE5] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
    </div>
  );
}
