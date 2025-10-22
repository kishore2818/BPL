// File: src/components/ui/Textarea.tsx
import { forwardRef } from 'react';

export const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        {...props}
        className="your-styling-classes-here"
      />
    );
  }
);