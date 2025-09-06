// client/src/components/ui/Input.tsx
import React from 'react';

type InputProps = React.ComponentProps<'input'>;

const Input = (props: InputProps) => {
  return (
    <input
      {...props}
      className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
    />
  );
};

export default Input;