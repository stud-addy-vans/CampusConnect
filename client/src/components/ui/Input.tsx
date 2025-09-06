// client/src/components/ui/Input.tsx

import React from 'react';

// Use React.ComponentProps<'input'> to get all the standard input props like 'type', 'placeholder', etc.
type InputProps = React.ComponentProps<'input'>;

const Input = (props: InputProps) => {
  return (
    <input
      {...props}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    />
  );
};

export default Input;