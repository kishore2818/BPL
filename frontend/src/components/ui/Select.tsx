// import { ChangeEvent } from 'react';

// interface SelectOption {
//   value: string;
//   label: string;
// }

// interface SelectProps {
//   label?: string;
//   value: string;
//   onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
//   options: SelectOption[];
//   placeholder?: string;
//   required?: boolean;
//   disabled?: boolean;
//   className?: string;
// }

// export function Select({
//   label,
//   value,
//   onChange,
//   options,
//   placeholder,
//   required = false,
//   disabled = false,
//   className = ''
// }: SelectProps) {
//   return (
//     <div className={className}>
//       {label && (
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           {label}
//           {required && <span className="text-[#E63946] ml-1">*</span>}
//         </label>
//       )}
//       <select
//         value={value}
//         onChange={onChange}
//         required={required}
//         disabled={disabled}
//         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C7BE5] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//       >
//         {placeholder && (
//           <option value="" disabled>
//             {placeholder}
//           </option>
//         )}
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }





import { ChangeEvent } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  disabled = false,
  className = ''
}: SelectProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-[#E63946] ml-1">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2C7BE5] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option 
            key={`${option.value}-${option.label}`} 
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}